import {
  Input,
  Label,
  OptionContainer,
  TextArea,
  Title,
} from "./FundingGoodsInsert.styles";

import { useState, useEffect } from "react";

const FundingGoodsOption = (props) => {
  const [optionNo, setOptionNo] = useState(props.optionNo);
  const [goodsTitle, setGoodsTitle] = useState();
  const [goodsContent, setGoodsContent] = useState();
  const [amountOfMoney, setAmountOfMoney] = useState();
  const [optionCount, setOptionCount] = useState([]);

  useEffect(() => {
    setOptionNo(props.optionNo);
  }, [props.optionNo]);

  return (
    <>
      {
        <OptionContainer>
          <Title>{optionNo}옵션 등록</Title>
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
          <div>
            <Label
              htmlFor="amountOfMoney"
              required
              placeholder="금액을 입력하세요"
            >
              옵션 수량
            </Label>
            <Input id="amountOfMoney" value={amountOfMoney} type="number" />
          </div>
        </OptionContainer>
      }
    </>
  );
};

export default FundingGoodsOption;
