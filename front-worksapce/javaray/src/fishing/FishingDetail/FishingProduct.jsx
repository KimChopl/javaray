import FishingDetail from "./FishingDetail";
import {
  DownWrap,
  AddressDiv,
  DownAddressH2,
  MessageDiv,
  MessageDiv1,
  MessageDiv2,
  MessageTitle,
  MessageText,
} from "./FishingProduct.styled";
import { useNavigate } from "react-router-dom";
import {
  AmenitiesImgDiv,
  AmenitiesImg,
  AmenitiesText,
  AmenitiesDiv,
} from "../FishingInsert/FishingInsert.styled";

const amenitiesImages = {
  에어컨: "../FishingImg/airconditioner.png",
  화장실: "../FishingImg/bathroom.png",
  그늘막: "../FishingImg/beachumbrella.png",
  침구: "../FishingImg/bedding.png",
  버너: "../FishingImg/burner.png",
  주차장: "../FishingImg/carpark.png",
  선풍기: "../FishingImg/fan.png",
  소파: "../FishingImg/sofa.png",
  텔레비전: "../FishingImg/tv.png",
  구명조끼: "../FishingImg/vest.png",
};

const FishingProduct = ({ fishingsDetail }) => {
  return (
    <>
      <DownWrap>
        <AddressDiv>
          <DownAddressH2>{fishingsDetail.address}</DownAddressH2>
        </AddressDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>사장님 한마디</MessageTitle>
          </MessageDiv1>
          <MessageDiv2>
            <MessageText>{fishingsDetail.introduce}</MessageText>
          </MessageDiv2>
        </MessageDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>운영 시간</MessageTitle>
          </MessageDiv1>
          <MessageDiv2>
            <MessageText>
              영업 시작 시간 : {fishingsDetail.startTime}
            </MessageText>
            <MessageText>영업 종료 시간 : {fishingsDetail.endTime}</MessageText>
          </MessageDiv2>
        </MessageDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>주요 어종</MessageTitle>
          </MessageDiv1>
          <MessageDiv2>
            {fishingsDetail.fishList?.map((fish, index) => (
              <MessageText key={index}>{fish.fishName}</MessageText>
            ))}
          </MessageDiv2>
        </MessageDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>편의시설</MessageTitle>
          </MessageDiv1>
          <MessageDiv2>
            {fishingsDetail.amenitiesList?.map((amenities, index) => {
              const amenitiesImage = amenitiesImages[amenities.amenitiesName];

              return (
                <AmenitiesDiv key={amenities.amenitiesNo ?? index}>
                  <AmenitiesText>{amenities.amenitiesName}</AmenitiesText>
                  <AmenitiesImgDiv>
                    {amenitiesImage && (
                      <AmenitiesImg
                        src={amenitiesImage}
                        alt={amenities.amenitiesName}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </AmenitiesImgDiv>
                </AmenitiesDiv>
              );
            })}
          </MessageDiv2>
        </MessageDiv>
      </DownWrap>
    </>
  );
};

export default FishingProduct;
