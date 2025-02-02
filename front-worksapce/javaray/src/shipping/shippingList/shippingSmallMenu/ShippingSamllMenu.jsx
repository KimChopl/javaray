import { useState } from "react";
import { CircleCover, CircleDiv } from "./ShippingSmallMenuCss";
import ShippingReport from "./shippingReport/ShippingReport";

const ShippingSmallMenu = (props) => {
  const [displayDiv, setDisplayDiv] = useState(false);
  const onClickDiv = () => {
    if(displayDiv === false){
      setDisplayDiv(true);
    } else {
      setDisplayDiv(false);
    }
  }

  const isReport = (x) => {
    props.setReport(x);
  }
 
  return (
    <CircleCover onClick={onClickDiv}>
      <CircleDiv />
      <CircleDiv />
      <CircleDiv />
      {displayDiv && <ShippingReport a={isReport}/>}
    </CircleCover>
  );
};

export default ShippingSmallMenu;
