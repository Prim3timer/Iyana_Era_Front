import Item from "./components/Item";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inventory from "./components/Inventory";
import Layout from "./components/Layout";
import PurchaseHistory from "./components/PurchaseHistory";
import Acquisition from "./components/Acquisition";
import Usage from "./components/Usage";
import Used from "./components/Used";
import UsageData from "./components/UsageData";
import Expenditure from "./components/Expenditure";
function App() {
  return (
    <main className="App">
      <Navbar />
      <div className="grower">
        <h4 className="app-headline">Iyana Era Project</h4>
        <Routes>
          <Route path="/">
            <Route path="/" index element={<Item />} />
            <Route path="/items" index element={<Item />} />
            <Route path="/edit-item" element={<EditItem />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route path="acquisition" element={<Acquisition />} />
            <Route path="usage" element={<Usage />} />
            <Route path="used" element={<Used />} />
            <Route path="/usage-data" element={<UsageData />} />
            <Route path="/expenditure" element={<Expenditure />} />
          </Route>
        </Routes>
      </div>
      <section className="footer">Amalu Productions</section>
    </main>
  );
}

export default App;
