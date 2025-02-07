import {
  InsertWrap,
  Title,
  Input,
  Label,
  TextArea,
  Button,
  Form,
  FormGroup,
  AmenitiesImg,
  AmenitiesText,
  AmenitiesDiv,
  AmenitiesContainer,
  FishText,
  AmenitiesImgDiv,
  AmenitiesTextDiv,
} from "./FishingInsert.styled";

import airconditioner from "../FishingImg/airconditioner.png";
import bathroom from "../FishingImg/bathroom.png";
import beachumbrella from "../FishingImg/beachumbrella.png";
import bedding from "../FishingImg/bedding.png";
import burner from "../FishingImg/burner.png";
import carpark from "../FishingImg/carpark.png";
import fan from "../FishingImg/fan.png";
import sofa from "../FishingImg/sofa.png";
import tv from "../FishingImg/tv.png";
import vest from "../FishingImg/vest.png";

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
          <AmenitiesContainer>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={airconditioner} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>에어컨</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={bathroom} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>화장실</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={beachumbrella} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>그늘막</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={bedding} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>침구</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={burner} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>버너</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={carpark} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>주차장</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={fan} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>선풍기</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={sofa}></AmenitiesImg>
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>소파</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={tv} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>텔레비전</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
            <AmenitiesDiv>
              <AmenitiesImgDiv>
                <AmenitiesImg src={vest} />
              </AmenitiesImgDiv>
              <AmenitiesTextDiv>
                <AmenitiesText>구명조끼</AmenitiesText>
              </AmenitiesTextDiv>
            </AmenitiesDiv>
          </AmenitiesContainer>
        </FormGroup>
        <FormGroup>
          <Label>주요 어종</Label>

          <AmenitiesContainer>
            <FishText>붕어</FishText>
            <FishText>향어</FishText>
            <FishText>잉어</FishText>
            <FishText>메기</FishText>
            <FishText>비단잉어</FishText>
            <FishText>광어(민물)</FishText>
            <FishText>가물치</FishText>
            <FishText>민어</FishText>
            <FishText>돌돔(민물)</FishText>
            <FishText>빙어</FishText>
            <FishText>송어</FishText>
            <FishText>민물기타</FishText>
          </AmenitiesContainer>
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
