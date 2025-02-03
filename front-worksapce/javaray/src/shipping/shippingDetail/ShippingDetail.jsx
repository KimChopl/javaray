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
            <BaseBar></BaseBar>
            <BaseBar></BaseBar>
            <BaseBar></BaseBar>
            <BaseBar></BaseBar>
            <BaseBar></BaseBar>
          </BaseCover>
        </DetailBase>
        <WeatherCover></WeatherCover>
        <ShippingContent></ShippingContent>
        <ReviewCover></ReviewCover>
      </DetailBody>
    </DetailWarp>
  );
};

export default ShippingDetail;
