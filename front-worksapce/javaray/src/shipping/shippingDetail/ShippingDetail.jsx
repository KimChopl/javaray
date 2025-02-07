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
  ContentLabel,
  FishTable,
  Td,
  BookBtn,
  OtherInfo,
  BookBtnCover,
  AttentionInfo,
  RatingInfo,
} from "./ShippingDetailCss";
import Modal from "../../Modal/Modal";
import { useState } from "react";

const ShippingDetail = () => {
  const [flag, isFlag] = useState(false);
  const [attention, setAttention] = useState(false);
  const changeAttention = () => {
    if (attention) {
      setAttention(false);
    } else {
      setAttention(true);
    }
  };
  const clickModal = (e) => {
    isFlag(e);
  };
  const closeModal = (e) => {
    isFlag(e);
  };

  const move = (e) => {
    console.log(e);
    document.getElementById(e).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
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
                <LocationDiv>
                  <ContentLabel>무슨도 어디군 어디읍 무슨항</ContentLabel>
                </LocationDiv>
              </BaseBar>
              <BaseBar>
                <PriceDiv>
                  <ContentLabel>인당 가격 :</ContentLabel>
                </PriceDiv>
                <AllowNumberDiv>
                  <ContentLabel>최대 탑승 인원 :</ContentLabel>
                </AllowNumberDiv>
              </BaseBar>
              <BaseBar>
                <FishTable>
                  <thead>
                    <tr>
                      <th colSpan={2}>낚시 가능 어종</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td onClick={() => clickModal(true)}>광어</Td>
                      <Td>우럭</Td>
                    </tr>
                  </tbody>
                </FishTable>
              </BaseBar>
              <BaseBar>
                <BookBtnCover>
                  <BookBtn>에약하기</BookBtn>
                </BookBtnCover>
                <AttentionInfo onClick={changeAttention}>
                  {attention ? "❤" : "🤍"}
                  <label>+20</label>
                </AttentionInfo>
              </BaseBar>
              <BaseBar>
                <OtherInfo onClick={() => move("contentSection")}>
                  상세내용
                </OtherInfo>
                <OtherInfo onClick={() => move("reviewSection")}>
                  리뷰
                </OtherInfo>
                <RatingInfo>⭐ 3.8</RatingInfo>
              </BaseBar>
            </BaseCover>
          </DetailBase>
          <WeatherCover>일주일 날씨 예보</WeatherCover>
          <ShippingContent id="contentSection">상세 내용</ShippingContent>
          <ReviewCover id="reviewSection">리뷰들</ReviewCover>
        </DetailBody>
      </DetailWarp>
      {flag && <Modal kind={"fishExplain"} clickModal={closeModal} />}
    </>
  );
};

export default ShippingDetail;
