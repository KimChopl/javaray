import Footer from "./Footer/Footer";
import Shipping from "./shipping/Shipping";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarouselWithIndicatorsExample } from "./WelcomPage/CarouselComponent";
import Calendar from "./Calendar/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarouselWithIndicatorsExample />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="/shipping/detail" element={<ShippingDetail />} />
        <Route path="cal" element={<Calendar />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
