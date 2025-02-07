import { useState } from "react";
import { CircleCover, CircleDiv, PositionDiv } from "./ShippingSmallMenuCss";
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
      <PositionDiv>
        <CircleDiv />
        <CircleDiv />
        <CircleDiv />
      </PositionDiv>
      {displayDiv && <ShippingReport i={setDisplayDiv} />}
    </CircleCover>
  );
};

export default ShippingSmallMenu;
