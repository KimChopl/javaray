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
  Load,
} from "./ShippingDetailCss";
import Modal from "../../Modal/Modal";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Weather from "./Weather/Wrather";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import {ShowService} from "../Update/UpdateFormComponent/OptionCheckbox";
import options from "../Update/options.json"

const ShippingDetail = () => {
  const [flag, isFlag] = useState(false);
  const [attention, setAttention] = useState(false);
  const [shipping, setShipping] = useState(null);
  const [fishNo, setFishNo] = useState("");
  const [isAuth, setIsAuth] = useState(undefined);
  const [attCount, setAttCount] = useState(null);
  const [image, setImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { shippingNo } = useParams();
  const { auth } = useContext(AuthContext);
  const [option, setOption] = useState(options);
  const [service, setService] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const navi = useNavigate();
  const scrollUp = () => {
    window.scroll({ top: 0 });
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
  };
  useEffect(() => {
    axios
    .get(`http://localhost/shippings/detail?shippingNo=${shippingNo}`)
    .then((response) => {
      console.log(response);
      setShipping(response.data);
      setAttCount(response.data.shipping.attention);
      setImage(response.data.shipping.images);
      setService(response.data.shipping.options);
      setIsLoad(false)
      
    });
    if(auth.isAuthenticated){
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
          console.log(response);
          setAttention(false);
        }
      })
      .catch((error) => {
        console.log(error)
        setAttention(false);
      });
      scrollUp();
    }
  }, [auth]);

  

  const changeAttention = () => {
    setIsAuth(auth.isAuthenticated);
    if (isAuth) {
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
          .then((response) => {
            setAttCount(attCount - 1);
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
          .then((response) => {
            setAttCount(attCount + 1);
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
  const clickModal = (e) => {
    isFlag(e);
  };
  const closeModal = (e) => {
    isFlag(e);
  };

  const move = (e) => {
    document.getElementById(e).scrollIntoView({ behavior: "smooth" });
  };

  const fishsNo = (e) => {
    setFishNo(e);
  };
  
  const settingOption = option.filter(options => service.some(services => options.no === services.serviceNo))
  if(isLoad){
    return(
      <Load />
    )
  }

  return (
    <>
      <DetailWarp>
        <DetailHeader>
          <h1>{shipping.shipping.shippingTitle}</h1>
        </DetailHeader>
        <DetailBody>
          <DetailBase>
            <ImageCover onClick={nextImage}>
              {image.length > 0 ? (
                <ImageBox
                  src={`http://${image[currentIndex].imagePath}${image[currentIndex].imageChangeName}`}
                  alt="여러장 넣어야하는디"
                />
              ) : (
                <></>
              )}
            </ImageCover>
            <BaseCover>
              <BaseBar>
                <LocationDiv>
                  <ContentLabel>{shipping.shipping.port.address}</ContentLabel>
                </LocationDiv>
              </BaseBar>
              <BaseBar>
                <PriceDiv>
                  <ContentLabel>
                    인당 가격 : {shipping.shipping.price}원
                  </ContentLabel>
                </PriceDiv>
                <AllowNumberDiv>
                  <ContentLabel>
                    최대 탑승 인원 : {shipping.shipping.allowPepleNo}명
                  </ContentLabel>
                </AllowNumberDiv>
              </BaseBar>
              <BaseBar>
                <FishTable>
                  <thead>
                    <tr>
                      <th colSpan={shipping.shipping.fishs.length}>
                        낚시 가능 어종
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {shipping.shipping.fishs.map((fish) => (
                        <Td
                          key={fish.fishNo}
                          onClick={() => {
                            clickModal(true);
                            fishsNo(fish.fishNo);
                          }}
                        >
                          {fish.fishName}
                        </Td>
                      ))}
                    </tr>
                  </tbody>
                </FishTable>
              </BaseBar>
              <BaseBar>
                <BookBtnCover>
                  {shipping.shipping.member.nickname === auth.nickname ? (
                    <BookBtn
                      onClick={() =>
                        navi(`/shipping/update/${shipping.shipping.shippingNo}`)
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
                  <label>+{attCount}</label>
                </AttentionInfo>
              </BaseBar>
              <BaseBar>
                <OtherInfo onClick={() => move("contentSection")}>
                  상세내용
                </OtherInfo>
                <OtherInfo onClick={() => move("reviewSection")}>
                  리뷰
                </OtherInfo>
                <RatingInfo>⭐ : {shipping.shipping.avgRating}</RatingInfo>
              </BaseBar>
            </BaseCover>
          </DetailBase>
          <WeatherCover>
            <ShowService option={settingOption}/>
            <Weather weather={shipping.weather} />
          </WeatherCover>
          <ShippingContent
            id="contentSection"
            dangerouslySetInnerHTML={{
              __html: shipping.shipping.shippingContent,
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
