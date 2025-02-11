import {
  Button,
  Container,
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

const BusinessNoApply = () => {
  const [companyNo, setCompanyNo] = useState();
  const [companyName, setCompanyName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [openingDate, setOpeningDate] = useState();
  const [ceoName, setCeoName] = useState();
  const [businessNoFile, setBusinessNoFile] = useState();
  const [content, setContent] = useState();
  const { auth } = useContext(AuthContext);
  //alert(auth.accessToken);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get(`http://localhost/businessNo`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          setCompanyNo(response.data.companyBusinessNo);
        });
    }
  }, [auth]);

  const handleInsertFundingCompany = () => {
    axios.post("http://localhost/apply", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
  };

  return (
    <>
      <Container>
        <Title>사업등록 인증 서비스</Title>
        <Form onSubmit={handleInsertFundingCompany}>
          <div>
            <Label>작성자 ID</Label>
            <Input id="username" type="text" readOnly value={auth.username} />
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
              type="text"
            />
          </div>
          <div>
            <Label htmlFor="phoneNo">전화번호</Label>
            <Input
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              type="number"
            />
          </div>
          <div>
            <Label htmlFor="openingDate">개업일자(사업자등록증 기준)</Label>
            <Input
              id="openingDate"
              value={openingDate}
              onChange={(e) => setOpeningDate(e.target.value)}
              type="date"
            />
          </div>
          <div>
            <Label htmlFor="ceoName">대표자 성명</Label>
            <Input id="ceoName" value={ceoName} type="text" />
          </div>
          <div>
            <Label htmlFor="businessNoFile">사업자등록본 사본</Label>
            <Input
              id="businessNoFile"
              value={businessNoFile}
              type="file"
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="content">내용</Label>
            <TextArea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
