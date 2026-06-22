import {
  Children,
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import reducer from "../reducer";
import initialState from "../store";
import axios from "../app/api/axios";

const ItemContext = createContext({});
export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [items, setItems] = useState([]);
  const currency = "₦";

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getItems = async () => {
    try {
      const response = await axios.get("/items");
      console.log(response.data);
      if (response) {
        dispatch({ type: "ACQUIITEMS", payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReceipts = async () => {
    try {
      const response = await axios.get("/acquisition");
      // it doesn't have the description property
      // response.data.shift();
      dispatch({ type: "RECEIPTS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const getUsage = async () => {
    try {
      const response = await axios.get("/used");
      if (response) {
        dispatch({ type: "SUCCESS", payload: true });
        dispatch({ type: "USAGERECEIPTS", payload: response.data });
      }
      setTimeout(() => {
        dispatch({ type: "SUCCESS", payload: false });
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ItemContext.Provider
      value={{
        getItems,
        currency,
        numberWithCommas,
        getReceipts,
        getUsage,
        ...state,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
