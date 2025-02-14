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

const FishingReviewInsert = ({ fishingsDetail }) => {
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
      setAccessToken(auth.accessToken);
      setReviewWriter(auth.nickname);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jsp", "image/jpeg", "image/png", "image/gif"]; //들어올 수 있는 파일형태 배열로 지정
    const maxSize = 10 * 1024 * 1024; //파일 크기

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
    formData.append("reviewTitle", title);
    formData.append("reviewContent", content);
    formData.append("reviewWriter", auth.nickname);
    formData.append("fisingDate", fishingDate);

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
          navi(`detail/${FishingDetail.fishingNo}`);
        }
      });

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
                value={fishingsDetail.fishingNo}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>낚시 날짜</Label>
              <Input id="fishingDate" type="date"></Input>
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
              <Input id="title" type="text"></Input>
            </FormGroup>
            <FormGroup>
              <Label>리뷰</Label>
              <TextArea id="content" type="text"></TextArea>
            </FormGroup>
            <Button>리뷰등록</Button>
          </Form>
        </InsertWrap>
      </>
    );
  };
};
export default FishingReviewInsert;
