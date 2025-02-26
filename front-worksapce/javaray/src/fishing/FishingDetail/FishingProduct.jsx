import FishingDetail from "./FishingDetail";
import FishingMap from "./KakaoMap/KakaoMap";
import {
  DownWrap,
  AddressDiv,
  DownAddressH2,
  MessageDiv,
  MessageDiv1,
  MessageDiv2,
  MessageTitle,
  MessageText,
  AmenitiesImgDiv,
  AmenitiesImg,
  AmenitiesText,
  AmenitiesDiv,
  MapDiv,
} from "./FishingProduct.styled";
import { useNavigate } from "react-router-dom";
import airconditioner from "../FishingImg/airconditioner.png";
import bathroom from "../FishingImg/bathroom.png";
import beachumbrella from "../FishingImg/beachumbrella.png";
import bedding from "../FishingImg/bedding.png";
import burner from "../FishingImg/burner.png";
import carpark from "../FishingImg/carpark.png";
import fan from "../FishingImg/fan.png";
import sofa from "../FishingImg/sofa.png";
import tv from "../FishingImg/tv.png";
import vest from "../FishingImg/vest.png";

import fish1 from "../FishingImg/fish1.png";
import fish2 from "../FishingImg/fish2.png";
import fish3 from "../FishingImg/fish3.png";
import fish4 from "../FishingImg/fish4.png";
import fish5 from "../FishingImg/fish5.png";
import fish6 from "../FishingImg/fish6.png";
import fish7 from "../FishingImg/fish7.png";
import fish8 from "../FishingImg/fish8.png";
import fish9 from "../FishingImg/fish9.png";
import fish10 from "../FishingImg/fish10.png";
import fish11 from "../FishingImg/fish11.png";
import fish12 from "../FishingImg/fish12.png";

const amenitiesImages = {
  에어컨: airconditioner,
  화장실: bathroom,
  그늘막: beachumbrella,
  침구: bedding,
  버너: burner,
  주차장: carpark,
  선풍기: fan,
  소파: sofa,
  텔레비전: tv,
  구명조끼: vest,
};

const fishImages = {
  붕어: fish1,
  향어: fish2,
  잉어: fish3,
  메기: fish4,
  비단잉어: fish5,
  "광어(민물)": fish6,
  가물치: fish7,
  민어: fish8,
  "돌돔(민물)": fish9,
  빙어: fish10,
  송어: fish11,
  민물기타: fish12,
};

const FishingProduct = ({ fishingsDetail }) => {
  return (
    <>
      <DownWrap>
        <AddressDiv>
          <DownAddressH2>{fishingsDetail.address}</DownAddressH2>
        </AddressDiv>
        <MapDiv>
          <FishingMap lat={fishingsDetail.lat} lng={fishingsDetail.lng} />
        </MapDiv>
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
            {fishingsDetail.fishList?.map((fishes, index) => {
              const fishImage = fishImages[fishes.fishName];

              return (
                <AmenitiesDiv key={fishes.fishNo ?? index}>
                  <AmenitiesText>{fishes.fishName}</AmenitiesText>
                  <AmenitiesImgDiv>
                    {fishImage && (
                      <AmenitiesImg
                        src={fishImage}
                        alt={fishes.amenitiesName}
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </AmenitiesImgDiv>
                </AmenitiesDiv>
              );
            })}
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
