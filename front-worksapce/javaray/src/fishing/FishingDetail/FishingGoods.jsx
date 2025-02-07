import { DownWrap, MessageTitle, MessageText } from "./FishingProduct.styled";
import {
  Content,
  TitleDiv,
  TextDiv,
  InnerTextDiv,
  GoodsTitleDiv,
  GoodsTitle,
  GoodsExDiv,
  GoodsEx,
  GoodsPriceDiv,
  PriceTitle,
} from "./FishingGoods.styled";
import FishingDetail from "./FishingDetail";

const FishingGoods = () => {
  return (
    <>
      <DownWrap>
        <Content>
          <TitleDiv>
            <MessageTitle>상품 종류</MessageTitle>
          </TitleDiv>
          <TextDiv>
            <InnerTextDiv>
              <GoodsTitleDiv>
                <GoodsTitle>노지-잡이터(1인입어료포함)</GoodsTitle>
              </GoodsTitleDiv>
              <GoodsPriceDiv>
                <PriceTitle>50,000원</PriceTitle>
              </GoodsPriceDiv>
            </InnerTextDiv>
            <GoodsExDiv>
              <GoodsEx>입어료 무료</GoodsEx>
              <GoodsEx>1인 기준 : 최소 1인 / 최대 2인</GoodsEx>
            </GoodsExDiv>
          </TextDiv>
          <TextDiv>
            <InnerTextDiv>
              <GoodsTitleDiv>
                <GoodsTitle>노지-잡이터(1인입어료포함)</GoodsTitle>
              </GoodsTitleDiv>
              <GoodsPriceDiv>
                <PriceTitle>50,000원</PriceTitle>
              </GoodsPriceDiv>
            </InnerTextDiv>
            <GoodsExDiv>
              <GoodsEx>입어료 무료</GoodsEx>
              <GoodsEx>1인 기준 : 최소 1인 / 최대 2인</GoodsEx>
            </GoodsExDiv>
          </TextDiv>
          <TextDiv>
            <InnerTextDiv>
              <GoodsTitleDiv>
                <GoodsTitle>노지-잡이터(1인입어료포함)</GoodsTitle>
              </GoodsTitleDiv>
              <GoodsPriceDiv>
                <PriceTitle>50,000원</PriceTitle>
              </GoodsPriceDiv>
            </InnerTextDiv>
            <GoodsExDiv>
              <GoodsEx>입어료 무료</GoodsEx>
              <GoodsEx>1인 기준 : 최소 1인 / 최대 2인</GoodsEx>
            </GoodsExDiv>
          </TextDiv>
        </Content>
      </DownWrap>
    </>
  );
};

export default FishingGoods;
