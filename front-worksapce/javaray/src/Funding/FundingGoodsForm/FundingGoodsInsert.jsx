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

import { useState } from "react";

const FundingGoodsForm = () => {
  const [categoryNo, setCategoryNo] = useState();
  const [goodsTitle, setGoodsTitle] = useState();
  const [goodsContent, setGoodsContent] = useState();
  const [saleStartDate, setSaleStartDate] = useState();
  const [saleFinishDate, setSaleFinshDate] = useState();
  const [amountOfMoney, setAmountOfMoney] = useState();

  const handleInsertFundingCompany = () => {};

  return (
    <>
      <ContainerDiv>
        <Container>
          <Title>상품등록</Title>
          <Form onSubmit={handleInsertFundingCompany}>
            <div>
              <Label>작성자 ID</Label>
              <Input id="username" type="text" readOnly /*value={userId}*/ />
            </div>
            <div>
              <Label htmlFor="categoryNo">상품카테고리</Label>
              <Input id="categoryNo" value={categoryNo} type="text" />
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
                placeholder="나는 우리반 평가 1등이다"
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
              <Label>작성자 ID</Label>
              <Input id="username" type="text" readOnly /*value={userId}*/ />
            </div>
            <div>
              <Label htmlFor="categoryNo">상품카테고리</Label>
              <Input id="categoryNo" value={categoryNo} type="text" />
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
                placeholder="나는 우리반 평가 1등이다"
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
      </ContainerDiv>
    </>
  );
};

export default FundingGoodsForm;
