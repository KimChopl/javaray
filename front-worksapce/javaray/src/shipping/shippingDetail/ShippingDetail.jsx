import {
  BaseCover,
  DetailBase,
  DetailBody,
  DetailHeader,
  DetailWarp,
  ImageCover,
  ImageBox,
  BaseBar,
  WeatherCover,
  ShippingContent,
  ReviewCover,
  LocationDiv,
  PriceDiv,
  AllowNumberDiv,
} from "./ShippingDetailCss";

const ShippingDetail = () => {
  return (
    <DetailWarp>
      <DetailHeader>
        <h1>제목이 들어갈 자리</h1>
      </DetailHeader>
      <DetailBody>
        <DetailBase>
          <ImageCover>
            <ImageBox src="" alt="여러장 넣어야하는디" />
          </ImageCover>
          <BaseCover>
            <BaseBar>
              <LocationDiv>무슨도 어디군 어디읍 무슨항</LocationDiv>
            </BaseBar>
            <BaseBar>
              <PriceDiv>인당 가격 : </PriceDiv>
              <AllowNumberDiv>최대 탑승 인원 :</AllowNumberDiv>
            </BaseBar>
            <BaseBar></BaseBar>
            <BaseBar></BaseBar>
            <BaseBar></BaseBar>
          </BaseCover>
        </DetailBase>
        <WeatherCover>일주일 날씨 예보</WeatherCover>
        <ShippingContent>상세 내용</ShippingContent>
        <ReviewCover>리뷰들</ReviewCover>
      </DetailBody>
    </DetailWarp>
  );
};

export default ShippingDetail;
