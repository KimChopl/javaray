import {
  Button,
  Container,
  Form,
  Input,
  Label,
  Title,
} from "./BusinessNoAPI.styles";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusninessNoAPI = () => {
  const [companyNo, setCompanyNo] = useState();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [taxType, setTaxType] = useState("");
  const [taxTypeCd, setTaxTypeCd] = useState("");
  const navi = useNavigate();

  const handleInsertAPI = (e) => {
    e.preventDefault();

    const requestData = { b_no: [companyNo] };

    axios
      .post(
        "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=rLUqNnUbI4GCnrviVkaBCrWotodsN1CKcxmhdtyVLVUggoHUwU%2FGvbjzdi80ODvdq4JpQve26aZub0zA29yezA%3D%3D",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((result) => {
        setTaxType(result.data.data[0].tax_type);
        setTaxTypeCd(result.data.data[0].tax_type_cd);
        console.log(result);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error Response:", error.response.data); // 서버 응답 에러 메시지 출력
        } else if (error.request) {
          console.log("No Response Received:", error.request); // 요청이 전송되었으나 응답이 없는 경우
        } else {
          console.log("Request Error:", error.message); // 요청 설정 중 발생한 에러
        }
      });
  };

  useEffect(() => {
    if (taxType !== "" && taxTypeCd !== "") {
      axios
        .post(
          "http://localhost/funding",
          {
            companyBusinessNo: companyNo,
            resultContent: taxType,
            resultCode: taxTypeCd,
          },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJya2R0bXhoIiwiaWF0IjoxNzM5MTU1OTM3LCJleHAiOjE3MzkyNDIzMzd9.d1oSPezNFHemHmOnJ0TvMl7j0e1cI1PL5AYVPCHAEV9djUkLPFjL34iPq--OKhJwDSNJfHKnVZD6qUpcO_5Ejw",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            alert("사업자인증번호 조회 성공하셨습니다.");
            navi("/funding");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

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
