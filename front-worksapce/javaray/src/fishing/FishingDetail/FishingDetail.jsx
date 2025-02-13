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
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import FishingGoods from "./FishingGoods";
import FishingReview from "./FishingReview";
import axios from "axios";

const FishingDetail = () => {
  const navigate = useNavigate();
  const [menuName, setMenuName] = useState("product");

  const [error, setError] = useState(false);

  const [fishingsDetail, setFishingsDetail] = useState(null);
  // const { fishingNo } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); //url에서 fishingNo뽑기
  const fishingNo = queryParams.get("fishingNo");

  useEffect(() => {
    axios
      .get("http://localhost/fishing/detail", {
        params: {
          fishingNo,
        },
      })
      .then((response) => {
        console.log("응답:", response.data);
        setFishingsDetail(response.data);
      })
      .catch((error) => {
        setError(true);
      });
  }, [fishingNo]);

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
                <DetailTitle>{fishingsDetail?.fishingName}</DetailTitle>
              </DetailTitleBlock>
              <DetailAddressBlock>
                <DetailAddress>{fishingsDetail?.address}</DetailAddress>
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
          <FishingProduct fishingsDetail={fishingsDetail} />
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
