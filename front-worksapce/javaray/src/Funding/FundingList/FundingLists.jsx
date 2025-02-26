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
import "../../App.css";

const FundingLists = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [boards, setBoards] = useState([]);
  const [categoryNo, setCategoryNo] = useState(1);

  const handleLogin = () => {
    axios
      .get(
        `http://localhost/funding/selectList/hasToken?page=${page}&categoryNo=${categoryNo}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        setRole(response.data[0].role);
        if (response.data && response.data[0].boardNo !== null) {
          setBoards([...boards, ...response.data]);
          if (response.data.length < 6) {
            setHasMore(false);
          }
        }
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
          categoryNo: categoryNo,
        },
      })
      .then((response) => {
        setRole("");
        if (response.data && response.data[0].boardNo !== null) {
          setBoards([...boards, ...response.data]);
          if (response.data.length < 6) {
            setHasMore(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setRole("");
      });
  };

  useEffect(() => {
    if (auth.isAuthenticated === undefined) return;
    if (auth.isAuthenticated) {
      handleLogin();
    } else {
      handleNoLogin();
    }
  }, [auth.isAuthenticated, page, categoryNo]);

  const handleMore = () => {
    setPage((page) => page + 1);
  };

  const getRemainDate = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);

    const diffTime = end.getTime() - today.getTime();

    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return remainingDays > 0 ? `${remainingDays}일 남음` : "마감됨";
  };

  const handleCategory = (e) => {
    setCategoryNo(e);
    setPage(0);
    setBoards([]);
    setHasMore(true);
  };

  return (
    <>
      <Container id="kekeke">
        <FundingTitle id="kikiki">펀딩사이트</FundingTitle>
        <div className="hi">
          <div className="wrap">
            <div className="circle">
              <div className="wave-one"></div>
              <div className="wave-two"></div>
              <div className="wave-three"></div>
              <div className="wave-four"></div>

              <i className="fas fa-moon"></i>
              <i className="fas fa-moon blur"></i>

              <div className="star">
                <i className="fas fa-asterisk star1"></i>
                <i className="fas fa-asterisk star2"></i>
                <i className="fas fa-asterisk star3"></i>
                <i className="fas fa-asterisk star4"></i>
                <i className="fas fa-asterisk star5"></i>
              </div>
            </div>
          </div>
        </div>
        <FundingCategory id="fire">
          <CategoryItem onClick={() => handleCategory(1)}>
            <FundingIcon src={icon5} alt="icon" />
            <FundingIconContent>전체</FundingIconContent>
          </CategoryItem>
          <CategoryItem onClick={() => handleCategory(2)}>
            <FundingIcon src={icon1} alt="icon" />
            <FundingIconContent>낚시대</FundingIconContent>
          </CategoryItem>
          <CategoryItem onClick={() => handleCategory(3)}>
            <FundingIcon src={icon2} alt="icon" />
            <FundingIconContent>릴</FundingIconContent>
          </CategoryItem>
          <CategoryItem onClick={() => handleCategory(4)}>
            <FundingIcon src={icon3} alt="icon" />
            <FundingIconContent>낚싯줄</FundingIconContent>
          </CategoryItem>
          <CategoryItem onClick={() => handleCategory(5)}>
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
            {boards.length > 0 ? (
              boards.map((board) => (
                <PostItem key={board.boardNo}>
                  <GoodsDiv>
                    <GoodsImg src={board.fundingFileList[0].fileUrl} />
                    <GoodsContent>
                      {board.currentSalePercent ? board.currentSalePercent : 0}%
                      달성
                    </GoodsContent>
                    <GoodsContent1>{board.boardTitle}</GoodsContent1>
                    <GoodsContent1>
                      <GoodsContent2>{board.companyName}</GoodsContent2>
                      <GoodsContent3>
                        {getRemainDate(board.endDate)}
                      </GoodsContent3>
                    </GoodsContent1>
                  </GoodsDiv>
                </PostItem>
              ))
            ) : (
              <p>펀딩 게시물이 존재하지 않습니다.</p>
            )}
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
