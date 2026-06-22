const reducer = (state, action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.payload };
    case "FIRSTPRICE":
      return { ...state, firstPrice: action.payload };
    case "SECONDPRICE":
      return { ...state, secondPrice: action.payload };
    case "FIRSTUNITMEASURE":
      return { ...state, firstUnitMeasure: action.payload };
    case "SECONDUNITMEASURE":
      return { ...state, secondUnitMeasure: action.payload };
    case "QTY":
      return { ...state, qty: action.payload };
    case "DENOMINATOR":
      return { ...state, denominator: action.payload };
    case "NUMERATOR":
      return { ...state, numerator: action.payload };
    case "TRANSARRAY":
      const newArray = [...state.transArray, action.payload];
      return { ...state, transArray: newArray };
    case "unitMeasure":
      const currentArray = state.transArray.map((item) => {
        if (item._id === action.id) {
          const currentIndex = item.availableUnitMeasures.indexOf(
            action.payload,
          );
          return {
            ...item,
            unitMeasure: action.payload,
            total: item.availablePrices[currentIndex],
            price: item.availablePrices[currentIndex],
            qty: 1,
            index: action.index,
            // total: item.availablePrices[currentIndex],
          };
        }
        return item;
      });
      return {
        ...state,
        unitMeasure: action.payload,
        transArray: currentArray,
      };
    case "ALERTMSG":
      return { ...state, alertMsg: action.payload };
    case "CASH":
      return { ...state, cash: action.payload };
    case "FIELDCHANGE":
      const tempCart3 = state.transArray.map((item) => {
        const theIndeces = item.availableUnitMeasures.indexOf(item.unitMeasure);
        if (item._id === action.id) {
          return {
            ...item,
            qty: action.payload,
            total: item.availablePrices[theIndeces] * action.payload,
          };
        }
        return item;
      });
      return { ...state, transArray: tempCart3 };
    case "getTotal":
      const { amount, total } = state.transArray.reduce(
        (cartTotal, cartItem) => {
          const theIndeces = cartItem.availableUnitMeasures.indexOf(
            cartItem.unitMeasure,
          );
          cartTotal.total +=
            cartItem.availablePrices[theIndeces] * cartItem.qty;
          cartTotal.amount += cartItem.qty;
          return cartTotal;
        },
        {
          amount: 0,
          total: 0,
        },
      );
      return { ...state, amount, total };
    case "FILTERTRANSARRAY":
      const filterate = state.transArray.filter(
        (item) => item._id !== action.payload,
      );
      return { ...state, transArray: filterate };
    case "SEARCH":
      return { ...state, search: action.payload };
    case "SEARCH2":
      return { ...state, search2: action.payload };
    case "DESCRIPTION":
      const setDescriptons = state.transArray.map((item) => {
        if (item._id === action.id) {
          return { ...item, description: action.payload };
        }
        return item;
      });
      console.log(state.transArray);
      return { ...state, transArray: setDescriptons };
    case "ACQUIITEMS":
      return { ...state, acquiItems: action.payload };
    case "RECEIPTS":
      return { ...state, receipts: action.payload };
    case "USAGERECEIPTS":
      return { ...state, usageReceipts: action.payload };
    case "SUCCESS":
      return { ...state, success: action.payload };

    case "INVENTMEASURE":
      const newArray2 = state.acquiItems.map((item) => {
        if (item._id === action.id) {
          const currentIndex = action.payload;

          return {
            ...item,
            unitMeasure: item.availableUnitMeasures[currentIndex],
            qty: item.availableQuantities[currentIndex],
          };
        }
        return item;
      });
      return { ...state, acquiItems: newArray2 };
    case "LOCALACQUI":
      return { ...state, localAcqui: action.payload };
    case "VERIFY":
      return { ...state, verify: action.payload };
    case "ITEM":
      return { ...state, item: action.payload };
    case "ID":
      return { ...state, id: action.payload };
    case "SHOWMORE":
      return { ...state, showMore: !state.showMore };
    default:
      throw new Error();
  }
};

export default reducer;
