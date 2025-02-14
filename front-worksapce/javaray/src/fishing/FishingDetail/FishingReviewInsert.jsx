import {
  InsertWrap,
  Form,
  Title,
  Input,
  Label,
  TextArea,
  FormGroup,
  Button,
} from "../FishingInsert/FishingInsert.styled";
import { TitleLine, TitleText } from "../FishingList/FishingList.styled";

const FishingReviewInsert = () => {
  return (
    <>
      <TitleLine>
        <TitleText>민물낚시</TitleText>
      </TitleLine>
      <InsertWrap>
        <Title>리뷰 작성</Title>
        <Form>
          <FormGroup>
            <Label>닉네임</Label>
            <Input type="text"></Input>
          </FormGroup>
          <FormGroup>
            <Label>낚시터명</Label>
            <Input type="text"></Input>
          </FormGroup>
          <FormGroup>
            <Label>잡은 어종</Label>
            <Input></Input>
          </FormGroup>
          <FormGroup>
            <Label>낚시 날짜</Label>
            <Input type="date"></Input>
          </FormGroup>
          <FormGroup>
            <Label>사진등록</Label>
            <Input type="file"></Input>
          </FormGroup>
          <FormGroup>
            <Label>제목</Label>
            <Input type="text"></Input>
          </FormGroup>
          <FormGroup>
            <Label>리뷰</Label>
            <TextArea type="text"></TextArea>
          </FormGroup>
          <Button>리뷰등록</Button>
        </Form>
      </InsertWrap>
    </>
  );
};

export default FishingReviewInsert;
