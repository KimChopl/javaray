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
import options from "./options.json";
import {
  Checkbox,
  ComplateBtn,
  ContentDiv,
  ContentText,
  DeleteFishs,
  DeleteImage,
  FishP,
  FishsDiv,
  FishsExDiv,
  ImageBigDiv,
  ImageCover,
  Images,
  InputImg,
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
import OptionCheckbox from "./UpdateFormComponent/OptionCheckbox";

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
  const [option, setOption] = useState([
    {
      name: "구명조끼",
      image: lifevest,
      option: "lifevest",
      no: "1",
      isSelect: false,
    },
    {
      name: "에어컨",
      image: aircon,
      option: "aircon",
      no: "2",
      isSelect: false,
    },
    {
      name: "미끼",
      image: bait,
      option: "bait",
      no: "3",
      isSelect: false,
    },
    {
      name: "CCTV",
      image: cctv,
      option: "bait",
      no: "4",
      isSelect: false,
    },
    {
      name: "낚시대",
      image: fishingrod,
      option: "fishingrod",
      no: "5",
      isSelect: false,
    },
    {
      name: "식사제공",
      image: food,
      option: "food",
      no: "6",
      isSelect: false,
    },
    {
      name: "난방",
      image: hiter,
      option: "hiter",
      no: "7",
      isSelect: false,
    },
    {
      name: "구명밧줄",
      image: liferope,
      option: "liferope",
      no: "8",
      isSelect: false,
    },
    {
      name: "온라인 명부",
      image: mobile,
      option: "moblie",
      no: "9",
      isSelect: false,
    },
    {
      name: "화장실",
      image: restroom,
      option: "restroom",
      no: "10",
      isSelect: false,
    },
  ]);
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
    const formData = new FormData();
    formData.append("shippingNo", shippingNo);
    formData.append("shippingContent", content);
    formData.append("shippingTitle", title);
    formData.append("allowPepleNo", peple);
    formData.append("price", price);
    //formData.append("fishs", JSON.stringify(fish));
    const imageArr = image.map((img) => {
      return {
        imageNo: img.imageNo,
        imagePath: img.imagepath,
        imageChangeName: img.imageChangeName,
        imageLeval: img.imageLevel,
        toString: function () {
          return `imageNo:${img.imageNo}, imagePath:${img.imagePath}, imageChangeName:${img.imageChangeName}, imageLevel:${img.imageLevel}`;
        },
      };
    });
    formData.append("image", imageArr);

    const arr = fish.map((e) => {
      return {
        fishNo: e.fishNo,
        fishName: e.fishName,
        toString: function () {
          return `fishNo:${e.fishNo}, fishName:${e.fishName}`;
        },
      };
    });
    formData.append("fish", arr);

    const serviceArr = service.map((e) => {
      return {
        serviceNo: e.serviceName,
        serviceName: e.serviceName,
        toString: function () {
          return `serviceNo:${e.serviceNo}, serviceName:${e.serviceName}`;
        },
      };
    });
    formData.append("option", serviceArr);

    const portObj = `portNo:${address.portNo}, address:${address.address}, detailAddress:${address.detailAddress}`;

    formData.append("portObj", portObj);

    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) formData.append("files", files[i]);
    }
    console.log(files);
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
    console.log(fileList);
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
