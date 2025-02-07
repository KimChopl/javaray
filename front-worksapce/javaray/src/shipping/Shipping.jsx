import SearchBar from "./searchbar/Searchbar";
import { StyledShipWarp } from "./ShippingCss";
import ShippingList from "./shippingList/ShippingList";

const Shipping = () => {
  return (
    <StyledShipWarp>
      <SearchBar />
      <ShippingList />
    </StyledShipWarp>
  );
};

export default Shipping;
