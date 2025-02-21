import { useContext, useState, useRef, useEffect } from "react";
import Modal from "../../Modal/Modal";
import { DetailWarp } from "../shippingDetail/ShippingDetailCss";
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
} from "../Update/ShippingUpdateCss";
import lifevest from "../Update/images/lifevest.jpg";
import aircon from "../Update/images/aircon.png";
import bait from "../Update/images/bait.png";
import cctv from "../Update/images/cctv.png";
import fishingrod from "../Update/images/fishingrod.jpg";
import food from "../Update/images/food.png";
import hiter from "../Update/images/hiter.jpg";
import liferope from "../Update/images/liferope.jpg";
import mobile from "../Update/images/mobile.jpg";
import restroom from "../Update/images/restroom.jpeg";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShippingNewImage } from "../Update/UpdateFormComponent/ShippingImage";

const ShippingInsertForm = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [peple, setPeple] = useState("");
  const [options, setOptions] = useState([]);
  const [fish, setFish] = useState([]);
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState({});
  const [imageUrl, setImageUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [searchFish, setSearchFish] = useState(false);
  const [searchAddress, setSearchAddress] = useState(false);
  const { auth } = useContext(AuthContext);
  const inputFileRef = useRef(null);
  const navi = useNavigate();
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
  const isFish = (e) => {
    setSearchFish(e);
  };
  const isAddress = (e) => {
    setSearchAddress(e);
  };
  const pepleChange = (e) => {
    setPeple(e.target.value);
  };
  const contentChange = (e) => {
    setContent(e.target.value);
  };
  const uploadImg = (e) => {
    const fileList = Array.from(e.target.files);
    console.log(fileList);
    setFiles(fileList);
    const url = fileList.map((image) => URL.createObjectURL(image));
    setImageUrl([...imageUrl, ...url]);
  };
  const deleteFish = (e) => {
    const newFish = fish.filter((fish) => {
      return fish != e;
    });
    setFish(newFish);
  };
  const selectFish = (e) => {
    setFish(e);
  };
  const clickService = (e) => {
    const i = e.target.value;
    console.log(i);
    if (option[i].isSelect) {
      option[i].isSelect = false;
      const index = options.findIndex(
        (service) => service.serviceNo === option[i].no
      );
      if (index !== -1) {
        options.splice(index, 1);
      }
    } else {
      option[i].isSelect = true;
      options.push({ serviceNo: option[i].no, serviceName: option[i].name });
    }
    setOptions(options);
  };

  const handlCheckbox = (id) => {
    console.log(parseInt(id.target.value) + 1);
    clickService(id);
    setOption((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...option, isSelcted: !option.isSelcted }
          : checkbox
      )
    );
  };
  const imgDivClick = () => {
    inputFileRef.current.click();
  };

  const priceChange = (e) => {
    setPrice(e.target.value);
  };

  const insert = () => {
    const formData = new FormData();
    formData.append("ShippingTitle", title);
    formData.append("ShippingContent", content);
    formData.append("price", price);
    formData.append("allowPepleNo", peple);
    if (files.length !== 0) {
      files.map((file) => formData.append("files", file));
    }
    const optionArr = options.map((e) => {
      return {
        serviceNo: e.serviceName,
        serviceName: e.serviceName,
        toString: function () {
          return `serviceNo:${e.serviceNo}, serviceName:${e.serviceName}`;
        },
      };
    });
    formData.append("option", optionArr);

    const portObj = `portNo:${address.portNo}, address:${address.address}, detailAddress:${address.detailAddress}`;

    formData.append("portObj", portObj);

    const fishArr = fish.map((e) => {
      return {
        fishNo: e.fishNo,
        fishName: e.fishName,
        toString: function () {
          return `fishNo:${e.fishNo}, fishName:${e.fishName}`;
        },
      };
    });

    formData.append("fish", fishArr);

    axios
      .post(`http://localhost/shippings`, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("등록 완료 되었습니다.");
        navi("/shipping");
      })
      .catch((error) => {
        alert(error.data);
      });
  };

  useEffect(() => {
    if (false === auth.isAuthenticated) {
      alert("로그인 후 이용할 수 있는 서비스 입니다.");
      navi(-1);
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <DetailWarp>
        <h1>작성하기</h1>
        <TitleDiv>
          <TitleInput value={title} onChange={titleChange}></TitleInput>
        </TitleDiv>
        <ImageBigDiv>
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
          <PriceP>인당 탑승 가격</PriceP>
          <PriceInput type="number" value={price} onChange={priceChange} />
        </PriceDiv>
        <FishsDiv>
          {fish.map((fish) => (
            <FishsExDiv key={fish.fishNo}>
              <DeleteFishs onClick={() => deleteFish(fish)}>
                <DeleteImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX///8AAABjY2NmZmZcXFxgYGBYWFiOjo6RkZGVlZVbW1tRUVGKiopVVVWNjY0bGxsVFRVDf2CoAAADS0lEQVR4nO2dC4LbIAxEl3y6ybbb7f1P2yau29iBGNsIo/F7B4gspAEFY/H2BgAAAAAAAAAAAAAAAAAAAAAAAAAAdXj/XsnQ549KhkZcQjhVMXQO4b2KoRHX8IdDBUPHm6FrBUMj7g6GcDY3dOgMXcwNjbiEv3wzNnTqDVVO1Gv4h20UD/8NVY3ig4O2Wjw+Gqro4sBByyieh4aquXgJI6y0eBobqqTF69iuVaIenw1ViWLEQRsXIw5WWRefUtQqUZ9StFKi/ozbLT/dnFOGrGvUz5ThwokaTdE75uV+cmyLRvGQtFKh2E+PbjktJjRYPFMSpF0sFcV0BO0L/TvWI1wjSyawVUkdpU+QHuWP1b+ddrCKBu0fw17lmVhpsQEN2j7Kh1luLMAindJT2AYOWiRqQynaUXpa37RUi1N2zDcu1eKU1E0zy8SQcuPenAZ70lGcV900UarFSY/9nOmhkVLN7uHKDJMZ6xOsVKqbsXaSaHKZGLJuom+sVIuzJgrNLhNDlu+sNLxMDFkaCQca7FmmpkZLtThLouFEgz3zH9dRinbMrUyaLtXizHtkyy1JM+ZM/Q3+o88hX4vuNNiTO/1v/vJlOXmxcbZMDMnRl5tSLc70HOlWgz1TBZyrUi3O6xi51mDPKyfcp2hH2sUvDQdfJWo6us5ILwhxmi7V4qQTNYazFO1ILxrPuFkmhuRr0Z0Ge3Kj6DSCN/K06FKDPTkzqsNZ9JFpFxvesshjKlFdp2jHaxcFHHy9aLhdJoaki+1fWz9aGeRjKK9D+bl0ujZ1vh7K1zTydan8fwv5/4fy//Hl92nk99rk90vl97zl31vIv3uaOnTi/v3h9Dtgh0eFHpF/jy9/FiP3nIzb8zTyZ6Lkz7XJn02UP18qf0ZY/py3/Fl9+e8tli/gTpb+NY0CXGhR/ts1+e8P1/8Vary6kf8OWP5bbvnv8eV7Ksj3xZDvbSLfn0a+x5B8nyib8W5Ii/L92uR77sn3TZTvfSnfv9R+Z2XjvRv5PsLyvaD1+3nr92TX76u/g7sRdnC/xQ7uKNnBPTM7uCtoB/c97eDOror3rh03ieAN+bvzdnD/4Q7usAQAAAAAAAAAAAAAAAAAAAAAAAAA2CG/AbVnHk3h43u0AAAAAElFTkSuQmCC" />
              </DeleteFishs>
              <FishP>{fish.fishName}</FishP>
            </FishsExDiv>
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
            {option.map((option, index) => (
              <>
                <Checkbox
                  id={"ss" + index}
                  value={index}
                  name={option.value}
                  checked={option.isSelect}
                  onChange={handlCheckbox}
                />
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
          <ContentText value={content} onChange={contentChange}></ContentText>
        </ContentDiv>
        <ComplateBtn>
          <SearchBtn onClick={insert}>작성하기</SearchBtn>
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

export default ShippingInsertForm;
