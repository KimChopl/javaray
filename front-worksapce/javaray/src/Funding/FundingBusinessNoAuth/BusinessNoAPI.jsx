import {
  Button,
  Container,
  Form,
  Input,
  Label,
  Title,
} from "./BusinessNoAPI.styles";

import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../UseContext/Auth/AuthContext";

const BusninessNoAPI = () => {
  const [companyNo, setCompanyNo] = useState(0);
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navi = useNavigate();
  const { auth, signout } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navi("/");
    } else {
      setUsername(auth.username);
      setAccessToken(auth.accessToken);
    }
  });

  const handleInsertAPI = async (e) => {
    e.preventDefault();

    const requestData = { b_no: [companyNo] };

    const handleSelectAPI = async () => {
      const response = await axios.post(
        "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=rLUqNnUbI4GCnrviVkaBCrWotodsN1CKcxmhdtyVLVUggoHUwU%2FGvbjzdi80ODvdq4JpQve26aZub0zA29yezA%3D%3D",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response;
    };

    const response = await handleSelectAPI();

    await handleInsertBusinessNo(response);
  };

  const handleInsertBusinessNo = async (response) => {
    await axios
      .post(
        "http://localhost/businessNo",
        {
          companyBusinessNo: companyNo,
          resultContent: response.data.data[0].tax_type,
          resultCode: response.data.data[0].tax_type_cd,
          boardWriter: username,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("사업자등록번호가 인증되었습니다. 다시 로그인해주세요.");
        signout();
      })
      .catch((error) => {
        console.log(error);
        alert("사업자등록번호 인증을 실패했습니다.");
      });
  };

  return (
    <>
      <Container>
        <Title>사업자등록 인증 서비스</Title>
        <Form onSubmit={handleInsertAPI}>
          <div>
            <Label htmlFor="username">작성자 ID</Label>
            <Input id="username" type="text" readOnly value={username} />
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
