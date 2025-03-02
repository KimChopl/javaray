import {
  DetailBody,
  DetailHeader,
  DetailWarp,
  WeatherCover,
  ShippingContent,
  ReviewCover,
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
import { SimpleExplain } from "./DetailComponent/SimpleExplain/SimpleExplain";
import { ShippingImages } from "./DetailComponent/Images/ShippingImages";

const ShippingDetail = () => {
  const [attention, setAttention] = useState(false);
  const [shipping, setShipping] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [weather, setWeather] = useState({});
  const [fishNo, setFishNo] = useState("");
  const [option, setOption] = useState([]);
  const [flag, isFlag] = useState(false);
  const { auth } = useContext(AuthContext);
  const { shippingNo } = useParams();
  const navi = useNavigate();
  const scrollUp = () => {
    window.scroll({ top: 0 });
  };

  useEffect(() => {
    axios
      .get(`http://localhost/shippings/detail?shippingNo=${shippingNo}`)
      .then((response) => {
        setShipping(response.data.shipping);
        setWeather(response.data.weather);
        setOption(options);
        setIsLoad(false);
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
          .catch(() => 
            setAttention(false)
          );
      }).catch(() => {
        alert('시스템 오류 다시 시도해주세요.');
        navi('/shipping');
      });
    

    scrollUp();
  }, [auth]);

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
          <ShippingImages images={shipping.images} />
          <SimpleExplain
            info={{
              shipping,
              move,
              auth,
              setShipping,
              attention,
              setAttention,
              setFishNo,
              isFlag,
            }}
          />
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
