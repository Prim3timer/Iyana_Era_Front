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
import Zip from "./Zip";

function App() {
  const location = useLocation();
  const year = new Date().getFullYear();
  return (
    <main className="App">
      {location.pathname === "/zip" ? "" : <Navbar />}
      <div className="grower">
        {/* <h4 className="app-headline">Iyana Era Project</h4> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/zip" element={<Zip />} />
            <Route path="/zip" index element={<Zip />} /> */}
            <Route path="/" element={<Item />} />
            <Route path="/items" element={<Item />} />
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
      <section className="footer">&copy; {year} Amalu Productions</section>
    </main>
  );
}

export default App;
