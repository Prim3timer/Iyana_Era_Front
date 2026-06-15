import UsageReceipts from "./components/UsageReceipt";

const initialState = {
  name: "",
  firstPrice: 0,
  secondPrice: 0,
  firstUnitMeasure: "",
  secondUnitMeasure: "",
  qty: 0,
  denominator: 0,
  numerator: 0,
  transArray: [],
  unitMeasure: "",
  alertMsg: "",
  cash: false,
  total: 0,
  search: "",
  search2: "",
  acquiItems: [],
  receipts: [],
  UsageReceipts: [],
  success: false,
  localAcqui: [],
};

export default initialState;
