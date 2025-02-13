import Footer from "./Footer/Footer";
import css from "./App.css";
import Shipping from "./shipping/Shipping";
import ShippingDetail from "./shipping/shippingDetail/ShippingDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarouselWithIndicatorsExample } from "./WelcomPage/CarouselComponent";
import Calendar from "./Calendar/Calendar";
import FishingDetail from "./fishing/FishingDetail/FishingDetail";
import CollapsibleExample from "./Header/Header";
import FundingLists from "./Funding/FundingList/FundingLists";
import FishingInsert from "./fishing/FishingInsert/FishingInsert";
import FishingList from "./fishing/FishingList/FishingList";
import BusninessNoAPI from "./Funding/FundingBusinessNoAuth/BusinessNoAPI";
import BusinessNoApply from "./Funding/FundingBusinessApply/BusinessNoApply";
import FundingGoodsForm from "./Funding/FundingGoodsForm/FundingGoodsInsert";
import FishingGoods from "./fishing/FishingDetail/FishingGoods";
import FishingReview from "./fishing/FishingDetail/FishingReview";
import FishingReviewInsert from "./fishing/FishingDetail/FishingReviewInsert";
import { AuthProvider } from "./UseContext/Auth/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CollapsibleExample />
        <Routes>
          <Route path="/" element={<CarouselWithIndicatorsExample />} />
          <Route path="shipping" element={<Shipping />} />
          <Route
            path="/shipping/detail/:shippingNo"
            element={<ShippingDetail />}
          />
          <Route path="funding" element={<FundingLists />} />
          <Route path="/fishing/insert" element={<FishingInsert />} />
          <Route path="fishing" element={<FishingList />} />
          <Route path="cal" element={<Calendar />} />
          <Route
            path="/fishing/detail/:fishingNo"
            element={<FishingDetail />}
          />
          <Route path="BusinessNoApi" element={<BusninessNoAPI />} />
          <Route path="BuninessApply" element={<BusinessNoApply />} />
          <Route path="FundingGoodsForm" element={<FundingGoodsForm />} />
          <Route path="FishingGoods" element={<FishingGoods />} />
          <Route path="/fishing/review" element={<FishingReview />} />
          <Route
            path="/fishing/review/insert"
            element={<FishingReviewInsert />}
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
