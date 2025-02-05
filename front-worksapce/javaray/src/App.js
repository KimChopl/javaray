import Footer from "./Footer/Footer";
import Shipping from "./shipping/Shipping";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarouselWithIndicatorsExample } from "./WelcomPage/CarouselComponent";

function App() {
  return (
    <BrowserRouter>
      <CarouselWithIndicatorsExample />

      <Routes>
        <Route path="shipping" element={<Shipping />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
