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

const ShippingDetail = () => {
  const [flag, isFlag] = useState(false);
  const [attention, setAttention] = useState(false);
  const { shippingNo } = useParams();
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fishNo, setFishNo] = useState("");
  const [isAuth, setIsAuth] = useState(undefined);
  const { auth } = useContext(AuthContext);
  const [attCount, setAttCount] = useState(null);
  const navi = useNavigate();
  const scrollUp = () => {
    window.scroll({ top: 0 });
  };
  useEffect(() => {
    axios
      .get(`http://localhost/shippings/detail?shippingNo=${shippingNo}`)
      .then((response) => {
        console.log(response);
        setShipping(response.data);
        setAttCount(response.data.shipping.attention);
        setLoading(false);
      });
    setIsAuth(auth.isAuthenticated);
    axios
      .get(`http://localhost/shippings/attention?shippingNo=${shippingNo}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        if (response.data === 1) {
          console.log("??");
          setAttention(true);
        } else {
          console.log("?");
          setAttention(false);
        }
      })
      .catch((error) => {
        setAttention(false);
      });
    scrollUp();
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
            console.log(response);
            setAttCount(attCount - 1);
            setAttention(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(auth.accessToken);
        axios
          .post(
            `http://localhost/shippings/attention?shippingNo=${shippingNo}`,
            null,
            { headers: { Authorization: `Bearer ${auth.accessToken}` } }
          )
          .then((response) => {
            console.log(response);
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
