import SearchBar from "./searchbar/Searchbar";
import { ModalBackground, StyledShipWarp } from "./ShippingCss";
import ShippingList from "./shippingList/ShippingList";
import ReportForm from "./shippingList/shippingSmallMenu/shippingReport/reportForm/ReprotForm";
import { useState } from "react";

const Shipping = () => {
  return (
    <StyledShipWarp>
      <SearchBar />
      <ShippingList />
    </StyledShipWarp>
  );
};

export default Shipping;
