import {
  Input,
  Label,
  OptionContainer,
  TextArea,
  Title,
} from "./FundingGoodsInsert.styles";

const FundingGoodsOption = ({ option, updateOption }) => {
  return (
    <OptionContainer>
      <Title>{option.id} 옵션 등록</Title>
      <div>
        <Label htmlFor={`optionTitle-${option.id}`}>옵션 제목</Label>
        <Input
          id={`optionTitle-${option.id}`}
          value={option.title}
          onChange={(e) => updateOption("title", e.target.value)}
          type="text"
          required
          placeholder="내용을 입력하세요"
        />
      </div>
      <div>
        <Label htmlFor={`optionContent-${option.id}`}>옵션 설명</Label>
        <TextArea
          id={`optionContent-${option.id}`}
          value={option.content}
          onChange={(e) => updateOption("content", e.target.value)}
          required
          placeholder="옵션 설명을 입력하세요"
        ></TextArea>
      </div>
      <div>
        <Label htmlFor={`optionPrice-${option.id}`}>판매 금액</Label>
        <Input
          id={`optionPrice-${option.id}`}
          value={option.price}
          onChange={(e) => updateOption("price", e.target.value)}
          type="number"
          required
          placeholder="금액을 입력하세요"
        />
      </div>
      <div>
        <Label htmlFor={`optionCount-${option.id}`}>옵션 수량</Label>
        <Input
          id={`optionCount-${option.id}`}
          value={option.count}
          onChange={(e) => updateOption("count", e.target.value)}
          type="number"
          required
          placeholder="수량을 입력하세요"
        />
      </div>
    </OptionContainer>
  );
};

export default FundingGoodsOption;
