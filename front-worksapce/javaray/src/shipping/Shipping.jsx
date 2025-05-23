import { useContext, useEffect, useState } from "react";
import SearchBar from "./searchbar/Searchbar";
import { InsertBtn, InsertDiv, StyledShipWarp } from "./ShippingCss";
import ShippingList from "./shippingList/ShippingList";
import axios from "axios";
import { More } from "./shippingList/shippingListCss";
import { AuthContext } from "../UseContext/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(0);
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  useEffect(() => {
    const selectShippings = async () => {
      const response = await axios.get(
        `http://localhost/shippings?page=${page}`
      );
      setData([...data, ...response.data]);
      setLength(response.data.length);
    };
    selectShippings();
  }, [page]);

  return (
    <StyledShipWarp>
      <SearchBar />
      <InsertDiv>
        {auth.isAuthenticated && (
          <InsertBtn onClick={() => navi("/shipping/insert")}>
            등록하기
          </InsertBtn>
        )}
      </InsertDiv>
      <ShippingList setData={setData} data={data} />
      {length === 20 && (
        <More onClick={() => setPage((page) => page + 1)}>더보기</More>
      )}
    </StyledShipWarp>
  );
};

export default Shipping;
