import { useContext, useEffect, useReducer, useState } from "react";
import ItemContext from "../context/itemProvider";
import reducer from "../reducer";
import initialState from "../store";
import axios from "../app/api/axios";

const Usage = () => {
  const {
    receipts,
    getReceipts,
    numberWithCommas,
    acquiItems,
    getItems,
    used,
    getUsed,
    currency,
  } = useContext(ItemContext);
  const [transactionArray, setTransactionArray] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [same, setSame] = useState(false);
  console.log(acquiItems);

  const getTrans = async () => {
    const response = await axios.get("/used");
    console.log(response.data);

    try {
      let innerArray = [];
      receipts &&
        response.data.map((transaction) => {
          return transaction.goods.map((good) => {
            const elements = {
              name: good.name,
              qty: good.qty,
              unitMeasure: good.unitMeasure,
              total: good.total,
              date: transaction.date,
            };
            innerArray.push(elements);
            const filterate =
              innerArray &&
              innerArray.filter((inner) =>
                inner.name.toLowerCase().includes(state.search.toLowerCase()),
              );
            const filterate2 = filterate.filter((inner) =>
              inner.date.substring(0, 10).includes(state.search2),
            );
            setTransactionArray(filterate2);
            const allEqual = (arr) =>
              arr.every((val) => val.name === arr[0].name);
            const allTheSame = allEqual(filterate2);
            setSame(allTheSame);
            return innerArray;
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const firstUnit = () => {
    try {
      console.log(acquiItems);
      console.log(transactionArray);
      const firstElement = transactionArray[0];
      console.log(firstElement);
      const currentItem =
        acquiItems &&
        acquiItems.find((item) => item.name === firstElement.name);
      console.log(currentItem);

      const currentArray = transactionArray.filter(
        (item) => item.unitMeasure === currentItem.availableUnitMeasures[0],
      );
      setTransactionArray(currentArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  const secondUnit = () => {
    try {
      console.log(acquiItems);
      const firstElement = transactionArray[0];
      const currentItem =
        acquiItems &&
        acquiItems.find((item) => item.name === firstElement.name);
      console.log(currentItem);
      // const unitMeasureMeasureArray = [];

      const currentArray = transactionArray.filter(
        (item) => item.unitMeasure === currentItem.availableUnitMeasures[1],
      );
      setTransactionArray(currentArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getReceipts();
  }, []);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getTrans();
  }, [state.search, state.search2]);
  return (
    <div>
      {same && (
        <article className="sales-button">
          <button onClick={firstUnit}>unit 1</button>
          <button onClick={secondUnit}>unit 2</button>
        </article>
      )}
      <h3>Usage</h3>
      <form className="searcher" onSubmit={(e) => e.preventDefault()}>
        <input
          // id="invent-search"
          type="text"
          role="searchbox"
          placeholder="filter by name"
          value={state.search}
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }

          // https://www.npmjs.com/package/@react-google-maps/api
        />
        {/* <p className='injunction'>AND / OR</p > */}
        <input
          //   id="invent-search"
          type="text"
          role="searchbox"
          placeholder="filter by date yyyy-mm-dd"
          value={state.search2}
          onChange={(e) =>
            dispatch({ type: "SEARCH2", payload: e.target.value })
          }

          // https://www.npmjs.com/package/@react-google-maps/api
        />
      </form>
      <table className="sales-table">
        <tbody>
          <tr className="theader-row">
            <th className="gen-sales-theader">NAME</th>
            <th className="gen-sales-theader">QTY</th>
            <th className="gen-sales-theader">TOTAL</th>
            <th className="gen-sales-theader">DATE</th>
          </tr>
          {transactionArray &&
            transactionArray.map((transaction, index) => {
              return (
                <tr
                  className="sales-items-cont"
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "khaki",
                  }}
                >
                  <th>{transaction.name}</th>
                  <td>
                    {transaction.qty} {transaction.unitMeasure}
                    {transaction.qty > 1 ? "s" : ""}
                  </td>
                  <th>
                    {numberWithCommas(parseFloat(transaction.total).toFixed(2))}
                  </th>
                  <td>
                    {" "}
                    {new Date(transaction.date).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
          <tr>
            <th>Total:</th>
            <th>
              {same &&
                numberWithCommas(
                  transactionArray
                    .reduce((a, b) => {
                      return a + parseFloat(b.qty);
                    }, 0)
                    .toFixed(2),
                )}
            </th>
            <th colSpan={2}>
              {currency}
              {numberWithCommas(
                transactionArray
                  .reduce((a, b) => {
                    return a + parseFloat(b.total);
                  }, 0)
                  .toFixed(2),
              )}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Usage;
