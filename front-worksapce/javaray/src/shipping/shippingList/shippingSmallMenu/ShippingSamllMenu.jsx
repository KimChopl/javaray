import { useState } from "react";
import { CircleCover, CircleDiv, PositionDiv } from "./ShippingSmallMenuCss";
import ShippingReport from "./shippingReport/ShippingReport";

const TripleCircleDiv = () => {
  return (
    <>
      <CircleDiv />
      <CircleDiv />
      <CircleDiv />
    </>
  );
};

const ShippingSmallMenu = (props) => {
  const [displayDiv, setDisplayDiv] = useState(false);
  const user = props.user;
  const onClickDiv = () => {
    setDisplayDiv(true);
    console.log(user);
  };

  const closeDiv = () => {
    setDisplayDiv(false);
  };

  return (
    <CircleCover>
      <PositionDiv onClick={!displayDiv ? onClickDiv : closeDiv}>
        <TripleCircleDiv />
      </PositionDiv>
      {displayDiv && (
        <ShippingReport
          user={user}
          shippingNo={props.shippingNo}
          i={setDisplayDiv}
        />
      )}
    </CircleCover>
  );
};

export default ShippingSmallMenu;
