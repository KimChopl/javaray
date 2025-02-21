import {
  InsertWrap,
  Title,
  Input,
  Label,
  TextArea,
  Button,
  Form,
  FormGroup,
  AmenitiesImg,
  AmenitiesText,
  AmenitiesDiv,
  AmenitiesContainer,
  FishText,
  AmenitiesImgDiv,
  AmenitiesTextDiv,
} from "./FishingInsert.styled";

import airconditioner from "../FishingImg/airconditioner.png";
import bathroom from "../FishingImg/bathroom.png";
import beachumbrella from "../FishingImg/beachumbrella.png";
import bedding from "../FishingImg/bedding.png";
import burner from "../FishingImg/burner.png";
import carpark from "../FishingImg/carpark.png";
import fan from "../FishingImg/fan.png";
import sofa from "../FishingImg/sofa.png";
import tv from "../FishingImg/tv.png";
import vest from "../FishingImg/vest.png";

import fish1 from "../FishingImg/fish1.png";
import fish2 from "../FishingImg/fish2.png";
import fish3 from "../FishingImg/fish3.png";
import fish4 from "../FishingImg/fish4.png";
import fish5 from "../FishingImg/fish5.png";
import fish6 from "../FishingImg/fish6.png";
import fish7 from "../FishingImg/fish7.png";
import fish8 from "../FishingImg/fish8.png";
import fish9 from "../FishingImg/fish9.png";
import fish10 from "../FishingImg/fish10.png";
import fish11 from "../FishingImg/fish11.png";
import fish12 from "../FishingImg/fish12.png";

import { TitleLine, TitleText } from "../FishingList/FishingList.styled";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import axios from "axios";
import { useAsyncError, useNavigate } from "react-router-dom";

const FishingInsert = () => {
  const { auth } = useContext(AuthContext);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFishes, setSelectedFishes] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [accessToken, setAccessToken] = useState(""); //권한이 있는 사람만 들어올 수 있게 하기 위해
  const navi = useNavigate();
  const [userId, setUserId] = useState("");
  const [fishingName, setFishingName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [introduce, setIntroduce] = useState("");

  useEffect(() => {
    if (!!!auth.isAuthenticated) {
      alert("회원만 가능합니다.");
      navi("/");
    } else {
      setUserId(auth.username);
      setAccessToken(auth.accessToken);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !(fishingName || phone || address || startTime || endTime || introduce)
    ) {
      alert("아래 항목 모두  필수 입력사항입니다.");
      return;
    }

    const formData = new FormData();

    formData.append("fishingWriter", auth.nickname);
    formData.append("fishingName", fishingName);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("introduce", introduce);

    selectedAmenities.forEach((amenity) => {
      formData.append("amenitiesList", amenity);
    });

    selectedFishes.forEach((fish) => {
      formData.append("fishList", fish);
    });

    const dayMap = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6, 일: 7 };

    selectedDay.forEach((day) => {
      formData.append("dayList", dayMap[day]);
    });

    axios
      .post("http://localhost/fishing/insert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status == 201) {
          console.log(response);
          alert("낚시터 등록 완료");
          navi("/fishing");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDay = (day) => {
    setSelectedDay((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
    console.log("현재 선택한 요일: ", day);
  };

  //amenity 선택.선택해제
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
    console.log("현재 선택한 ameniteis: ", amenity);
  };

  const toggleFish = (fish) => {
    setSelectedFishes((prev) =>
      prev.includes(fish)
        ? prev.filter((item) => item !== fish)
        : [...prev, fish]
    );
    console.log("현재 선택한 어종: ", fish);
  };

  return (
    <>
      <TitleLine>
        <TitleText>민물낚시</TitleText>
      </TitleLine>
      <InsertWrap>
        <Title>낚시터 등록</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>닉네임</Label>
            <Input id="fishingWriter" type="text" value={auth.nickname}></Input>
          </FormGroup>
          <FormGroup>
            <Label>낚시터명</Label>
            <Input
              id="fishingName"
              type="text"
              onChange={(e) => setFishingName(e.target.value)}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>업체 번호</Label>
            <Input
              id="phone"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>업체 주소</Label>
            <Input
              id="address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>영업요일</Label>
            <AmenitiesContainer>
              {["월", "화", "수", "목", "금", "토", "일"].map((day) => {
                return (
                  <FishText
                    id="day"
                    key={day}
                    onClick={() => toggleDay(day)} // 클릭 시 toggleDay 함수 호출
                    selected={selectedDay.includes(day)} // selectedDay에 해당 day가 포함되어 있으면 true, 아니면 false
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    {day}
                  </FishText>
                );
              })}
            </AmenitiesContainer>
          </FormGroup>
          <FormGroup>
            <Label>영업 시작 시간</Label>
            <Input
              id="startTime"
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>영업 종료 시간</Label>
            <Input
              id="endTime"
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>상세정보</Label>
            <AmenitiesContainer>
              {[
                { img: airconditioner, label: "에어컨", amenitiesNo: 1 },
                { img: bathroom, label: "화장실", amenitiesNo: 2 },
                { img: beachumbrella, label: "그늘막", amenitiesNo: 3 },
                { img: bedding, label: "침구", amenitiesNo: 4 },
                { img: burner, label: "버너", amenitiesNo: 5 },
                { img: carpark, label: "주차장", amenitiesNo: 6 },
                { img: fan, label: "선풍기", amenitiesNo: 7 },
                { img: sofa, label: "소파", amenitiesNo: 8 },
                { img: tv, label: "텔레비전", amenitiesNo: 9 },
                { img: vest, label: "구명조끼", amenitiesNo: 10 },
              ].map((item) => (
                <AmenitiesDiv
                  key={item.label}
                  onClick={() => toggleAmenity(item.amenitiesNo)}
                  selected={selectedAmenities.includes(item.amenitiesNo)}
                  onChange={(e) => setSelectedAmenities(e.target.value)}
                >
                  <AmenitiesImgDiv>
                    <AmenitiesImg src={item.img} />
                  </AmenitiesImgDiv>
                  <AmenitiesTextDiv>
                    <AmenitiesText>{item.label}</AmenitiesText>
                  </AmenitiesTextDiv>
                </AmenitiesDiv>
              ))}
            </AmenitiesContainer>
          </FormGroup>
          <FormGroup>
            <Label>주요 어종</Label>

            <AmenitiesContainer>
              {[
                { img: fish1, label: "붕어", fishNo: 1 },
                { img: fish2, label: "향어", fishNo: 2 },
                { img: fish3, label: "잉어", fishNo: 3 },
                { img: fish4, label: "메기", fishNo: 4 },
                { img: fish5, label: "비단잉어", fishNo: 5 },
                { img: fish6, label: "광어(민물)", fishNo: 6 },
                { img: fish7, label: "가물치", fishNo: 7 },
                { img: fish8, label: "민어", fishNo: 8 },
                { img: fish9, label: "돌돔(민물)", fishNo: 9 },
                { img: fish10, label: "빙어", fishNo: 10 },
                { img: fish11, label: "송어", fishNo: 11 },
                { img: fish12, label: "민물기타", fishNo: 12 },
              ].map((item) => (
                <AmenitiesDiv
                  key={item.label}
                  onClick={() => toggleFish(item.fishNo)}
                  selected={selectedFishes.includes(item.fishNo)}
                  onChange={(e) => setSelectedFishes(e.target.value)}
                >
                  <AmenitiesImgDiv>
                    <AmenitiesImg src={item.img} />
                  </AmenitiesImgDiv>
                  <AmenitiesTextDiv>
                    <AmenitiesText>{item.label}</AmenitiesText>
                  </AmenitiesTextDiv>
                </AmenitiesDiv>
              ))}
            </AmenitiesContainer>
          </FormGroup>
          <FormGroup>
            <Label>사장님 한마디</Label>
            <TextArea id="introduce" type="text" required></TextArea>
          </FormGroup>
          <FormGroup>
            <Label>낚시터 사진 등록</Label>
            <Input type="file"></Input> <br />
          </FormGroup>
          <Button type="submit">신청</Button>
        </Form>
      </InsertWrap>
    </>
  );
};

export default FishingInsert;
