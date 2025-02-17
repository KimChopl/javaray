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
  const [options, setOptions] = useState(props.options);
  const [optionTitle, setOptionTitle] = useState();
  const [optionContent, setOptionContent] = useState();
  const [optionPrice, setOptionPrice] = useState();
  const [optionCount, setOptionCount] = useState([]);

  useEffect(() => {
    console.log(options);
    console.log(optionTitle);
    setOptionNo(props.optionNo);
    setOptions([
      { optionNo, optionTitle, optionContent, optionPrice, optionCount },
    ]);
    console.log(options);
  }, [optionTitle, optionContent, optionPrice, optionCount]);

  return (
    <>
      {
        <OptionContainer>
          <Title>{optionNo}옵션 등록</Title>
          <div>
            <Label htmlFor="optionTitle">옵션 제목</Label>
            <Input
              id="optionTitle"
              value={optionTitle}
              onChange={(e) => setOptionTitle(e.target.value)}
              type="text"
              required
              placeholder="내용을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="optionContent">옵션 설명</Label>
            <TextArea
              id="optionContent"
              value={optionContent}
              onChange={(e) => setOptionContent(e.target.value)}
              required
              placeholder="옵션 설명을 입력하세요"
            ></TextArea>
          </div>
          <div>
            <Label htmlFor="optionPrice">판매 금액</Label>
            <Input
              id="optionPrice"
              value={optionPrice}
              onChange={(e) => setOptionPrice(e.target.value)}
              type="number"
              required
              placeholder="금액을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="optionCount">옵션 수량</Label>
            <Input
              id="optionCount"
              value={optionCount}
              onChange={(e) => setOptionCount(e.target.value)}
              type="number"
              required
              placeholder="수량을 입력하세요"
            />
          </div>
        </OptionContainer>
      }
    </>
  );
};

export default FundingGoodsOption;
