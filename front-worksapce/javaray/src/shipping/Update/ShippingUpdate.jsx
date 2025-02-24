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
  const [load, setLoad] = useState(true);
  const { shippingNo } = useParams();
  const { auth } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [peple, setPeple] = useState("");
  const [address, setAddress] = useState({});
  const [image, setImage] = useState([]);
  const [service, setService] = useState([]);
  const [fish, setFish] = useState([]);
  const [price, setPrice] = useState(0);
  const [searchFish, setSearchFish] = useState(false);
  const [searchAddress, setSearchAddress] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const navi = useNavigate();
  const inputFileRef = useRef(null);
  const [option, setOption] = useState(options);
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const pepleChange = (e) => {
    setPeple(e.target.value);
  };
  const contentChange = (e) => {
    setContent(e.target.value);
  };
  const isLoad = (e) => {
    setLoad(e);
  };

  const selectFish = (e) => {
    setFish(e);
  };

  const isSelcted = (e) => {
    option.forEach((option) => {
      const findOption = e.find((service) => service.serviceNo === option.no);
      if (findOption) {
        option.isSelect = true;
      }
    });
    setService(e);
    return option;
  };

  const isAddress = (e) => {
    setSearchAddress(e);
  };

  const isFish = (e) => {
    setSearchFish(e);
  };


  const update = () => {
    if (
      shippingNo.trim() === "" ||
      content.trim() === "" ||
      title.trim() === "" ||
      peple < 1 ||
      price < 1 ||
      fish.length < 1 ||
      service.length < 1
    ) {
      alert("모든 내용을 채워 주세요.");
      return;
    }
    const formData = new FormData();
    const shipping = {
      shippingNo: shippingNo,
      shippingTitle: title,
      shippingContent: content,
      allowPepleNo: peple,
      price: price,
      images: image,
      options: service,
      fishs: fish,
      port: address,
    };
    formData.append("shipping", JSON.stringify(shipping));

    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) formData.append("files", files[i]);
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
        navi(-1);
      })
      .catch((e) => console.log(e));
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

  const priceChange = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    const accessToken = auth.accessToken;
    if (false !== auth.isAhenticated || auth.nickname === shippingNo) {
      axios
        .get(`http://localhost/shippings/update?shippingNo=${shippingNo}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          const data = response.data;
          setContent(data.shippingContent);
          setTitle(data.shippingTitle);
          setImage(data.images);
          setPeple(data.allowPepleNo);
          setAddress(data.port);
          setFish(data.fishs);
          setPrice(data.price);
          setOption(isSelcted(data.options));
          isLoad(false);
        })
        .catch((error) => {
          console.log(error);
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
          <TitleInput value={title} onChange={titleChange}></TitleInput>
        </TitleDiv>
        <ImageBigDiv>
          <ShippingBeforeImage image={image} setImage={setImage} />
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
          <PriceInput type="number" value={price} onChange={priceChange} />
        </PriceDiv>
        <FishsDiv>
          {fish.map((fishs) => (
            <ShippingFish setFish={setFish} fishs={fishs} fish={fish} />
          ))}
          <SearchFishDiv>
            <SearchBtn onClick={() => isFish(true)}>검색하기</SearchBtn>
          </SearchFishDiv>
        </FishsDiv>
        <LocationAndPeple>
          <LocationPepleDiv>
            <LocationDiv>
              <LocationP>{address.address}</LocationP>
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
              <PepleInput type="number" value={peple} onChange={pepleChange} />
            </PepleDiv>
          </LocationPepleDiv>
        </LocationAndPeple>
        <OptionDiv>
          <OptionLine>
            {option.map((options, index) => (
              <OptionCheckbox
                options={options}
                option={option}
                index={index}
                setOption={setOption}
                service={service}
                setService={setService}
              />
            ))}
          </OptionLine>
        </OptionDiv>
        <ContentDiv>
          <ContentText value={content} onChange={contentChange}></ContentText>
        </ContentDiv>
        <ComplateBtn>
          <SearchBtn onClick={update}>수정하기</SearchBtn>
        </ComplateBtn>
      </DetailWarp>
      {searchFish && (
        <Modal
          clickModal={isFish}
          kind={"searchFish"}
          selectedFish={fish}
          setFish={selectFish}
        />
      )}
      {searchAddress && (
        <Modal
          clickModal={isAddress}
          setAddress={setAddress}
          kind={"searchAddress"}
          port={address}
        />
      )}
    </>
  );
};

export default ShippingUpdate;
