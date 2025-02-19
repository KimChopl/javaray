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
  SearchBtn,
  SearchFishDiv,
  TitleDiv,
  TitleInput,
  UploadImg,
} from "./ShippingUpdateCss";
import { CloseImg } from "../../Modal/ModalCss";
import { set } from "date-fns";
import Modal from "../../Modal/Modal";

const ShippingUpdate = () => {
  const [load, setLoad] = useState(true);
  const { shippingNo } = useParams();
  const { auth } = useContext(AuthContext);
  const [shipping, setShipping] = useState({
    shippingNo: null,
    shippingContent: null,
    shippingTitle: null,
    allowPepleNo: null,
    port: null,
    service: null,
    fishs: null,
    price: null,
  });
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
    if (option[i].isSelect) {
      option[i].isSelect = false;
      const index = service.findIndex(
        (service) => service.serviceNo === option[i].no
      );
      if (index !== -1) {
        service.splice(index, 1);
      }
    } else {
      option[i].isSelect = true;
      service.push({ serviceNo: option[i].no, serviceName: option[i].name });
      setOption(option);
    }
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

  const handlCheckbox = (id) => {
    clickService(id);
    setOption((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...option, isSelcted: !option.isSelcted }
          : checkbox
      )
    );
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
      .put(`http://localhost/shippings/update`, formData, {
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

  const deleteImage = (e) => {
    setImage((image) => image.filter((img) => img.imageNo !== e));
  };

  const deleteNewImage = (e) => {
    setFiles((deleteImg) => deleteImg.filter((_, index) => index !== e));
    setImageUrl((prevURLs) => prevURLs.filter((_, index) => index !== e));
  };

  useEffect(() => {
    const accessToken = auth.accessToken;
    if (accessToken) {
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
    }
  }, [auth]);

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
          {image.length > 0 ? (
            image.map((img) => (
              <ImageCover
                key={img.imageNo}
                onClick={() => deleteImage(img.imageNo)}
              >
                <Images
                  src={`http://${img.imagePath}${img.imageChangeName}`}
                  alt={img.imageOriginName}
                />
              </ImageCover>
            ))
          ) : (
            <></>
          )}
          {imageUrl.length > 0 ? (
            imageUrl.map((url, index) => (
              <ImageCover key={index} onClick={() => deleteNewImage(index)}>
                <Images src={url} alt={`preview-${index}`} />
              </ImageCover>
            ))
          ) : (
            <></>
          )}
          <UploadImg onClick={imgDivClick} />
          <InputImg
            type="file"
            multiple
            onChange={uploadImg}
            ref={inputFileRef}
          />
        </ImageBigDiv>
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
