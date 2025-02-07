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

import { useNavigate } from "react-router-dom";

const FundingLists = () => {
  const navigate = useNavigate();

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
          {30 === 10 ? (
            <GoodsInsert onClick={() => navigate("/BusinessNoApi")}>
              사업자등록 인증
            </GoodsInsert>
          ) : 30 === 20 ? (
            <GoodsInsert onClick={() => navigate("/BuninessApply")}>
              사업자등록 신청
            </GoodsInsert>
          ) : 30 === 30 ? (
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
      </Container>
    </>
  );
};

export default FundingLists;
