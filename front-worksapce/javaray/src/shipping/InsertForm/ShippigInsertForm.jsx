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
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShippingNewImage } from "../Update/UpdateFormComponent/ShippingImage";
import optionss from "../Update/options.json";

const ShippingInsertForm = () => {
  const [searchAddress, setSearchAddress] = useState(false);
  const [searchFish, setSearchFish] = useState(false);
  const [option, setOption] = useState(optionss);
  const [imageUrl, setImageUrl] = useState([]);
  const [shipping, setShipping] = useState({
    shippingTitle: "",
    shippingContent: "",
    allowPeopleNo: "",
    price: "",
    fishs: [],
    options: [],
    port: {},
  });
  const [files, setFiles] = useState([]);
  const { auth } = useContext(AuthContext);
  const inputFileRef = useRef(null);
  const navi = useNavigate();

  const valueChange = (e) => {
    const { value, name } = e.target;
    setShipping({
      ...shipping,
      [name]: value,
    });
  };

  const objectChange = (obj, name) => {
    setShipping({
      ...shipping,
      [name]: obj,
    });
  };

  const isFish = (e) => {
    setSearchFish(e);
  };
  const isAddress = (e) => {
    setSearchAddress(e);
  };
  const uploadImg = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
    const url = fileList.map((image) => URL.createObjectURL(image));
    setImageUrl([...imageUrl, ...url]);
  };
  const deleteFish = (e) => {
    const newFish = shipping.fishs.filter((fish) => {
      return fish !== e;
    });
    objectChange([...newFish], "fishs");
  };
  const clickService = (e) => {
    const i = e.target.value;
    if (option[i].isSelect) {
      option[i].isSelect = false;
      const index = shipping.options.findIndex(
        (service) => service.serviceNo === option[i].no
      );
      if (index !== -1) {
        shipping.options.splice(index, 1);
      }
    } else {
      option[i].isSelect = true;
      shipping.options.push({
        serviceNo: option[i].no,
        serviceName: option[i].name,
      });
    }
    objectChange([...shipping.options], "options");
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
  const imgDivClick = () => {
    inputFileRef.current.click();
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
    return (add) => Object.keys(add).length === 1;
  };

  const insert = () => {
    const resultArr = [
      ...checkedLength([shipping.options, shipping.fishs]),
      ...checkedVacuum([shipping.shippingTitle, shipping.shippingContent]),
      ...checkedNegative([shipping.allowPeopleNo, shipping.price]),
      chekedAddress(shipping.port),
    ];
    if (resultArr.includes(true)) {
      alert("모든 내용을 채워주세요.");
      return;
    }
    const formData = new FormData();

    formData.append("shipping", JSON.stringify(shipping));
    if (files.length !== 0) {
      files.map((file) => formData.append("files", file));
    }
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
        console.log(error);
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
          <TitleInput
            value={shipping.shippingTitle}
            onChange={valueChange}
            name="shippingTitle"
          ></TitleInput>
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
          <PriceInput
            type="number"
            value={shipping.price}
            onChange={valueChange}
            name="price"
          />
        </PriceDiv>
        <FishsDiv>
          {shipping.fishs.length !== 0 &&
            shipping.fishs.map((fish) => (
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
              <LocationP>{shipping.port.address}</LocationP>
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
                value={shipping.allowPeopleNo}
                onChange={valueChange}
                name="allowPeopleNo"
              />
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
          <ContentText
            value={shipping.shippingContent}
            onChange={valueChange}
            name="shippingContent"
          ></ContentText>
        </ContentDiv>
        <ComplateBtn>
          <SearchBtn onClick={insert}>작성하기</SearchBtn>
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

export default ShippingInsertForm;
