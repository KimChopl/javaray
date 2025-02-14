import {
  Button,
  Container,
  ContainerDiv,
  Form,
  Input,
  Label,
  TextArea,
  Title,
} from "./FundingGoodsInsert.styles";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import axios from "axios";

const FundingGoodsForm = () => {
  const [categoryName, setCategoryName] = useState();
  const [goodsTitle, setGoodsTitle] = useState();
  const [goodsContent, setGoodsContent] = useState();
  const [saleStartDate, setSaleStartDate] = useState();
  const [saleFinishDate, setSaleFinshDate] = useState();
  const [amountOfMoney, setAmountOfMoney] = useState();
  const [selectedValue, setSelectedValue] = useState();
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

  const handleInsertFundingCompany = () => {};

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  console.log(selectedValue);
  return (
    <>
      <ContainerDiv>
        <Container>
          <Title>상품등록</Title>
          <Form onSubmit={handleInsertFundingCompany}>
            <div>
              <Label>작성자 ID</Label>
              <Input id="username" type="text" readOnly value={auth.nickname} />
            </div>
            <div>
              <Label htmlFor="categoryNo">상품카테고리</Label>
              <Input id="categoryNo" value={categoryName} type="text" />
            </div>
            <div>
              <label htmlFor="select-box">상품 카테고리 선택: </label>
              <br />
              <select
                id="select-box"
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="선택해주세요">-- 선택하세요 --</option>
                <option value="낚시대">🎣낚시대</option>
                <option value="미끼">🪱미끼</option>
              </select>
              <p>선택한 값: {selectedValue}</p>
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
              <Label
                htmlFor="goodsContent"
                required
                placeholder="내용을 입력하세요"
              >
                상품 설명
              </Label>
              <TextArea
                id="goodsContent"
                value={goodsContent}
                onChange={(e) => setGoodsContent(e.target.value)}
                required
                placeholder="상품 설명을 입력하세요"
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
              <Label
                htmlFor="amountOfMoney"
                required
                placeholder="금액을 입력하세요"
              >
                목표 금액
              </Label>
              <Input id="amountOfMoney" value={amountOfMoney} type="number" />
            </div>
            <Button type="submit">작성</Button>
          </Form>
        </Container>
        <Container>
          <Title>옵션 등록</Title>
          <Form onSubmit={handleInsertFundingCompany}>
            <div>
              <Label htmlFor="goodsTitle">옵션 제목</Label>
              <Input
                id="goodsTitle"
                value={goodsTitle}
                type="text"
                required
                placeholder="내용을 입력하세요"
              />
            </div>
            <div>
              <Label
                htmlFor="goodsContent"
                required
                placeholder="내용을 입력하세요"
              >
                옵션 설명
              </Label>
              <TextArea
                id="goodsContent"
                value={goodsContent}
                onChange={(e) => setGoodsContent(e.target.value)}
                required
                placeholder="옵션 설명을 입력하세요"
              ></TextArea>
            </div>
            <div></div>
            <div>
              <Label
                htmlFor="amountOfMoney"
                required
                placeholder="금액을 입력하세요"
              >
                판매 금액
              </Label>
              <Input id="amountOfMoney" value={amountOfMoney} type="number" />
            </div>
            <Button type="submit">작성</Button>
          </Form>
        </Container>
      </ContainerDiv>
    </>
  );
};

export default FundingGoodsForm;
