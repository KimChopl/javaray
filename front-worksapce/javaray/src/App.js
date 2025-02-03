import Shipping from "./shipping/Shipping";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="shipping" element={<Shipping />} />
        <Route path="/shipping/detail" element={<ShippingDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
