import React, { use, useContext, useEffect, useReducer, useState } from "react";
import ItemContext from "../context/itemProvider";
import { format } from "date-fns";
// import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import axios from "../app/api/axios";
import reducer from "../reducer";
import initialState from "../store";
const PurchaseHistory = () => {
  const { getReceipts, currency, numberWithCommas, receipts } =
    useContext(ItemContext);
  console.log(receipts);
  const [state, dispatch] = useReducer(reducer, initialState);
  const iyaId = localStorage.getItem("iyaId");
  const removeItem = async (id) => {
    try {
      const filterate = state.receipts.filter(
        (receipt) => receipt._id !== iyaId,
      );
      const response = await axios.delete(`/acquisition/${state.id}`);
      dispatch({ type: "RECEIPTS", payload: filterate });
      dispatch({ type: "VERIFY", payload: false });
      // [filterate, receipts];
    } catch (error) {
      console.log(error);
    }
  };

  const asertain = (id) => {
    console.log(id);
    dispatch({ type: "VERIFY", payload: true });

    dispatch({ type: "ID", payload: id });
    // const trans = state.acquiItems.find((item) => item._id === iyaId);
    // dispatch({ type: "ITEM", payload: trans });
  };

  const remainDelete = () => {
    // this condition statement is to enable the removal of the confirm window once any part of the
    // page is touched.
    if (state.verify) {
      dispatch({ type: "VERIFY", payload: false });
    }
  };

  const deletItem = async () => {
    console.log(iyaId);
    const response = await axios.delete(`/items/${iyaId}`);
    const currentItems = state.acquiItems.filter((item) => item._id !== iyaId);
    dispatch({ type: "ACQUIITEMS", payload: currentItems });
  };

  useEffect(() => {
    getReceipts();
  }, [removeItem]);

  return (
    <div>
      <h3>Purchase History</h3>
      {receipts.map((receipt) => {
        const theDay = format(receipt.date, "dd/MM/yyyy");
        return (
          <div className="receipt-main-cont" key={receipt._id}>
            <section className="date-and-id">
              <p>{receipt._id}</p>
              <p>{theDay}</p>
            </section>
            <article className="items-header">
              <h4>item</h4>
              <h4>qty</h4>
              <h4>cost ({currency})</h4>
              <h4>desc</h4>
            </article>
            <hr />
            <section className="good-outer">
              {receipt.goods.map((good) => {
                return (
                  <div className="goods-container" key={good._id}>
                    <p className="good-name"> {good.name}</p>
                    <p className="good-measure">
                      {numberWithCommas(good.qty)} {good.unitMeasure}
                      {good.qty > 1 ? "s" : ""}
                    </p>
                    <p>{numberWithCommas(parseFloat(good.total).toFixed(2))}</p>
                    <p>{good.description}</p>
                  </div>
                );
              })}
            </section>
            <hr className="horizontal" />
            <section className="total-elements">
              <h4 className="receipts-grand-total">Total Cost:</h4>
              <h4>
                {currency}
                {numberWithCommas(parseFloat(receipt.grandTotal).toFixed(2))}
              </h4>
            </section>
            <h2 onClick={() => asertain(receipt._id)} className="trash">
              <FaTrashAlt role="button" />
            </h2>
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
          Delete {state.name} from list
        </h3>
        <article className="delete-buttons">
          <button onClick={remainDelete}>No</button>
          <button
            onClick={removeItem}
            style={{ backgroundColor: "red", borderColor: "red" }}
          >
            Yes
          </button>
        </article>
      </div>
    </div>
  );
};

export default PurchaseHistory;
