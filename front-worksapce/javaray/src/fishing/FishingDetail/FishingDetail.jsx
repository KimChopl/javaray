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

const FishingDetail = () => {
  return (
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
          <TopMenuInnerBlock>
            <MenuText>상품 정보</MenuText>
          </TopMenuInnerBlock>
        </TopMenuBlock>
      </TopWrap>
      <FishingProduct />
    </DetailWrap>
  );
};

export default FishingDetail;
