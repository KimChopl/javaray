import Footer from "./Footer/Footer";
import Shipping from "./shipping/Shipping";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";
import { ModalProvider } from "./Modal/OpenOrCloseModal";
import Modal from "./Modal/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarouselWithIndicatorsExample } from "./WelcomPage/CarouselComponent";
import { AuthProvider } from "./member/context/AuthContext";

import Mypage from "./member/Mypage/Mypage";

import CollapsibleExample from "./Header/Header";
import Login from "./member/Login/Login";
import Join from "./member/Join/Join";
import JoinFrom from "./member/Join/Join";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <CollapsibleExample />
          <CarouselWithIndicatorsExample />
          <Routes>
            <Route path="shipping" element={<Shipping />} />
            <Route path="/shipping/detail" element={<ShippingDetail />} />
            <Route path="mypage" element={<Mypage />} />
            <Route path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
