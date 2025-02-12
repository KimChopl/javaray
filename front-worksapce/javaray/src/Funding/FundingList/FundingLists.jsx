import {
  CategoryItem,
  Container,
  FundingCategory,
  FundingGoods,
  FundingHr,
  FundingIcon,
  FundingIconContent,
  FundingTitle,
  GoodsContent,
  GoodsContent1,
  GoodsContent2,
  GoodsContent3,
  GoodsDiv,
  GoodsImg,
  GoodsInsert,
  Insert,
  PostItem,
  PostList,
} from "./FundingLists.styles";

import icon1 from "../FundingImg/FishingTool1.png";
import icon2 from "../FundingImg/FishingTool2.png";
import icon3 from "../FundingImg/FishingTool3.png";
import icon4 from "../FundingImg/FishingTool4.png";
import icon5 from "../FundingImg/FishingTool5.png";

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import axios from "axios";

const FundingLists = () => {
  const navigate = useNavigate();
  const { auth, validation } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("");
  const [flag, isFlag] = useState(false);
  const [hasMore, setHasMore] = useState();
  const [page, setPage] = useState();

  const handleLogin = () => {
    axios
      .get(
        "http://localhost/funding/selectList/hasToken",
        {
          params: {
            page: page,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setRole(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNoLogin = () => {
    axios
      .get("http://localhost/funding/selectList/hasNonToken", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        console.log(response);
        setRole("");
      })
      .catch((error) => {
        console.log(error);
        setRole("");
      });
  };

  useEffect(() => {
    /*
      1. 여기와서 auth봐야됨
      2. 로그인돼있으면 handleLogin불러야됨
      3. 안돼있으면 noHandleLogin불러야됨
    */
    console.log(auth.isAuthenticated);
    if (auth.isAuthenticated === undefined) return;
    if (auth.isAuthenticated) {
      handleLogin();
    } else {
      handleNoLogin();
    }
  }, [auth.isAuthenticated, page]);

  const handleMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <Container>
        <FundingTitle>펀딩사이트</FundingTitle>
        <FundingCategory>
          <CategoryItem>
            <FundingIcon src={icon5} alt="icon" />
            <FundingIconContent>전체</FundingIconContent>
          </CategoryItem>
          <CategoryItem>
            <FundingIcon src={icon1} alt="icon" />
            <FundingIconContent>낚시대</FundingIconContent>
          </CategoryItem>
          <CategoryItem>
            <FundingIcon src={icon2} alt="icon" />
            <FundingIconContent>릴</FundingIconContent>
          </CategoryItem>
          <CategoryItem>
            <FundingIcon src={icon3} alt="icon" />
            <FundingIconContent>낚싯줄</FundingIconContent>
          </CategoryItem>
          <CategoryItem>
            <FundingIcon src={icon4} alt="icon" />
            <FundingIconContent>낚시의류</FundingIconContent>
          </CategoryItem>
        </FundingCategory>

        <Insert>
          {role === "ROLE_USER" ? (
            <GoodsInsert onClick={() => navigate("/BusinessNoApi")}>
              사업자등록 인증
            </GoodsInsert>
          ) : role === "ROLE_BUSINESSNOAPI" ? (
            <GoodsInsert onClick={() => navigate("/BuninessApply")}>
              사업자등록 신청
            </GoodsInsert>
          ) : role === "ROLE_FUNDINGCOMPANY" ? (
            <GoodsInsert onClick={() => navigate("/FundingGoodsForm")}>
              상품등록
            </GoodsInsert>
          ) : null}
        </Insert>

        <FundingHr />
        <FundingGoods>
          <PostList>
            <PostItem>
              <GoodsDiv>
                <GoodsImg src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQhTX6sKiW0o-HmWoOYNzM1IfxdNALBegUmoYA5uLKw4iL9SCichdBhYvvZckcJQo6-KnuNgvw-IGCa0RCXvo76brL4-1Xx8lpkFw3VpOlp0QIbxinzUqtj3YgXT7W2AV-32mvlgUOl_A&usqp=CAc" />
                <GoodsContent>34%달성</GoodsContent>
                <GoodsContent1>
                  PLUSINNO Hunting V11 텔레스코픽 낚시대
                </GoodsContent1>
                <GoodsContent1>
                  <GoodsContent2>Temu</GoodsContent2>
                  <GoodsContent3>4일 남음</GoodsContent3>
                </GoodsContent1>
              </GoodsDiv>
            </PostItem>
            <PostItem>
              <GoodsDiv>
                <GoodsImg src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQhTX6sKiW0o-HmWoOYNzM1IfxdNALBegUmoYA5uLKw4iL9SCichdBhYvvZckcJQo6-KnuNgvw-IGCa0RCXvo76brL4-1Xx8lpkFw3VpOlp0QIbxinzUqtj3YgXT7W2AV-32mvlgUOl_A&usqp=CAc" />
                <GoodsContent>38%달성</GoodsContent>
                <GoodsContent1>
                  PLUSINNO Hunting V11 텔레스코픽 낚시대
                </GoodsContent1>
                <GoodsContent1>
                  <GoodsContent2>Temu</GoodsContent2>
                  <GoodsContent3>2일 남음</GoodsContent3>
                </GoodsContent1>
              </GoodsDiv>
            </PostItem>
            <PostItem>
              <GoodsDiv>
                <GoodsImg src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQhTX6sKiW0o-HmWoOYNzM1IfxdNALBegUmoYA5uLKw4iL9SCichdBhYvvZckcJQo6-KnuNgvw-IGCa0RCXvo76brL4-1Xx8lpkFw3VpOlp0QIbxinzUqtj3YgXT7W2AV-32mvlgUOl_A&usqp=CAc" />
                <GoodsContent>34%달성</GoodsContent>
                <GoodsContent1>
                  PLUSINNO Hunting V11 텔레스코픽 낚시대
                </GoodsContent1>
                <GoodsContent1>
                  <GoodsContent2>Temu</GoodsContent2>
                  <GoodsContent3>4일 남음</GoodsContent3>
                </GoodsContent1>
              </GoodsDiv>
            </PostItem>
            <PostItem>
              <GoodsDiv>
                <GoodsImg src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQhTX6sKiW0o-HmWoOYNzM1IfxdNALBegUmoYA5uLKw4iL9SCichdBhYvvZckcJQo6-KnuNgvw-IGCa0RCXvo76brL4-1Xx8lpkFw3VpOlp0QIbxinzUqtj3YgXT7W2AV-32mvlgUOl_A&usqp=CAc" />
                <GoodsContent>34%달성</GoodsContent>
                <GoodsContent1>
                  PLUSINNO Hunting V11 텔레스코픽 낚시대
                </GoodsContent1>
                <GoodsContent1>
                  <GoodsContent2>Temu</GoodsContent2>
                  <GoodsContent3>4일 남음</GoodsContent3>
                </GoodsContent1>
              </GoodsDiv>
            </PostItem>
            <PostItem>
              <GoodsDiv>
                <GoodsImg src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQhTX6sKiW0o-HmWoOYNzM1IfxdNALBegUmoYA5uLKw4iL9SCichdBhYvvZckcJQo6-KnuNgvw-IGCa0RCXvo76brL4-1Xx8lpkFw3VpOlp0QIbxinzUqtj3YgXT7W2AV-32mvlgUOl_A&usqp=CAc" />
                <GoodsContent>34%달성</GoodsContent>
                <GoodsContent1>
                  PLUSINNO Hunting V11 텔레스코픽 낚시대
                </GoodsContent1>
                <GoodsContent1>
                  <GoodsContent2>Temu</GoodsContent2>
                  <GoodsContent3>4일 남음</GoodsContent3>
                </GoodsContent1>
              </GoodsDiv>
            </PostItem>
          </PostList>
        </FundingGoods>
        <br />
        <br />
        <br />
        {hasMore && <button onClick={handleMore}>더 보기</button>}
      </Container>
    </>
  );
};

export default FundingLists;
