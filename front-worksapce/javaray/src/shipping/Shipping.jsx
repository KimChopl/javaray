import { useEffect, useState } from "react";
import SearchBar from "./searchbar/Searchbar";
import { StyledShipWarp } from "./ShippingCss";
import ShippingList from "./shippingList/ShippingList";
import axios from "axios";
import { More } from "./shippingList/shippingListCss";

const Shipping = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const abc = async () => {
      const response = await axios.get(
        `http://localhost/shippings?page=${page}`
      );
      setData([...data, ...response.data]);
      console.log(response);
    };

    abc();
  }, [page]);

  return (
    <StyledShipWarp>
      <SearchBar />
      {data.map((data) => (
        <ShippingList key={data.shippingNo} data={data} />
      ))}
      {data.length === 20 && (
        <More onClick={() => setPage((page) => page + 1)}>더보기</More>
      )}
    </StyledShipWarp>
  );
};

export default Shipping;
