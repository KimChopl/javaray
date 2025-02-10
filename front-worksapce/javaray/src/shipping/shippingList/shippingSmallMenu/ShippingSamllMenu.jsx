import { useState } from "react";
import { CircleCover, CircleDiv, PositionDiv } from "./ShippingSmallMenuCss";
import ShippingReport from "./shippingReport/ShippingReport";

const ShippingSmallMenu = () => {
  const [displayDiv, setDisplayDiv] = useState(false);
  const onClickDiv = () => {
    setDisplayDiv(true);
  };

  const closeDiv = () => {
    setDisplayDiv(false);
  };

  return (
    <CircleCover>
      <PositionDiv onClick={!displayDiv ? onClickDiv : closeDiv}>
        <CircleDiv />
        <CircleDiv />
        <CircleDiv />
      </PositionDiv>
      {displayDiv && <ShippingReport i={setDisplayDiv} />}
    </CircleCover>
  );
};

export default ShippingSmallMenu;
