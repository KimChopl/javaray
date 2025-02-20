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
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navi = useNavigate();
  useEffect(() => {
    const abc = async () => {
      const response = await axios.get(
        `http://localhost/shippings?page=${page}`
      );
      setData([...data, ...response.data]);
      console.log(response);
    };
    abc();
    if (auth.isAuthenticated) {
      axios
        .get(`http://localhost/members/users`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [page, auth]);

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
      {data.map((data) => (
        <ShippingList
          key={data.shippingNo}
          shippingNo={data.shippingNo}
          data={data}
          user={user} // 지저분함
        />
      ))}
      {data.length === 20 && (
        <More onClick={() => setPage((page) => page + 1)}>더보기</More>
      )}
    </StyledShipWarp>
  );
};

export default Shipping;
