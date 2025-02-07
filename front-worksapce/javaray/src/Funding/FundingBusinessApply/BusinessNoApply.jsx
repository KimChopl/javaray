import {
  Button,
  Container,
  Form,
  Input,
  Label,
  TextArea,
  Title,
} from "./BusinessNoApply.styles";

import { useState } from "react";

const BusinessNoApply = () => {
  const [companyNo, setCompanyNo] = useState();
  const [companyName, setCompanyName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [openingDate, setOpeningDate] = useState();
  const [ceoName, setCeoName] = useState();
  const [businessNoFile, setBusinessNoFile] = useState();
  const [content, setContent] = useState();

  const handleInsertFundingCompany = () => {};

  return (
    <>
      <Container>
        <Title>사업등록 인증 서비스</Title>
        <Form onSubmit={handleInsertFundingCompany}>
          <div>
            <Label>작성자 ID</Label>
            <Input id="username" type="text" readOnly /*value={userId}*/ />
          </div>
          <div>
            <Label htmlFor="companyNo">사업자등록번호</Label>
            <Input id="companyNo" value={companyNo} type="number" readOnly />
          </div>
          <div>
            <Label htmlFor="companyName">상호</Label>
            <Input id="companyName" value={companyName} type="text" />
          </div>
          <div>
            <Label htmlFor="phoneNo">전화번호</Label>
            <Input id="phoneNo" value={phoneNo} type="number" />
          </div>
          <div>
            <Label htmlFor="openingDate">개업일자(사업자등록증 기준)</Label>
            <Input id="openingDate" value={openingDate} type="date" />
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
