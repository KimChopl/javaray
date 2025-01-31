import {
  StyledShipDiv,
  StyledShipImage,
  StyledShipImgCover,
  StyledShipPersonDiv,
  StyledShipPersonSpan,
  StyledShipRatingCover,
  StyledShipRatingDiv,
  StyledShipTitleDiv,
} from "./shippingListCss";
import ShippingSmallMenu from "./shippingSmallMenu/ShippingSamllMenu";

const ShippingList = () => {
  return (
    <>
      <StyledShipDiv>
      <ShippingSmallMenu />
        <StyledShipImgCover>
          <StyledShipImage src=""/>
        </StyledShipImgCover>
        <StyledShipTitleDiv>
          <span>하이요</span>
        </StyledShipTitleDiv>
        <StyledShipRatingCover>
          <StyledShipPersonDiv>
            <StyledShipPersonSpan>최대 탑승 인원 : 10명</StyledShipPersonSpan>
          </StyledShipPersonDiv>
          <StyledShipRatingDiv>
            <StyledShipPersonSpan>3.8</StyledShipPersonSpan>
          </StyledShipRatingDiv>
        </StyledShipRatingCover>
        <StyledShipTitleDiv>인당 가격 : 40,000원</StyledShipTitleDiv>
      </StyledShipDiv>
    </>
  );
};

export default ShippingList;
