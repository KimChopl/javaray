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

import fish1 from "../FishingImg/fish1.png";
import fish2 from "../FishingImg/fish2.png";
import fish3 from "../FishingImg/fish3.png";
import fish4 from "../FishingImg/fish4.png";
import fish5 from "../FishingImg/fish5.png";
import fish6 from "../FishingImg/fish6.png";
import fish7 from "../FishingImg/fish7.png";
import fish8 from "../FishingImg/fish8.png";
import fish9 from "../FishingImg/fish9.png";
import fish10 from "../FishingImg/fish10.png";
import fish11 from "../FishingImg/fish11.png";
import fish12 from "../FishingImg/fish12.png";

import { TitleLine, TitleText } from "../FishingList/FishingList.styled";

const FishingInsert = () => {
  return (
    <>
      <TitleLine>
        <TitleText>민물낚시</TitleText>
      </TitleLine>
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
            <Input id="fishingPhone" type="" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>업체 주소</Label>
            <Input id="fishingAddress" type="text" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>영업요일</Label>
            <AmenitiesContainer>
              <FishText>월</FishText>
              <FishText>화</FishText>
              <FishText>수</FishText>
              <FishText>목</FishText>
              <FishText>금</FishText>
              <FishText>토</FishText>
              <FishText>일</FishText>
            </AmenitiesContainer>
          </FormGroup>
          <FormGroup>
            <Label>영업 시작 시간</Label>
            <Input id="fishingStartTime" type="time" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>영업 종료 시간</Label>
            <Input id="fishingEndTime" type="time" required></Input>
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
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish1} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>붕어</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish2} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>향어어</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish3} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>잉어</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish4} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>메기</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish5} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>비단잉어</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish6} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>광어(민물)</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish7} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>가물치</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish8} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>민어</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish9} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>돌돔(민물)</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish10} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>빙어</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish11} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>송어</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
              <AmenitiesDiv>
                <AmenitiesImgDiv>
                  <AmenitiesImg src={fish12} />
                </AmenitiesImgDiv>
                <AmenitiesTextDiv>
                  <AmenitiesText>민물기타</AmenitiesText>
                </AmenitiesTextDiv>
              </AmenitiesDiv>
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
          <Button type="submit">신청</Button>
        </Form>
      </InsertWrap>
    </>
  );
};

export default FishingInsert;
