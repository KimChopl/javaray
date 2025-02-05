import { useState } from "react";
import { CircleCover, CircleDiv } from "./ShippingSmallMenuCss";
import ShippingReport from "./shippingReport/ShippingReport";

const ShippingSmallMenu = () => {
  const [displayDiv, setDisplayDiv] = useState(false);
  const onClickDiv = () => {
    //console.log("먼디");
    if (displayDiv === false) {
      setDisplayDiv(true);
    } else {
      //setDisplayDiv(false);
    }
  };

  return (
    <CircleCover onClick={onClickDiv}>
      <CircleDiv />
      <CircleDiv />
      <CircleDiv />
      {displayDiv && <ShippingReport i={setDisplayDiv} />}
    </CircleCover>
  );
};

export default ShippingSmallMenu;
