import { useEffect, useState, useContext, useReducer } from "react";
import axios from "../app/api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ItemContext from "../context/itemProvider";
import reducer from "../reducer";
import initialState from "../store";

const Item = () => {
  const {} = useContext(ItemContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const getId = (id) => {
    localStorage.setItem("iyaId", id);
  };

  const getItems = async () => {
    try {
      const graw = await axios.get("/items");
      console.log(graw.data);
      // const newItems = graw.data.map((item) => {
      //   return { ...item, unitMeasure: item.availableUnitMeasures[0] };
      // });
      const filterate = graw.data.filter((inner) =>
        inner.name.toLowerCase().includes(state.search.toLowerCase()),
      );
      dispatch({ type: "ACQUIITEMS", payload: filterate });
    } catch (error) {
      // dispatch({ type: "errMsg", payload: error.Message });
    }
  };

  const asertain = (id) => {
    dispatch({ type: "VERIFY", payload: true });

    // dispatch({ type: "id", payload: id });
    const trans = state.acquiItems.find((item) => item._id === id);
    dispatch({ type: "ITEM", payload: trans });
  };

  const deletItem = async () => {
    const response = await axios.delete(`/items/${state.item._id}`);
    const currentItems = state.acquiItems.filter(
      (item) => item._id !== state.item._id,
    );
    dispatch({ type: "ACQUIITEMS", payload: currentItems });
    dispatch({ type: "VERIFY", payload: false });

    console.log(response.data);
  };

  const remainDelete = () => {
    // this condition statement is to enable the removal of the confirm window once any part of the
    // page is touched.
    if (state.verify) {
      dispatch({ type: "VERIFY", payload: false });
    }
  };

  useEffect(() => {
    getItems();
  }, [state.search]);

  return (
    <div className="item">
      <form
        className="searcher"
        //   onSubmit={(e)=> e.preventDefault()}
      >
        {/* <h2 className="invent-header">Inventory</h2> */}
        <input
          //   id="invent-search"
          type="text"
          role="searchbox"
          placeholder="filter by name"
          value={state.search}
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }

          // https://www.npmjs.com/package/@react-google-maps/api
        />
      </form>
      <section className="items-cont">
        {state.acquiItems.map((item, i) => {
          return (
            <div key={i} onClick={() => getId(item._id)} className="items">
              <Link to={"/edit-item"}>
                <h3>{item.name}</h3>
                <p>Price: {item.availablePrices[0]}</p>
                <p>qty: {item.availableQuantities[0]}</p>
                <p>
                  {" "}
                  created:{" "}
                  {new Date(item.dateCreated).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </p>
              </Link>
              {/* <FontAwesomeIcon
                className="trash-logo"
                icon={faTrash}
                onClick={() => asertain(item._id)}
              /> */}
            </div>
          );
        })}
        <div className={state.verify ? "delete" : "no-delete"}>
          <h3
            id="verify-header"
            style={{
              margin: ".5rem auto",
              //   display: 'flex',
            }}
          >
            Delete {state.item.name} from list
          </h3>
          <article className="delete-buttons">
            <button onClick={remainDelete}>No</button>
            <button
              onClick={deletItem}
              style={{ backgroundColor: "red", borderColor: "red" }}
            >
              Yes
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Item;
