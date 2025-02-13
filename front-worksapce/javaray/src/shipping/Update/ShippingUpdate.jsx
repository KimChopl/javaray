import { useContext, useEffect, useRef, useState } from "react";
import { DetailWarp, Load } from "../shippingDetail/ShippingDetailCss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import lifevest from "./images/lifevest.jpg";
import aircon from "./images/aircon.png";
import bait from "./images/bait.png";
import cctv from "./images/cctv.png";
import fishingrod from "./images/fishingrod.jpg";
import food from "./images/food.png";
import hiter from "./images/hiter.jpg";
import liferope from "./images/liferope.jpg";
import mobile from "./images/mobile.jpg";
import restroom from "./images/restroom.jpeg";
import {
  Checkbox,
  ContentDiv,
  ContentText,
  DeleteFishs,
  FishP,
  FishsDiv,
  FishsExDiv,
  ImageBigDiv,
  ImageCover,
  Images,
  Label,
  LocationAndPeple,
  LocationDiv,
  LocationP,
  LocationPepleDiv,
  Option,
  OptionCover,
  OptionDiv,
  OptionExpDiv,
  OptionImage,
  OptionLine,
  OptionP,
  PepleDiv,
  PepleInput,
  SearchBtn,
  SearchFishDiv,
  TitleDiv,
  TitleInput,
} from "./ShippingUpdateCss";

const ShippingUpdate = () => {
  const [load, setLoad] = useState(true);
  const { shippingNo } = useParams();
  const { auth } = useContext(AuthContext);
  const [shipping, setShipping] = useState(null);
  const navi = useNavigate();
  const option = [
    {
      name: "구명조끼",
      image: lifevest,
      option: "lifevest",
    },
    {
      name: "에어컨",
      image: aircon,
      option: "aircon",
    },
    {
      name: "미끼",
      image: bait,
      option: "bait",
    },
    {
      name: "CCTV",
      image: cctv,
      option: "bait",
    },
    {
      name: "낚시대",
      image: fishingrod,
      option: "fishingrod",
    },
    {
      name: "식사제공",
      image: food,
      option: "food",
    },
    {
      name: "난방",
      image: hiter,
      option: "hiter",
    },
    {
      name: "구명밧줄",
      image: liferope,
      option: "liferope",
    },
    {
      name: "온라인 명부",
      image: mobile,
      option: "moblie",
    },
    {
      name: "화장실",
      image: restroom,
      option: "restroom",
    },
  ];
  const checked = useRef(false);
  const isLoad = (e) => {
    setLoad(e);
  };
  const clickCheckbox = () => {
    console.log(checked.current);
  };
  useEffect(() => {
    const accessToken = auth.accessToken;
    if (accessToken) {
      axios
        .get(`http://localhost/shippings/update?shippingNo=${shippingNo}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          console.log(response);
          setShipping(response.data);
          isLoad(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth]);
  if (load) {
    return <Load />;
  }
  return (
    <DetailWarp>
      <h1>수정하기</h1>
      <TitleDiv>
        <TitleInput value={shipping.shippingTitle}></TitleInput>
      </TitleDiv>
      <ImageBigDiv>
        <ImageCover>
          <Images />
        </ImageCover>
      </ImageBigDiv>
      <FishsDiv>
        {shipping.fishs.map((fish) => (
          <FishsExDiv>
            <DeleteFishs />
            <FishP>{fish.fishName}</FishP>
          </FishsExDiv>
        ))}
        <SearchFishDiv>
          <SearchBtn>검색하기</SearchBtn>
        </SearchFishDiv>
      </FishsDiv>
      <LocationAndPeple>
        <LocationPepleDiv>
          <LocationDiv>
            <LocationP>{shipping.port.address}</LocationP>
          </LocationDiv>
          <SearchFishDiv>
            <SearchBtn>검색하기</SearchBtn>
          </SearchFishDiv>
        </LocationPepleDiv>
        <LocationPepleDiv>
          <LocationDiv>
            <LocationP>예약 가능 인원</LocationP>
          </LocationDiv>
          <PepleDiv>
            <PepleInput type="number" value={shipping.allowPepleNo} />
          </PepleDiv>
        </LocationPepleDiv>
      </LocationAndPeple>
      <OptionDiv>
        <OptionLine>
          {option.map((option, index) => (
            <>
              <Checkbox id={"ss" + index} value={index} name={option.value} />
              <Label htmlFor={"ss" + index}>
                <OptionCover>
                  <OptionExpDiv>
                    <OptionP>{option.name}</OptionP>
                  </OptionExpDiv>
                  <Option>
                    <OptionImage src={option.image} />
                  </Option>
                </OptionCover>
              </Label>
            </>
          ))}
        </OptionLine>
      </OptionDiv>
      <ContentDiv>
        <ContentText value={shipping.shippingContent}></ContentText>
      </ContentDiv>
    </DetailWarp>
  );
};

export default ShippingUpdate;
