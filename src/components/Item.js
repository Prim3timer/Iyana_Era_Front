import { useEffect, useState, useContext, useReducer } from "react";
import axios from "../app/api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ItemContext from "../context/itemProvider";
import reducer from "../reducer";
import initialState from "../store";

const Item = () => {
  const { getItems, acquiItems } = useContext(ItemContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const getId = (id) => {
    localStorage.setItem("iyaId", id);
  };

  const deletItem = async (id) => {
    const response = await axios.delete(`/items/${id}`);
    const currentItems = acquiItems.filter((item) => item._id !== id);
    dispatch({ type: "ACQUIITEMS", payload: currentItems });

    console.log(response.data);
  };

  useEffect(() => {
    getItems();
  }, [acquiItems]);

  return (
    <div>
      {acquiItems.map((item, i) => {
        return (
          <div key={i} onClick={() => getId(item._id)}>
            <Link to={"/edit-item"}>
              <p>{item.availablePrices[0]}</p>
              <h5>{item.name}</h5>
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
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deletItem(item._id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Item;
