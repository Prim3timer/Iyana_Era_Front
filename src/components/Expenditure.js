import { useContext, useEffect, useReducer, useState } from "react";
import axios from "../app/api/axios";
import reducer from "../reducer";
import initialState from "../store";
import ItemContext from "../context/itemProvider";

const Expenditure = () => {
  const [purchases, setPurchases] = useState([]);
  const [same, setSame] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { numberWithCommas, acquiItems, currency } = useContext(ItemContext);
  const getAcquisitions = async () => {
    const response = await axios.get("/acquisition");
    try {
      let innerArray = [];
      response.data.map((purchase) => {
        return purchase.goods.map((good) => {
          const elements = {
            name: good.name,
            qty: good.qty,
            unitMeasure: good.unitMeasure,
            total: good.total,
            date: purchase.date,
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
          setPurchases(filterate2);
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
      console.log(purchases);
      const firstElement = purchases[0];
      console.log(firstElement);
      const currentItem =
        acquiItems &&
        acquiItems.find((item) => item.name === firstElement.name);
      console.log(currentItem);
      // get all the items with the first unitMeasure
      const currentArray = purchases.filter(
        (item) => item.unitMeasure === currentItem.availableUnitMeasures[0],
      );
      setPurchases(currentArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  const secondUnit = () => {
    try {
      console.log(acquiItems);
      const firstElement = purchases[0];
      const currentItem =
        acquiItems &&
        acquiItems.find((item) => item.name === firstElement.name);
      console.log(currentItem);
      // get all the items with the second unitMeasure
      const currentArray = purchases.filter(
        (item) => item.unitMeasure === currentItem.availableUnitMeasures[1],
      );
      setPurchases(currentArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAcquisitions();
  }, [state.search, state.search2]);
  return (
    <div className="usage">
      <h3>Expenditure</h3>
      {same && (
        <article className="sales-button">
          <button onClick={firstUnit}>unit 1</button>
          <button onClick={secondUnit}>unit 2</button>
        </article>
      )}
      <form className="double-searcher" onSubmit={(e) => e.preventDefault()}>
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
            <th className="gen-sales-theader">COST</th>
            <th className="gen-sales-theader">DATE</th>
          </tr>
          {purchases &&
            purchases.map((transaction, index) => {
              return (
                <tr
                  className="sales-items-cont"
                  key={index}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "white" : "paleturquoise",
                  }}
                >
                  <th>{transaction.name}</th>
                  <td>
                    {numberWithCommas(transaction.qty)}{" "}
                    {transaction.unitMeasure}
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
          <tr className="trow">
            <th>Total Cost:</th>
            <th>
              {same &&
                numberWithCommas(
                  purchases
                    .reduce((a, b) => {
                      return a + parseFloat(b.qty);
                    }, 0)
                    .toFixed(2),
                )}
            </th>
            <th colSpan={2}>
              {currency}
              {numberWithCommas(
                purchases
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

export default Expenditure;
