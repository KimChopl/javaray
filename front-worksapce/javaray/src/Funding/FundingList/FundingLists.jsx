import {
  CategoryItem,
  Container,
  FundingCategory,
  FundingGoods,
  FundingHr,
  FundingIcon,
  FundingIconContent,
  FundingTitle,
  GoodsContent1,
  GoodsContent2,
  GoodsContent3,
  GoodsDiv,
  GoodsImg,
  Insert,
  PostItem,
  PostList,
} from "./FundingLists.styles";

import icon1 from "../FundingList/FundingImg/FishingTool1.png";
import icon2 from "../FundingList/FundingImg/FishingTool2.png";
import icon3 from "../FundingList/FundingImg/FishingTool3.png";
import icon4 from "../FundingList/FundingImg/FishingTool4.png";
import icon5 from "../FundingList/FundingImg/FishingTool5.png";

const FundingLists = () => {
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
          {10 === 10 ? (
            <span>사업자등록 인증</span>
          ) : 10 === 20 ? (
            <span>사업자등록 신청</span>
          ) : 10 === 30 ? (
            <span>상품등록</span>
          ) : null}
        </Insert>

        <FundingHr />
        <FundingGoods>
          <PostList>
            <PostItem>
              <GoodsDiv>
                <GoodsImg src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQhTX6sKiW0o-HmWoOYNzM1IfxdNALBegUmoYA5uLKw4iL9SCichdBhYvvZckcJQo6-KnuNgvw-IGCa0RCXvo76brL4-1Xx8lpkFw3VpOlp0QIbxinzUqtj3YgXT7W2AV-32mvlgUOl_A&usqp=CAc" />
                <GoodsContent1>34%달성</GoodsContent1>
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
