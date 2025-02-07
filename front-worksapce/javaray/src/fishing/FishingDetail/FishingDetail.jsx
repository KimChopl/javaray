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
import { useEffect } from "react";

const FishingDetail = () => {
  const navigate = useNavigate();
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
            <TopMenuInnerBlock>
              <MenuText>리뷰</MenuText>
            </TopMenuInnerBlock>
            <TopMenuInnerBlock>
              <MenuText>상세 정보</MenuText>
            </TopMenuInnerBlock>
            <TopMenuInnerBlock onClick={() => navigate("/FishingGoods")}>
              <MenuText>상품 종류</MenuText>
            </TopMenuInnerBlock>
          </TopMenuBlock>
        </TopWrap>
        <FishingProduct></FishingProduct>
      </DetailWrap>
    </>
  );
};

export default FishingDetail;
