import { useContext, useState, useRef, useReducer, useEffect } from "react";
import ItemContext from "../context/itemProvider";
import initialState from "../store";
import reducer from "../reducer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../app/api/axios";

const Inventory = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { numberWithCommas } = useContext(ItemContext);
  const [indexer, setIndexer] = useState(0);
  const getItems = async () => {
    try {
      const graw = await axios.get("/items");

      const newItems = graw.data.map((item) => {
        return { ...item, unitMeasure: item.availableUnitMeasures[0] };
      });
      const filterate = newItems.filter((inner) =>
        inner.name.toLowerCase().includes(state.search.toLowerCase()),
      );
      if (state.search2) {
        const stockFilter =
          filterate && filterate.filter((item) => item.qty <= state.search2);
        // dispatch({ type: "items", payload: stockFilter && stockFilter });
        dispatch({ type: "ACQUIITEMS", payload: stockFilter });
      } else dispatch({ type: "ACQUIITEMS", payload: filterate });
    } catch (error) {
      // dispatch({ type: "errMsg", payload: error.Message });
    }
  };
  const onUnitMeasureChange = (e, id) => {
    const currentItem = state.acquiItems.find((item) => item._id === id);
    const measureIndex = currentItem.availableUnitMeasures.indexOf(
      e.target.value,
    );
    dispatch({
      type: "INVENTMEASURE",
      payload: measureIndex,
      id,
    });
  };

  useEffect(() => {
    getItems();
  }, [state.search, state.search2]);
  return (
    <div className="inventory">
      <h3 className="header"> Inventory</h3>
      <form
        className="searcher"
        //   onSubmit={(e)=> e.preventDefault()}
      >
        {/* <h2 className="invent-header">Inventory</h2> */}
        <input
          //   id="invent-search"
          type="text"
          role="searchbox"
          placeholder="filter by name"
          value={state.search}
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }

          // https://www.npmjs.com/package/@react-google-maps/api
        />

        <input
          //  id="invent-search"

          placeholder="pick a number"
          role="searchbox"
          value={state.search2}
          onChange={(e) =>
            dispatch({ type: "SEARCH2", payload: e.target.value })
          }
        />
      </form>
      <table className="inventory-table">
        <tbody>
          <tr className="theader-row">
            <th>Name</th>
            <th>In-Stock</th>
            <th> Unit Measure</th>
            <th> Last Updated</th>
            {/* <th>ACTION</th> */}
          </tr>
          {state.acquiItems &&
            state.acquiItems.map((inv, index) => {
              // const invReg =
              //   inv.availableQuanities[0] < 1
              //     ? (inv.availableQuanities[0] = 0)
              //     : inv.availableQuanities[0];
              // console.log(correctFormat)
              // const theDay = new Date(inv.date).getDate()
              // const aDate = format(inv.date.substring(0, 10), `${theDay} MMM, yyyy`)
              return (
                <tr
                  className="sales-items-cont"
                  key={inv._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "palegreen",
                  }}
                >
                  <td className="sales-items">{`${inv.name}`}</td>
                  <th
                    className="sales-items"
                    // style={{
                    //   color: inv?.availableQuanities[0] < 20 ? "red" : "",
                    // }}
                  >
                    {numberWithCommas(inv.qty)}{" "}
                  </th>
                  <td>
                    <select
                      className="measure-inventory"
                      size={"1"}
                      value={inv.unitMeasure}
                      onChange={(e) => onUnitMeasureChange(e, inv._id)}
                    >
                      {inv.availableUnitMeasures.map((measure, i) => {
                        return (
                          <option className="update-form-unit-measure" key={i}>
                            {measure}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="sales-items">
                    {new Date(inv.date).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </td>
                  {/* <td 
     ref={invRef}
     className="sales-items">
         <a
         onClick={(e) => showEdit(inv._id, e)}
     >
      <FontAwesomeIcon icon={faPenToSquare} />
     </a>
     </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
