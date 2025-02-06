import Footer from "./Footer/Footer";
import Shipping from "./shipping/Shipping";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";
import { ModalProvider } from "./Modal/OpenOrCloseModal";
import Modal from "./Modal/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarouselWithIndicatorsExample } from "./WelcomPage/CarouselComponent";

import Mypage from "./member/Mypage/Mypage";

import CollapsibleExample from "./Header/Header";
import FundingLists from "./Funding/FundingList/FundingLists";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <CollapsibleExample />
        <Routes>
          <Route path="/" element={<CarouselWithIndicatorsExample />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="/shipping/detail" element={<ShippingDetail />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="funding" element={<FundingLists />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
