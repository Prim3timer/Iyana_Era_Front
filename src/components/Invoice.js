import React, { use, useContext, useEffect, useReducer, useState } from "react";
import ItemContext from "../context/itemProvider";
import { format } from "date-fns";
// import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import axios from "../app/api/axios";
import reducer from "../reducer";
import initialState from "../store";
const Invoice = () => {
  const { getReceipts, currency, numberWithCommas, receipts } =
    useContext(ItemContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(receipts);
  const removeItem = async (id) => {
    console.log(id);
    const filterate = state.receipts.filter((receipt) => receipt._id !== id);
    const response = await axios.delete(`/acquisition/${id}`);
    console.log(response.data);
    // [filterate, receipts];
  };

  useEffect(() => {
    getReceipts();
  }, []);

  return (
    <div>
      <h3>Invoice</h3>
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
              <h4>cost</h4>
            </article>
            <hr />
            <section className="good-outer">
              {receipt.goods.map((good) => {
                return (
                  <div className="goods-container" key={good._id}>
                    <p className="good-name"> {good.name}</p>
                    <p className="good-measure">
                      {good.qty}
                      {good.unitMeasure}
                    </p>
                    <p>
                      {currency}
                      {numberWithCommas(parseFloat(good.total).toFixed(2))}
                    </p>
                  </div>
                );
              })}
            </section>
            <hr className="horizontal" />
            <section className="total-elements">
              <h4 className="receipts-grand-total">Grand Total:</h4>{" "}
              <h4>
                {currency}
                {numberWithCommas(parseFloat(receipt.grandTotal).toFixed(2))}
              </h4>
              <h2 onClick={() => removeItem(receipt._id)}>
                <FaTrashAlt role="button" />
              </h2>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Invoice;
