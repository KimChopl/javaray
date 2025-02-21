import {
  InsertWrap,
  Form,
  Title,
  Input,
  Label,
  TextArea,
  FormGroup,
  Button,
} from "../FishingInsert/FishingInsert.styled";
import { TitleLine, TitleText } from "../FishingList/FishingList.styled";
import { useState, useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "../../UseContext/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FishingDetail from "./FishingDetail";
import { useLocation } from "react-router-dom";

const FishingReviewInsert = () => {
  const location = useLocation();
  const { fishingsDetail } = location.state;

  const { auth } = useContext(AuthContext);
  const [reviewWriter, setReviewWriter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fishingDate, setFishingDate] = useState("");
  const [file, setFile] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    if (!!!auth.isAuthenticated) {
      navi("/login");
    } else {
      console.log("진입");
      console.log("fishingsDetail: ", fishingsDetail);
      setAccessToken(auth.accessToken);
      setReviewWriter(auth.nickname);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"]; //들어올 수 있는 파일형태 배열로 지정
    const maxSize = 5 * 1024 * 1024; //파일 크기

    if (selectedFile && !!!allowedTypes.includes(selectedFile.type)) {
      alert("허용되지 않는 파일 형식입니다.");
      return;
    }

    if (selectedFile && selectedFile.size > maxSize) {
      alert("파일의 크기가 너무 큽니다. 5MB이하로 선택해주세요.");
      return;
    }

    setFile(selectedFile); //모든 if문을 넘어왔을때 파일이 들어갈 수 있게
  };

  const handleInsertReview = (e) => {
    e.preventDefault();

    if (!!!title || !!!content) {
      alert("제목과 내용은 필수 입력사항입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("nickname", auth.nickname);
    formData.append("fishingDate", fishingDate);
    formData.append("fishingNo", fishingsDetail.fishingNo);
    formData.append("userId", auth.userId);
    formData.append("userNo", auth.userNo);

    if (file) {
      formData.append("file", file);
    }

    axios
      .post("http://localhost/fishing/review/insert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status == 201) {
          navi(`/fishing/detail/${fishingsDetail.fishingNo}`);
        }
      })
      .catch((error) => {
        console.error("리뷰등록오류:", error);
      });
  };

  return (
    <>
      <TitleLine>
        <TitleText>민물낚시</TitleText>
      </TitleLine>
      <InsertWrap>
        <Title>리뷰 작성</Title>
        <Form onSubmit={handleInsertReview}>
          <FormGroup>
            <Label>닉네임</Label>
            <Input id="nickname" type="text" value={auth.nickname}></Input>
          </FormGroup>
          <FormGroup>
            <Label>낚시터명</Label>
            <Input
              id="fishingName"
              type="text"
              value={fishingsDetail.fishingName}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>낚시 날짜</Label>
            <Input
              id="fishingDate"
              type="date"
              value={fishingDate}
              onChange={(e) => setFishingDate(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>사진등록</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>제목</Label>
            <Input
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>리뷰</Label>
            <TextArea
              id="content"
              type="text"
              onChange={(e) => setContent(e.target.value)}
            ></TextArea>
          </FormGroup>
          <Button type="submit">리뷰등록</Button>
        </Form>
      </InsertWrap>
    </>
  );
};
export default FishingReviewInsert;
