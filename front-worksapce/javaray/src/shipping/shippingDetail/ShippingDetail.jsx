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
import { useParams } from "react-router-dom";
import axios from "axios";
import Weather from "./Weather/Wrather";
import { AuthContext } from "../../UseContext/Auth/AuthContext";

const ShippingDetail = () => {
  const [flag, isFlag] = useState(false);
  const [attention, setAttention] = useState(false);
  const { shippingNo } = useParams();
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fishNo, setFishNo] = useState("");
  const [isAuth, setIsAuth] = useState(undefined);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost/shippings/detail?shippingNo=${shippingNo}`)
      .then((response) => {
        console.log(response);
        setShipping(response.data);
        setLoading(false);
      });
    setIsAuth(auth.isAuthenticated);
    if (isAuth) {
      axios
        .get(`http://localhost/shippings/attention?shippingNo=${shippingNo}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth]);

  const changeAttention = () => {
    setIsAuth(auth.isAuthenticated);
    if (isAuth) {
      if (attention) {
        setAttention(false);
        axios
          .delete(
            `http://localhost/shippings/attention?shippingNo=${shippingNo}`,
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          )
          .then((response) => console.log(response))
          .catch((error) => {
            console.log(error);
            setAttention(true);
          });
      } else {
        setAttention(true);
        console.log(auth.accessToken);
        axios
          .post(
            `http://localhost/shippings/attention?shippingNo=${shippingNo}`,
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
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

  if (loading) {
    return <Load />;
  }

  return (
    <>
      <DetailWarp>
        <DetailHeader>
          <h1>{shipping.shipping.shippingTitle}</h1>
        </DetailHeader>
        <DetailBody>
          <DetailBase>
            <ImageCover>
              <ImageBox src="" alt="여러장 넣어야하는디" />
            </ImageCover>
            <BaseCover>
              <BaseBar>
                <LocationDiv>
                  <ContentLabel></ContentLabel>
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
                  <BookBtn>에약하기</BookBtn>
                </BookBtnCover>
                <AttentionInfo onClick={changeAttention}>
                  {attention ? "❤" : "🤍"}
                  <label>+{shipping.shipping.attention}</label>
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
          <WeatherCover>
            <Weather weather={shipping.weather} />
          </WeatherCover>
          <ShippingContent id="contentSection">
            {shipping.shipping.shippingContent}
          </ShippingContent>
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
