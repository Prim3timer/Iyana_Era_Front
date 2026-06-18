import { useReducer, useState } from "react";
import axios from "../app/api/axios";
import initialState from "../store";
import reducer from "../reducer";
const AddItem = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [firstPrice, setFirstPrice] = useState(0);
  const [secondPrice, setSecondPrice] = useState(0);
  const [firstUnitMeasure, setFirstUnitMeasure] = useState("");
  const [secondUnitMeasure, setSecondUnitMeasure] = useState("");
  const createItem = async (e) => {
    e.preventDefault();
    const now = new Date();
    console.log(now);
    const prices = [firstPrice, secondPrice];
    const unitMeasures = [firstUnitMeasure, secondUnitMeasure];
    console.log(prices);
    // dispatch({ type: "AVAILABLEPRICES", payload: prices });
    // dispatch({ type: "AVAILABLEUNITMEASURES", payload: unitMeasures });

    const newItem = {
      name: state.name,
      availableUnitMeasures: unitMeasures,
      availablePrices: prices,
      qty: state.qty,
      denominator: state.denominator,
      numerator: state.numerator,
      date: now,
      dateCreated: now,
    };
    console.log(newItem);
    try {
      const response = await axios.post("/items", newItem);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3>Add Item</h3>
      <form className="create-item-form">
        <label>name</label>
        <input
          value={state.name}
          onChange={(e) => dispatch({ type: "NAME", payload: e.target.value })}
        />
        <label>first unit measure</label>
        <input
          value={firstUnitMeasure}
          onChange={(e) => setFirstUnitMeasure(e.target.value)}
        />
        <label>second unit measure</label>
        <input
          value={secondUnitMeasure}
          onChange={(e) => setSecondUnitMeasure(e.target.value)}
        />
        <label>first price</label>
        <input
          value={firstPrice}
          onChange={(e) => setFirstPrice(e.target.value)}
        />
        <label>second price</label>
        <input
          value={secondPrice}
          onChange={(e) => setSecondPrice(e.target.value)}
        />
        <label>qty</label>
        <input
          value={state.qty}
          onChange={(e) => dispatch({ type: "QTY", payload: e.target.value })}
        />
        <label>denominator</label>
        <input
          value={state.denominator}
          onChange={(e) =>
            dispatch({ type: "DENOMINATOR", payload: e.target.value })
          }
        />
        <label>numerator</label>
        <input
          value={state.numerator}
          onChange={(e) =>
            dispatch({ type: "NUMERATOR", payload: e.target.value })
          }
        />
        <button onClick={createItem} className="create-item-button">
          create
        </button>
      </form>
    </div>
  );
};

export default AddItem;
