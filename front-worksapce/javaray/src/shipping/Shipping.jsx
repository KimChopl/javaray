import SearchBar from "./searchbar/Searchbar";
import { ModalBackground, StyledShipWarp } from "./ShippingCss";
import ShippingList from "./shippingList/ShippingList";
import ReportForm from "./shippingList/shippingSmallMenu/shippingReport/reportForm/ReprotForm";
import { useState } from "react";

const Shipping = () => {
  const [report, setReport] = useState(false);
  const isReport = (x) => {
    setReport(x);
  };
  return (
    <StyledShipWarp>
      <SearchBar />
      <ShippingList setReport={isReport} />
      {report && (
        <ModalBackground>
          <ReportForm setReport={isReport} />
        </ModalBackground>
      )}
    </StyledShipWarp>
  );
};

export default Shipping;
