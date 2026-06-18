import { useState, useReducer, useContext, useEffect } from "react";
import reducer from "../reducer";
import initialState from "../store";
import axios from "../app/api/axios";
import ItemContext from "../context/itemProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EditItem = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [item, setItem] = useState({});
  const iyaId = localStorage.getItem("iyaId");
  const navigate = useNavigate();
  const getItems = async (e) => {
    const response = await axios.get("/items");
    const currentItem = response.data.find((item) => item._id === iyaId);
    console.log(currentItem);
    if (currentItem) {
      dispatch({ type: "NAME", payload: currentItem.name });
      dispatch({
        type: "FIRSTUNITMEASURE",
        payload: currentItem.availableUnitMeasures[0],
      });
      dispatch({
        type: "SECONDUNITMEASURE",
        payload: currentItem.availableUnitMeasures[1],
      });
      dispatch({ type: "FIRSTPRICE", payload: currentItem.availablePrices[0] });
      dispatch({
        type: "SECONDPRICE",
        payload: currentItem.availablePrices[1],
      });
      dispatch({
        type: "QTY",
        payload: currentItem.qty,
      });
      dispatch({
        type: "DENOMINATOR",
        payload: currentItem.denominator,
      });
      dispatch({
        type: "NUMERATOR",
        payload: currentItem.numerator,
      });
    }
    setItem(currentItem);
  };

  const asertain = () => {
    dispatch({ type: "VERIFY", payload: true });

    // dispatch({ type: "id", payload: id });
    const trans = state.acquiItems.find((item) => item._id === iyaId);
    dispatch({ type: "ITEM", payload: trans });
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const prices = [state.firstPrice, state.secondPrice];
    const unitMeasures = [state.firstUnitMeasure, state.secondUnitMeasure];
    const quanities = [Number(state.qty), state.numerator];
    const newItem = {
      name: state.name,
      availableUnitMeasures: unitMeasures,
      availablePrices: prices,
      availableQuantities: quanities,
      qty: Number(state.qty),
      denominator: state.denominator,
      numerator: state.numerator,
      date: now,
    };

    const response = await axios.patch(`/items/${iyaId}`, newItem);
    console.log(response.data);
  };

  const deletItem = async () => {
    console.log(iyaId);
    const response = await axios.delete(`/items/${iyaId}`);
    const currentItems = state.acquiItems.filter((item) => item._id !== iyaId);
    dispatch({ type: "ACQUIITEMS", payload: currentItems });
    dispatch({ type: "VERIFY", payload: false });

    if (response) {
      navigate("/items");
    }
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
  }, []);
  return (
    <div>
      <h3>Edit Item</h3>
      {item && (
        <form className="create-item-form">
          <label>name</label>
          <input
            value={state?.name}
            onChange={(e) =>
              dispatch({ type: "NAME", payload: e.target.value })
            }
          />
          <label>first unit measure</label>
          <input
            value={state?.firstUnitMeasure}
            onChange={(e) =>
              dispatch({ type: "FIRSTUNITMEASURE", payload: e.target.value })
            }
          />
          <label>second unit measure</label>
          <input
            value={state?.secondUnitMeasure}
            onChange={(e) =>
              dispatch({ type: "SECONDUNITMEASURE", payload: e.target.value })
            }
          />
          <label>first price</label>
          <input
            value={state.firstPrice}
            onChange={(e) =>
              dispatch({ type: "FIRSTPRICE", payload: e.target.value })
            }
          />
          <label>second price</label>
          <input
            value={state.secondPrice}
            onChange={(e) =>
              dispatch({ type: "SECONDPRICE", payload: e.target.value })
            }
          />
          <label>qty</label>
          <input
            value={state.qty}
            onChange={(e) => dispatch({ type: "QTY", payload: e.target.value })}
          />
          <label>denominator</label>
          <input
            value={state?.denominator}
            onChange={(e) =>
              dispatch({ type: "DENOMINATOR", payload: e.target.value })
            }
          />
          <label>numerator</label>
          <input
            value={state?.numerator}
            onChange={(e) =>
              dispatch({ type: "NUMERATOR", payload: e.target.value })
            }
          />
        </form>
      )}
      <section className="usersetting-actions">
        {/* <button type="submit" className="create-item-button">
              edit
            </button> */}

        <button
          className="user-action"
          onClick={hanldeSubmit}
          //   className={'icon-button'}
          title="Save"
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button className="user-action">
          <FontAwesomeIcon icon={faTrash} onClick={asertain} />
        </button>
      </section>
      <div className={state.verify ? "delete" : "no-delete"}>
        <h3
          id="verify-header"
          style={{
            margin: ".5rem auto",
            //   display: 'flex',
          }}
        >
          Delete {state.name} from list
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
    </div>
  );
};

export default EditItem;
