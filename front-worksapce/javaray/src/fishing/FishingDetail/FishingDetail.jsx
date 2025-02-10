import { AddressP } from "../FishingList/FishingList.styled";
import {
  DetailWrap,
  TopWrap,
  DownWrap,
  TopBlock,
  TopImageBlock,
  TopTextBlock,
  TopMenuBlock,
  TopMenuInnerBlock,
  MenuText,
  DetailTitle,
  DetailTitleBlock,
  DetailAddressBlock,
  DetailAddress,
  PhoneBlock,
} from "./FishingDetail.styled";
import FishingProduct from "./FishingProduct";
import { TitleLine, TitleText } from "../FishingList/FishingList.styled";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FishingGoods from "./FishingGoods";
import FishingReview from "./FishingReview";

const FishingDetail = () => {
  const navigate = useNavigate();
  const [menuName, setMenuName] = useState("product");

  return (
    <>
      <TitleLine>
        <TitleText>민물낚시</TitleText>
      </TitleLine>
      <DetailWrap>
        <TopWrap>
          <TopBlock>
            <TopImageBlock></TopImageBlock>
            <TopTextBlock>
              <DetailTitleBlock>
                <DetailTitle>자바레이낚시터</DetailTitle>
              </DetailTitleBlock>
              <DetailAddressBlock>
                <DetailAddress>서울 노원구 동일로 190길 47</DetailAddress>
              </DetailAddressBlock>
              <PhoneBlock></PhoneBlock>
            </TopTextBlock>
          </TopBlock>
          <TopMenuBlock>
            <TopMenuInnerBlock onClick={() => setMenuName("review")}>
              <MenuText>리뷰</MenuText>
            </TopMenuInnerBlock>
            <TopMenuInnerBlock onClick={() => setMenuName("product")}>
              <MenuText>상세 정보</MenuText>
            </TopMenuInnerBlock>
            <TopMenuInnerBlock onClick={() => setMenuName("goods")}>
              <MenuText>상품 종류</MenuText>
            </TopMenuInnerBlock>
          </TopMenuBlock>
        </TopWrap>
        {menuName === "product" ? (
          <FishingProduct />
        ) : menuName === "goods" ? (
          <FishingGoods />
        ) : menuName === "review" ? (
          <FishingReview />
        ) : (
          <></> //예외상황을 위한 빈 div
        )}
      </DetailWrap>
    </>
  );
};

export default FishingDetail;
