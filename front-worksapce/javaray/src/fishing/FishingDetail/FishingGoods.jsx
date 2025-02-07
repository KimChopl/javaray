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
                <GoodsPriceDiv>
                  <PriceTitle>50,000원</PriceTitle>
                </GoodsPriceDiv>
              </GoodsTitleDiv>
              <GoodsExDiv>
                <GoodsEx>입어료 포함</GoodsEx>
              </GoodsExDiv>
            </InnerTextDiv>
          </TextDiv>
        </Content>
      </DownWrap>
    </>
  );
};

export default FishingGoods;
