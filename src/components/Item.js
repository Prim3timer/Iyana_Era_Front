import { useEffect, useState, useContext, useReducer } from "react";
import axios from "../app/api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ItemContext from "../context/itemProvider";
import reducer from "../reducer";
import initialState from "../store";

const Item = () => {
  const { numberWithCommas } = useContext(ItemContext);
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
                <p>Price: {numberWithCommas(item.availablePrices[0])}</p>
                <p>
                  qty: {item.availableQuantities[0]}{" "}
                  {item.availableUnitMeasures[0]}
                  {item.qty > 1 ? "s" : ""}
                </p>
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
      </section>
    </div>
  );
};

export default Item;
