import {
  InsertWrap,
  Title,
  Input,
  Label,
  TextArea,
  Button,
  Form,
} from "./FishingInsert.styled";

const FishingInsert = () => {
  return (
    <InsertWrap>
      <Title>낚시터 등록</Title>
      <Form>
        <div>
          <Label>닉네임</Label>
          <Input id="nickName" type="text" required></Input>
        </div>
        <div>
          <Label>낚시터명</Label>
        </div>
      </Form>
    </InsertWrap>
  );
};

export default FishingInsert;
