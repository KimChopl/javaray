import Footer from "./Footer/Footer";
import Shipping from "./shipping/Shipping";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarouselWithIndicatorsExample } from "./WelcomPage/CarouselComponent";
import Calendar from "./Calendar/Calendar";

import Mypage from "./member/Mypage/Mypage";

import CollapsibleExample from "./Header/Header";
import FundingLists from "./Funding/FundingList/FundingLists";
import FishingInsert from "./fishing/FishingInsert/FishingInsert";
import FishingList from "./fishing/FishingList/FishingList";

function App() {
  return (
    <BrowserRouter>
      <CollapsibleExample />
      <Routes>
        <Route path="/" element={<CarouselWithIndicatorsExample />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="/shipping/detail" element={<ShippingDetail />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="funding" element={<FundingLists />} />
        <Route path="/fishing/insert" element={<FishingInsert />} />
        <Route path="fishing" element={<FishingList />} />
        <Route path="cal" element={<Calendar />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
