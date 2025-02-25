import { useContext, useEffect, useRef, useState } from "react";
import { DetailWarp, Load } from "../shippingDetail/ShippingDetailCss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import {
  ComplateBtn,
  ContentDiv,
  ContentText,
  FishsDiv,
  ImageBigDiv,
  InputImg,
  LocationAndPeple,
  LocationDiv,
  LocationP,
  LocationPepleDiv,
  OptionDiv,
  OptionLine,
  PepleDiv,
  PepleInput,
  PriceDiv,
  PriceInput,
  PriceP,
  SearchBtn,
  SearchFishDiv,
  TitleDiv,
  TitleInput,
  UploadImg,
} from "./ShippingUpdateCss";
import Modal from "../../Modal/Modal";
import ShippingFish from "./UpdateFormComponent/Fish";
import {
  ShippingBeforeImage,
  ShippingNewImage,
} from "./UpdateFormComponent/ShippingImage";
import { OptionCheckbox } from "./UpdateFormComponent/OptionCheckbox";
import options from "./options.json";

const ShippingUpdate = () => {
  const [searchAddress, setSearchAddress] = useState(false);
  const [searchFish, setSearchFish] = useState(false);
  const [option, setOption] = useState(options);
  const [shipping, setShipping] = useState({});
  const [imageUrl, setImageUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [load, setLoad] = useState(true);
  const { auth } = useContext(AuthContext);
  const { shippingNo } = useParams();
  const inputFileRef = useRef(null);
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

  const isAddress = (e) => {
    setSearchAddress(e);
  };

  const isFish = (e) => {
    setSearchFish(e);
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
      ...checkedNegative([shipping.allowPepleNo, shipping.price]),
      chekedAddress(shipping.port),
    ];
    return resultArr;
  };

  const update = () => {
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

  const uploadImg = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
    const url = fileList.map((image) => URL.createObjectURL(image));
    setImageUrl([...imageUrl, ...url]);
  };

  const imgDivClick = () => {
    inputFileRef.current.click();
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
        <ImageBigDiv>
          {shipping.images && (
            <ShippingBeforeImage
              image={shipping.images}
              setImage={objectChange}
            />
          )}
          <ShippingNewImage
            setFiles={setFiles}
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
          />
          <UploadImg onClick={imgDivClick} />
          <InputImg
            type="file"
            multiple
            onChange={uploadImg}
            ref={inputFileRef}
          />
        </ImageBigDiv>
        <PriceDiv>
          <PriceP>인당 탑승 인원</PriceP>
          <PriceInput
            type="number"
            value={shipping.price}
            onChange={valueChange}
          />
        </PriceDiv>
        <FishsDiv>
          {shipping.fishs &&
            shipping.fishs.map((fishs) => {
              return (
                <ShippingFish
                  setFish={objectChange}
                  fishs={fishs}
                  fish={shipping.fishs}
                />
              );
            })}
          <SearchFishDiv>
            <SearchBtn onClick={() => isFish(true)}>검색하기</SearchBtn>
          </SearchFishDiv>
        </FishsDiv>
        <LocationAndPeple>
          <LocationPepleDiv>
            <LocationDiv>
              {shipping.port && <LocationP>{shipping.port.address}</LocationP>}
            </LocationDiv>
            <SearchFishDiv>
              <SearchBtn onClick={() => isAddress(true)}>검색하기</SearchBtn>
            </SearchFishDiv>
          </LocationPepleDiv>
          <LocationPepleDiv>
            <LocationDiv>
              <LocationP>예약 가능 인원</LocationP>
            </LocationDiv>
            <PepleDiv>
              <PepleInput
                type="number"
                value={shipping.allowPepleNo}
                name="peple"
                onChange={valueChange}
              />
            </PepleDiv>
          </LocationPepleDiv>
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
      {searchFish && (
        <Modal
          clickModal={isFish}
          kind={"searchFish"}
          selectedFish={shipping.fishs}
          setFish={objectChange}
        />
      )}
      {searchAddress && (
        <Modal
          clickModal={isAddress}
          setAddress={objectChange}
          kind={"searchAddress"}
          port={shipping.port}
        />
      )}
    </>
  );
};

export default ShippingUpdate;
