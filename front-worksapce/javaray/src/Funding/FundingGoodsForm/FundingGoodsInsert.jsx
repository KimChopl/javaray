import {
  Button,
  ContainerDiv,
  Form,
  Input,
  Label,
  MainContainer,
  OptionContainer,
  TextArea,
  Title,
} from "./FundingGoodsInsert.styles";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import axios from "axios";
import FundingGoodsOption from "./FundingGoodsOption";

const FundingGoodsForm = () => {
  const [categoryName, setCategoryName] = useState();
  const [goodsTitle, setGoodsTitle] = useState();
  const [goodsContent, setGoodsContent] = useState();
  const [saleStartDate, setSaleStartDate] = useState();
  const [saleFinishDate, setSaleFinshDate] = useState();
  const [amountOfMoney, setAmountOfMoney] = useState();
  const [options, setOptions] = useState([]);
  const [optionNo, setOptionNo] = useState("전체");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost/funding/selectCategory")
      .then((response) => {
        console.log(response);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  const handleCategory = (e) => {
    setCategoryName(e.target.value);
  };

  const handleOption = (e) => {
    setOptionNo(e.target.value);
  };

  const handleInsertFundingCompany = (e) => {
    console.log(options);
  };

  const settingOption = (e) => {
    setOptions(e);
  };

  return (
    <>
      <ContainerDiv>
        <Form onSubmit={handleInsertFundingCompany}>
          <MainContainer>
            <Title>상품등록</Title>
            <select
              id="select-box"
              value={optionNo}
              onChange={handleOption}
              style={{ textAlign: "center" }}
            >
              <option value="">-- 옵션 개수를 선택해주세요 --</option>
              <option value="1">1개</option>
              <option value="2">2개</option>
              <option value="3">3개</option>
              <option value="4">4개</option>
            </select>
            <br />
            <br />
            <div>
              <Label>작성자 ID</Label>
              <Input id="username" type="text" readOnly value={auth.nickname} />
            </div>
            <div>
              <label htmlFor="select-box">상품 카테고리 선택: </label>
              <br />
              <br />
              <select
                id="select-box"
                value={categoryName}
                onChange={handleCategory}
              >
                <option value="">선택해주세요</option>
                <option value="전체">🈴전체</option>
                <option value="낚시대">🎣낚시대</option>
                <option value="릴">🦾릴</option>
                <option value="낚시줄">🧵낚시줄</option>
                <option value="낚시의류">🦺낚시의류</option>
              </select>
            </div>
            <br />
            <div>
              <Label htmlFor="categoryNo">상품카테고리</Label>
              <Input
                id="categoryNo"
                value={categoryName}
                type="text"
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="goodsTitle">상품 제목</Label>
              <Input
                id="goodsTitle"
                value={goodsTitle}
                type="text"
                required
                placeholder="내용을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="goodsContent">상품 설명</Label>
              <TextArea
                id="goodsContent"
                value={goodsContent}
                onChange={(e) => setGoodsContent(e.target.value)}
                required
                placeholder="설명을 입력하세요"
              ></TextArea>
            </div>
            <div>
              <Label htmlFor="saleStartDate" required>
                판매 시작 날짜
              </Label>
              <Input
                id="saleStartDate"
                value={saleStartDate}
                type="datetime-local"
              />
            </div>
            <div>
              <Label htmlFor="saleFinishDate" required>
                판매 종료 날짜
              </Label>
              <Input
                id="saleFinishDate"
                value={saleFinishDate}
                type="datetime-local"
              />
            </div>
            <div>
              <Label htmlFor="amountOfMoney">목표 금액</Label>
              <Input
                id="amountOfMoney"
                value={amountOfMoney}
                type="number"
                placeholder="금액을 입력하세요"
              />
            </div>
          </MainContainer>
          <div>
            {Array.from({ length: optionNo }, (_, index) => (
              <FundingGoodsOption
                key={index}
                optionNo={index + 1}
                options={options}
                setOptions={settingOption}
              />
            ))}
          </div>

          <Button type="submit">작성</Button>
        </Form>
      </ContainerDiv>
    </>
  );
};

export default FundingGoodsForm;
