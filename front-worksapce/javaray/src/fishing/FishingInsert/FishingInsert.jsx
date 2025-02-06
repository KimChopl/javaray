import {
  InsertWrap,
  Title,
  Input,
  Label,
  TextArea,
  Button,
  Form,
  FormGroup,
} from "./FishingInsert.styled";

const FishingInsert = () => {
  return (
    <InsertWrap>
      <Title>낚시터 등록</Title>
      <Form>
        <FormGroup>
          <Label>닉네임</Label>
          <Input id="nickName" type="text" required></Input>
        </FormGroup>
        <FormGroup>
          <Label>낚시터명</Label>
          <Input id="fishingName" type="text" required></Input>
        </FormGroup>
        <FormGroup>
          <Label>업체 번호</Label>
          <Input id="fishingPhone" type=""></Input>
        </FormGroup>
        <FormGroup>
          <Label>업체 주소</Label>
          <Input id="fishingAddress" type="text"></Input>
        </FormGroup>
        <FormGroup>
          <Label>영업 시작 시간</Label>
          <Input id="fishingStartTime" type="time"></Input>
        </FormGroup>
        <FormGroup>
          <Label>영업 종료 시간</Label>
          <Input id="fishingEndTime" type="time"></Input>
        </FormGroup>
        <FormGroup>
          <Label>상세정보</Label>
          <Input type="checkbox"></Input>
        </FormGroup>
        <FormGroup>
          <Label>주요 어종</Label>
          <Input type="checkbox"></Input>
        </FormGroup>
        <FormGroup>
          <Label>사장님 한마디</Label>
          <TextArea></TextArea>
        </FormGroup>
        <FormGroup>
          <Label>낚시터 사진 등록</Label>
          <Input type="file"></Input> <br />
          <Input type="file"></Input> <br />
          <Input type="file"></Input> <br />
        </FormGroup>
        <FormGroup>
          <Label>사업자등록증</Label>
          <Input id="licens" type="file"></Input>
        </FormGroup>
        <Button type="submit">신청</Button>
      </Form>
    </InsertWrap>
  );
};

export default FishingInsert;
