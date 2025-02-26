import { useContext, useEffect, useRef, useState } from "react";
import { DetailWarp, Load } from "../shippingDetail/ShippingDetailCss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import {
  ComplateBtn,
  ContentDiv,
  ContentText,
  LocationAndPeple,
  OptionDiv,
  OptionLine,
  SearchBtn,
  TitleDiv,
  TitleInput,
} from "./ShippingUpdateCss";
import { OptionCheckbox } from "./UpdateFormComponent/OptionCheckbox";
import options from "./options.json";
import UpdateImages from "./UpdateFormComponent/UpdateImages/UpdateImages";
import ShippingPrice from "./UpdateFormComponent/ShippingPrice/ShippingPrice";
import UpdateFish from "./UpdateFormComponent/UpdateFish/UpdateFish";
import UpdatePort from "./UpdateFormComponent/UpdateAddress/UpdatePort";
import UpdatePeople from "./UpdateFormComponent/UpdatePeople/UpdatePeople";

const ShippingUpdate = () => {
  const [option, setOption] = useState(options);
  const [shipping, setShipping] = useState({});
  const [imageUrl, setImageUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [load, setLoad] = useState(true);
  const { auth } = useContext(AuthContext);
  const { shippingNo } = useParams();
  const navi = useNavigate();

  const valueChange = (e) => {
    const { name, value } = e.target;
    setShipping({
      ...shipping,
      [name]: value,
    });
  };

  const isSelected = (service) => {
    options.forEach((option) => {
      const findSelect = service.find(
        (service) => service.serviceNo === option.no
      );
      if (findSelect) {
        option.isSelect = true;
      }
    });
    return options;
  };

  const objectChange = (obj, name) => {
    setShipping({
      ...shipping,
      [name]: obj,
    });
  };

  const isLoad = (e) => {
    setLoad(e);
  };

  const checkedLength = (arr) => {
    return arr.map((arr) => arr.length === 0);
  };
  const checkedVacuum = (arr) => {
    return arr.map((arr) => arr.trim() === "");
  };
  const checkedNegative = (arr) => {
    return arr.map((arr) => arr < 1);
  };
  const chekedAddress = (add) => {
    return (add) => Object.keys(add).length === 0;
  };

  const settingResultArr = () => {
    const resultArr = [
      ...checkedLength([shipping.fishs, shipping.options]),
      ...checkedVacuum([
        shipping.shippingTitle,
        shipping.shippingNo,
        shipping.shippingContent,
      ]),
      ...checkedNegative([shipping.allowPeopleNo, shipping.price]),
      chekedAddress(shipping.port),
    ];
    return resultArr;
  };

  const update = () => {
    console.log(shipping);
    const resultArr = settingResultArr();
    if (resultArr.includes(true)) {
      alert("모든 내용을 채워주세요.");
      return;
    }
    const {
      attention,
      avgRating,
      shippingCreateDate,
      shippingModifyDate,
      member,
      ...newShipping
    } = shipping;
    const formData = new FormData();
    formData.append("shipping", JSON.stringify(newShipping));

    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    axios
      .put(`http://localhost/shippings`, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("수정 성공");
        navi(`/shipping/detail/${shippingNo}`);
      })
      .catch(() => alert("수정에 실패하였습니다."));
  };

  useEffect(() => {
    const accessToken = auth.accessToken;
    if (false !== auth.isAhenticated || auth.nickname === shippingNo) {
      axios
        .get(`http://localhost/shippings/update?shippingNo=${shippingNo}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setShipping(() => response.data);
          setOption(isSelected(response.data.options));
          isLoad(false);
        })
        .catch(() => {
          return <Load>로링 중입니다. 너무 오래 걸리면 새로고침 해주세요</Load>;
        });
    } else {
      alert("작성자만 이용할 수 있는 서비스 입니다.");
      navi(-1);
    }
  }, [auth.isAuthenticated]);

  if (load) {
    return <Load />;
  }
  return (
    <>
      <DetailWarp>
        <h1>수정하기</h1>
        <TitleDiv>
          <TitleInput
            value={shipping.shippingTitle}
            onChange={valueChange}
            name="shippingTitle"
          ></TitleInput>
        </TitleDiv>
        <UpdateImages
          info={{ setFiles, setImageUrl, imageUrl, objectChange }}
          images={shipping.images}
        />
        <ShippingPrice price={shipping.price} valueChange={valueChange} />
        <UpdateFish fishs={shipping.fishs} info={{ objectChange }} />
        <LocationAndPeple>
          <UpdatePort port={shipping.port} objectChange={objectChange} />
          <UpdatePeople
            allowPeopleNo={shipping.allowPeopleNo}
            valueChange={valueChange}
          />
        </LocationAndPeple>
        <OptionDiv>
          <OptionLine>
            <OptionCheckbox
              options={option}
              service={shipping.options}
              setOption={setOption}
              setService={objectChange}
              shipping={shipping}
            />
          </OptionLine>
        </OptionDiv>
        <ContentDiv>
          <ContentText
            value={shipping.shippingContent}
            onChange={valueChange}
            name="shippingContent"
          ></ContentText>
        </ContentDiv>
        <ComplateBtn>
          <SearchBtn onClick={update}>수정하기</SearchBtn>
        </ComplateBtn>
      </DetailWarp>
    </>
  );
};

export default ShippingUpdate;
