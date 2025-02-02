import { StyledShipWarp } from "./ShippingCss";
import ShippingList from "./shippingList/ShippingList";
import ReportForm from "./shippingList/shippingSmallMenu/shippingReport/reportForm/ReprotForm";
import { useState } from "react";

const Shipping = () => {
  const [report, setReport] = useState(false);
    const isReport = (x) => {
      setReport(x);
    }
  return (
      <StyledShipWarp>
        <ShippingList setReport={isReport}/>
        {report && <ReportForm />}
      </StyledShipWarp>
  );
};

export default Shipping;
