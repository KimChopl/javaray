import Footer from "./Footer/Footer";
import Shipping from "./shipping/Shipping";
import { Routes, Route } from "react-router-dom";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";
import { ModalProvider } from "./Modal/OpenOrCloseModal";
import Modal from "./Modal/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarouselWithIndicatorsExample } from "./WelcomPage/CarouselComponent";

function App() {
  return (
    <ModalProvider>
      <CarouselWithIndicatorsExample />

      <Routes>
        <Route path="shipping" element={<Shipping />} />
        <Route path="/shipping/detail" element={<ShippingDetail />} />
      </Routes>
      <Footer />
    </ModalProvider>
  );
}

export default App;
