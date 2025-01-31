import { useState } from "react";
import { CircleCover, CircleDiv, Report } from "./ShippingSmallMenuCss";

const ShippingSmallMenu = () => {
  const [displayDiv, setDisplayDiv] = useState(false);
  const onClickDiv = () => {
    if(displayDiv === false){
      setDisplayDiv(true)
    } else {
      setDisplayDiv(false);
    }
  }
  const outMouse = () =>{
    setDisplayDiv(false);
  }

  const overMouse = () => {
    setDisplayDiv(true);
  }
  return (
    <CircleCover onClick={onClickDiv}>
      <CircleDiv />
      <CircleDiv />
      <CircleDiv />
      {displayDiv && <Report onMouseover={overMouse} onMouseOut={outMouse}>
      </Report>}
    </CircleCover>
  );
};

export default ShippingSmallMenu;
