import Shipping from "./shipping/Shipping";
import { Routes, Route, } from "react-router-dom";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";
import { ModalProvider } from "./Modal/OpenOrCloseModal";
import Modal from "./Modal/Modal";

function App() {
  return (
    <ModalProvider>

      <Routes>
        <Route path="shipping" element={<Shipping />} />
        <Route path="/shipping/detail" element={<ShippingDetail />} />
      </Routes>
    </ModalProvider>
  );
}

export default App;
