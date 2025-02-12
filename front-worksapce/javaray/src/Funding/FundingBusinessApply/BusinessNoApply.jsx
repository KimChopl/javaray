import {
  Button,
  Container,
  FileInput,
  Form,
  Input,
  Label,
  TextArea,
  Title,
} from "./BusinessNoApply.styles";

import { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const BusinessNoApply = () => {
  const [companyNo, setCompanyNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [openingDate, setOpeningDate] = useState();
  const [ceoName, setCeoName] = useState("");
  const [businessNoFile, setBusinessNoFile] = useState(null);
  const [content, setContent] = useState();
  const [nickname, setNickname] = useState("");
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get(`http://localhost/funding/businessNo`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          setCompanyNo(response.data.companyBusinessNo);
        });
    }
  }, [auth]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 10 * 1024 * 1024;

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert("허용되지 않는 파일 형식입니다.");
      return;
    }

    if (selectedFile && selectedFile.size > maxSize) {
      alert("파일의 크기가 너무 큽니다. 10MB이하로 선택해주세요.");
      return;
    }

    setBusinessNoFile(selectedFile);
  };

  const handleInsertFundingCompany = (e) => {
    e.preventDefault();

    if (!companyName || !phoneNo || !openingDate || !ceoName) {
      alert("내용을 입력해주세요!!");
      return;
    }

    if (!businessNoFile) {
      alert("사업자등록본 사본 파일을 넣어주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("companyNo", companyNo);
    formData.append("companyName", companyName);
    formData.append("phoneNo", phoneNo);
    formData.append("openingDate", openingDate);
    formData.append("ceoName", ceoName);
    formData.append("companyIntroduce", content);

    if (businessNoFile) {
      formData.append("businessNoFile", businessNoFile);
    } else {
      alert("사업자등록증 사본을 꼭 넣어 주시기 바랍니다.");
      return;
    }

    axios
      .post("http://localhost/funding/businessNoInsert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          alert("사업자 신청을 성공하셨습니다!");
          navi("/funding");
        }
      })
      .catch((error) => {
        alert(
          "사업자 신청을 실패하셨습니다. 다시 신청해주시면 감사하겠습니다."
        );
      });
  };

  return (
    <>
      <Container>
        <Title>사업등록 인증 서비스</Title>
        <Form onSubmit={handleInsertFundingCompany}>
          <div>
            <Label>작성자 ID</Label>
            <Input id="nickname" type="text" readOnly value={auth.nickname} />
          </div>
          <div>
            <Label htmlFor="companyNo">사업자등록번호</Label>
            <Input id="companyNo" value={companyNo} type="number" readOnly />
          </div>
          <div>
            <Label htmlFor="companyName">상호</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="dd"
              type="text"
            />
          </div>
          <div>
            <Label htmlFor="phoneNo">전화번호</Label>
            <Input
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="dd"
              type="number"
            />
          </div>
          <div>
            <Label htmlFor="openingDate">개업일자(사업자등록증 기준)</Label>
            <Input
              id="openingDate"
              value={openingDate}
              onChange={(e) => setOpeningDate(e.target.value)}
              className="dd"
              type="date"
            />
          </div>
          <div>
            <Label htmlFor="ceoName">대표자 성명</Label>
            <Input
              id="ceoName"
              value={ceoName}
              onChange={(e) => setCeoName(e.target.value)}
              className="dd"
              type="text"
            />
          </div>
          <div>
            <Label htmlFor="businessNoFile">사업자등록본 사본</Label>
            <br />
            <FileInput
              id="businessNoFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Label htmlFor="content">내용</Label>
            <TextArea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="dd"
              required
              placeholder="내용을 입력하세요"
            ></TextArea>
          </div>
          <Button type="submit">작성</Button>
        </Form>
      </Container>
    </>
  );
};

export default BusinessNoApply;
