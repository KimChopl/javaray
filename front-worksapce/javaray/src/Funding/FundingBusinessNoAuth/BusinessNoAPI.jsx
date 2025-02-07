import {
  Button,
  Container,
  Form,
  Input,
  Label,
  Title,
} from "./BusinessNoAPI.styles";

import { useState } from "react";

const BusninessNoAPI = () => {
  const [companyNo, setCompanyNo] = useState();

  const handleInsertAPI = () => {};

  return (
    <>
      <Container>
        <Title>사업자등록 인증 서비스</Title>
        <Form onSubmit={handleInsertAPI}>
          <div>
            <Label htmlFor="username">작성자 ID</Label>
            <Input id="username" type="text" readOnly /*value={userId}*/ />
          </div>
          <div>
            <Label htmlFor="companyNo">사업자등록번호</Label>
            <Input
              id="companyNo"
              value={companyNo}
              onChange={(e) => setCompanyNo(e.target.value)}
              type="text"
              required
              placeholder="사업자등록번호를 입력하세요"
            />
          </div>
          <Button type="submit">작성</Button>
        </Form>
      </Container>
    </>
  );
};

export default BusninessNoAPI;
