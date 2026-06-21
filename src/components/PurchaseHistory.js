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
  const removeItem = async (id) => {
    try {
      const filterate = state.receipts.filter((receipt) => receipt._id !== id);
      const response = await axios.delete(`/acquisition/${id}`);
      dispatch({ type: "RECEIPTS", payload: filterate });
      // [filterate, receipts];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReceipts();
  }, [receipts.length]);

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
            <h2 onClick={() => removeItem(receipt._id)} className="trash">
              <FaTrashAlt role="button" />
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseHistory;
