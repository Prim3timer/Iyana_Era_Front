import { useContext, useEffect, useReducer, useState, useRef } from "react";
import ItemContext from "../context/itemProvider";
import reducer from "../reducer";
import initialState from "../store";
import axios from "../app/api/axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Used = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [measureIndex, setMeasureIndex] = useState(0);
  const qtyRef = useRef();
  const inputRef = useRef();
  const { numberWithCommas, currency, items, getItems, acquiItems } =
    useContext(ItemContext);
  console.log(acquiItems);
  const [noShow, setNoShow] = useState(false);
  const [firstRedChecker, setFirstRedChecker] = useState("");
  const [success, setSuccess] = useState(false);
  const now = new Date();

  const onUnitMeasureChange = (e, id) => {
    const currentItem = state.transArray.find((item) => item._id === id);
    const index = currentItem.availableUnitMeasures.indexOf(e.target.value);
    setMeasureIndex(index);
    dispatch({ type: "unitMeasure", payload: e.target.value, id, index });
  };

  const handleAdd = (e, i) => {
    e.preventDefault();

    try {
      if (inputRef.current.value) {
        if (state.success === false) state.success = true;
        else state.success = false;
        const currentItem = acquiItems.find(
          (item) => item.name === inputRef.current.value,
        );
        console.log(currentItem);
        currentItem.total = currentItem.availablePrices[0];
        // dispatch({ type: "name", payload: inputRef.current.value });
        dispatch({ type: "unitMeasure", payload: e.target.value });
        const acutalItem = {
          ...currentItem,
          qty: 1,
          price: currentItem.availablePrices[0],
          unitMeasure: currentItem.availableUnitMeasures[0],
          index: measureIndex,
        };
        const match = state.transArray.find(
          (item) => item.name === acutalItem.name,
        );

        if (!match) {
          // setTransArrayChangeLiu((prev) => {
          //   return prev + 1;
          // });
          // inputRef.current.focus();
          setNoShow(true);
          dispatch({ type: "TRANSARRAY", payload: acutalItem });

          inputRef.current.value = "";
          dispatch({ type: "ALERTMSG", payload: `${acutalItem.name} added` });

          setTimeout(() => {
            setNoShow(false);
            // dispatch({ type: "ALERTMSG", payload: `` });
          }, 3000);
        } else if (match) {
          setFirstRedChecker(match);
          dispatch({
            type: "ALERTMSG",
            payload: `${acutalItem.name} already in list`,
          });
          inputRef.current.value = "";
          setTimeout(() => {
            dispatch({ type: "ALERTMSG", payload: `` });
            setFirstRedChecker("");
            setNoShow(false);
          }, 3000);
        }
      } else {
        // dispatch({ type: "errMsg", payload: "Please select an item" });
      }
    } catch (error) {}
  };

  const done = async () => {
    try {
      const { transArray, total } = state;
      if (state.transArray.length) {
        const transItems = {
          goods: transArray,
          date: now,
        };
        const response = await axios.post("/used", transItems);
        console.log(transItems);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   dispatch({ type: "getTotal" });
  // }, [state.transArray, success]);

  useEffect(() => {
    getItems();
  }, []);

  const removeItem = async (id) => {
    dispatch({ type: "FILTERTRANSARRAY", payload: id });
    dispatch({ type: "ALERTMSG", payload: "item removed" });
    setNoShow(true);
    setTimeout(() => {
      setNoShow(false);
    }, 3000);
  };
  return (
    <div className="acquisition-cont">
      <h3>Used</h3>
      {state.errMsg}
      {!state.transArray.length ? (
        <p className="empty-cart">empty cart</p>
      ) : (
        state.transArray.map((item, index) => {
          //  console.log(item.unitMeasure)

          return (
            <section
              key={index}
              className="trans-items"

              // style={{
              //   backgroundColor: index % 2 === 0 ? "white" : "skyblue",
              // }}
            >
              <section className="trans-name-and-img">
                {/* <img
                    className="trans-img"
                    src={`${picUrl}/images/groceryImages/${item.name}/${item.img}`}
                    alt={item.name.substring(0, 10)}
                  /> */}
                <h4 className="trans-item-name">{item.name}</h4>
              </section>

              <article className="flex-article">
                {/* <section> */}
                <label>qty: </label>
                <input
                  type="text"
                  ref={qtyRef}
                  onFocus={(e) => e.target.select()}
                  className="in-person-qty"
                  value={item.qty}
                  onChange={(e) =>
                    dispatch({
                      type: "FIELDCHANGE",
                      payload: e.target.value,
                      id: item._id,
                    })
                  }
                />
                <span>
                  {" "}
                  <select
                    className="measure-options"
                    size={"1"}
                    value={item.unitMeasure}
                    onChange={(e) => onUnitMeasureChange(e, item._id)}
                  >
                    {item.availableUnitMeasures.map((measure, index) => {
                      return (
                        <option
                          className="update-form-unit-measure"
                          key={index}
                        >
                          {measure}
                        </option>
                      );
                    })}
                  </select>
                </span>

                {/* </section>  */}
              </article>
              <label className="desc-header">description: </label>
              <br />
              <textarea
                maxLength={500}
                className="description"
                value={item.description}
                onChange={(e) =>
                  dispatch({
                    type: "DESCRIPTION",
                    payload: e.target.value,
                    id: item._id,
                  })
                }
              ></textarea>
              <article>
                <h4
                // style={{
                //   display: `${state.getAllTotals ? "none" : "block"}`,
                // }}
                // >N{parseFloat(item.total).toFixed(2)}</h3>
                >
                  {currency}
                  {numberWithCommas(parseFloat(item.total).toFixed(2))}
                </h4>
              </article>

              {/* <article
                    
                    > */}
              {/* <p>price/{item.unitMeasure.split(' ')[1].slice(1, -1)}:</p>
                    <p>${item.price}</p> */}

              {/* </article> */}

              <h2 onClick={() => removeItem(item._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </h2>
            </section>
          );
        })
      )}
      {console.log(items)}
      <section>
        {/* <fieldset className="field"> */}
        <form className="tran-form">
          <article className="trans-add">
            <input
              type="text"
              className="trans-search"
              placeholder="select item"
              ref={inputRef}
              onChange={(e) => handleAdd(e)}
              list="edulevel"
            />
          </article>
          {/* {console.log(items)} */}
          <datalist id="edulevel">
            {acquiItems.map((item) => {
              return (
                <option
                  key={item._id}
                  value={`${item.name}`}
                  className="transaction-items-list"
                ></option>
              );
            })}
          </datalist>
        </form>
      </section>

      <section
        className="cash-window"
        // style={{
        //   display: "none",
        //   columnGap: "1rem",
        // }}
      >
        {/* <h2 id="grand-total-one">
          Total: {currency}
          {numberWithCommas(parseFloat(state.total).toFixed(2))}
        </h2> */}

        <article className="cash-confirm">
          <button onClick={done}>Save</button>
        </article>
      </section>
    </div>
  );
};

export default Used;
