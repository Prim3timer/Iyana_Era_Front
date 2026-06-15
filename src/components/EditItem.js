import { useState, useReducer, useContext, useEffect } from "react";
import reducer from "../reducer";
import initialState from "../store";
import axios from "axios";
import ItemContext from "../context/itemProvider";

const EditItem = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [item, setItem] = useState({});
  const iyaId = localStorage.getItem("iyaId");

  const getItems = async (e) => {
    const response = await axios.get("http://localhost:4000/items");
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
    }
    setItem(currentItem);
  };
  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const prices = [state.firstPrice, state.secondPrice];
    const unitMeasures = [state.firstUnitMeasure, state.secondUnitMeasure];
    const quanities = [state.qty, state.numerator];
    const newItem = {
      name: state.name,
      availableUnitMeasures: unitMeasures,
      availablePrices: prices,
      availableQuantities: quanities,
      qty: state.qty,
      denominator: state.denominator,
      numerator: state.numerator,
      date: now,
    };
    console.log(newItem);

    const response = await axios.patch(
      `http://localhost:4000/items/${iyaId}`,
      newItem,
    );
    console.log(response.data);
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div>
      <h3>Edit Item</h3>
      {item && (
        <form className="create-item-form" onSubmit={(e) => hanldeSubmit(e)}>
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
              dispatch({ type: "NOMINATOR", payload: e.target.value })
            }
          />
          <button type="submit" className="create-item-button">
            edit
          </button>
        </form>
      )}
    </div>
  );
};

export default EditItem;
