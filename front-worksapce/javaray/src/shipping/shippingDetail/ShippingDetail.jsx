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
  BookBtn,
  OtherInfo,
  BookBtnCover,
  AttentionInfo,
  RatingInfo,
  Load,
} from "./ShippingDetailCss";
import Modal from "../../Modal/Modal";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Weather from "./Weather/Wrather";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import { ShowService } from "../Update/UpdateFormComponent/OptionCheckbox";
import options from "../Update/options.json";
import DetailFish from "./DetailComponent/Fish/DetailFish";

const ShippingDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attention, setAttention] = useState(false);
  const [shipping, setShipping] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [weather, setWeather] = useState({});
  const [fishNo, setFishNo] = useState("");
  const [option, setOption] = useState([]);
  const [flag, isFlag] = useState(false);
  const { shippingNo } = useParams();
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const scrollUp = () => {
    window.scroll({ top: 0 });
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shipping.images.length);
  };
  useEffect(() => {
    axios
      .get(`http://localhost/shippings/detail?shippingNo=${shippingNo}`)
      .then((response) => {
        setShipping(response.data.shipping);
        setWeather(response.data.weather);
        console.log(response.data.weather);
        setOption(options);
        setIsLoad(false);
      });
    axios
      .get(`http://localhost/shippings/attention?shippingNo=${shippingNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        if (response.data === 1) {
          setAttention(true);
        } else {
          setAttention(false);
        }
      })
      .catch((e) => console.log(e));

    scrollUp();
  }, [auth]);

  const changeAttention = () => {
    if (auth.isAuthenticated) {
      if (attention) {
        axios
          .delete(
            `http://localhost/shippings/attention?shippingNo=${shippingNo}`,
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          )
          .then(() => {
            setShipping({
              ...shipping,
              attention: shipping.attention - 1,
            });
            setAttention(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(
            `http://localhost/shippings/attention?shippingNo=${shippingNo}`,
            null,
            { headers: { Authorization: `Bearer ${auth.accessToken}` } }
          )
          .then(() => {
            setShipping({
              ...shipping,
              attention: shipping.attention + 1,
            });
            setAttention(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("로그인 후 이용 가능합니다.");
    }
  };
  const clickModal = (e, fishNo) => {
    if (fishNo) {
      setFishNo(fishNo);
    }
    isFlag(e);
  };
  const closeModal = (e) => {
    isFlag(e);
  };

  const move = (e) => {
    document.getElementById(e).scrollIntoView({ behavior: "smooth" });
  };

  const settingOption = option.filter((options) =>
    shipping.options.some((services) => options.no === services.serviceNo)
  );
  if (isLoad) {
    return <Load />;
  }

  return (
    <>
      <DetailWarp>
        <DetailHeader>
          <h1>{shipping.shippingTitle}</h1>
        </DetailHeader>
        <DetailBody>
          <DetailBase>
            <ImageCover onClick={nextImage}>
              {shipping.images.length > 0 ? (
                <ImageBox
                  src={`http://${shipping.images[currentIndex].imagePath}${shipping.images[currentIndex].imageChangeName}`}
                  alt="여러장 넣어야하는디"
                />
              ) : (
                <></>
              )}
            </ImageCover>
            <BaseCover>
              <BaseBar>
                <LocationDiv>
                  <ContentLabel>{shipping.port.address}</ContentLabel>
                </LocationDiv>
              </BaseBar>
              <BaseBar>
                <PriceDiv>
                  <ContentLabel>인당 가격 : {shipping.price}원</ContentLabel>
                </PriceDiv>
                <AllowNumberDiv>
                  <ContentLabel>
                    최대 탑승 인원 : {shipping.allowPepleNo}명
                  </ContentLabel>
                </AllowNumberDiv>
              </BaseBar>
              <BaseBar>
                <DetailFish clickModal={clickModal} fishs={shipping.fishs} />
              </BaseBar>
              <BaseBar>
                <BookBtnCover>
                  {shipping.member.nickname === auth.nickname ? (
                    <BookBtn
                      onClick={() =>
                        navi(`/shipping/update/${shipping.shippingNo}`)
                      }
                    >
                      수정하기
                    </BookBtn>
                  ) : (
                    <BookBtn>에약하기</BookBtn>
                  )}
                </BookBtnCover>
                <AttentionInfo onClick={changeAttention}>
                  {attention ? "❤" : "🤍"}
                  <label>+{shipping.attention}</label>
                </AttentionInfo>
              </BaseBar>
              <BaseBar>
                <OtherInfo onClick={() => move("contentSection")}>
                  상세내용
                </OtherInfo>
                <OtherInfo onClick={() => move("reviewSection")}>
                  리뷰
                </OtherInfo>
                <RatingInfo>⭐ : {shipping.avgRating}</RatingInfo>
              </BaseBar>
            </BaseCover>
          </DetailBase>
          <WeatherCover>
            <ShowService option={settingOption} />
            {weather.length !== 0 ? (
              <Weather weather={weather} />
            ) : (
              <div>날씨 정보가 준비 중이에요</div>
            )}
          </WeatherCover>
          <ShippingContent
            id="contentSection"
            dangerouslySetInnerHTML={{
              __html: shipping.shippingContent,
            }}
          ></ShippingContent>
          <ReviewCover id="reviewSection">리뷰들</ReviewCover>
        </DetailBody>
      </DetailWarp>
      {flag && (
        <Modal kind={"fishExplain"} clickModal={closeModal} fishNo={fishNo} />
      )}
    </>
  );
};

export default ShippingDetail;
