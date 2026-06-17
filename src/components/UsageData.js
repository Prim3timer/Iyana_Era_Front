import React, { useContext, useEffect, useReducer, useState } from "react";
import ItemContext from "../context/itemProvider";
import { format } from "date-fns";
// import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import axios from "../app/api/axios";
import initailState from "../store";
import reducer from "../reducer";

const UsageData = () => {
  const {
    getReceipts,
    receipts,
    currency,
    numberWithCommas,
    getUsage,
    usageReceipts,
    success,
  } = useContext(ItemContext);
  const [state, dispatch] = useReducer(reducer, initailState);
  const removeItem = async (id) => {
    const response = await axios.delete(`/used/${id}`);
    dispatch({ type: "ALERTMSG", payload: response.data });
    console.log(response.data);
  };

  useEffect(() => {
    getUsage();
  }, [usageReceipts?.length]);

  return (
    <div>
      <h3>Usage Data</h3>
      <h3>{success && state.alertmsg}</h3>
      {usageReceipts?.map((receipt) => {
        const theDay = format(receipt.date, "dd/MM/yyyy");
        return (
          <div className="receipt-main-cont">
            <section className="date-and-id">
              <p>{receipt._id}</p>
              <p>{theDay}</p>
            </section>
            <article className="usage-items-header">
              <h4>item</h4>
              <h4>qty</h4>
              <h4>desc</h4>
              <h4>cost</h4>
            </article>
            <hr />
            <section className="good-outer">
              {receipt.goods.map((good) => {
                return (
                  <div className="usage-goods-container">
                    <p className="good-name"> {good.name}</p>
                    <p className="good-measure">
                      {good.qty}
                      {good.unitMeasure}
                    </p>
                    <p>{good.description}</p>
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

export default UsageData;
