import {
  Container,
  FishingListBox,
  Block1,
  Block2,
  FishingFilterBox,
  FishingAreaFilterBox,
  FilterButtom,
  TitleP,
  AddressP,
  ImageDiv,
  TextDiv,
  InnerTextDiv,
  FishP,
  PriceDiv,
  FilterP,
  TitleLine,
  TitleText,
} from "./FishingList.styled";
import { useNavigate } from "react-router-dom";

const FishingList = () => {
  const navigate = useNavigate();
  return (
    <>
      <TitleLine>
        <TitleText>민물낚시</TitleText>
      </TitleLine>
      <Container>
        <Block1>
          <FishingListBox onClick={() => navigate("./detail")}>
            <ImageDiv></ImageDiv>
            <TextDiv>
              <InnerTextDiv>
                <TitleP>남촌낚시터</TitleP>
              </InnerTextDiv>
              <InnerTextDiv>
                <FishP>붕어 외 2종</FishP>
              </InnerTextDiv>
              <InnerTextDiv>
                <AddressP>인천 남동구</AddressP>
              </InnerTextDiv>
              <PriceDiv>
                <TitleP>20,000~</TitleP>
              </PriceDiv>
            </TextDiv>
          </FishingListBox>

          <FishingListBox>
            <ImageDiv></ImageDiv>
            <TextDiv>
              <InnerTextDiv>
                <TitleP>남촌낚시터</TitleP>
              </InnerTextDiv>
              <InnerTextDiv>
                <FishP>붕어 외 2종</FishP>
              </InnerTextDiv>
              <InnerTextDiv>
                <AddressP>인천 남동구</AddressP>
              </InnerTextDiv>
              <PriceDiv>
                <TitleP>20,000~</TitleP>
              </PriceDiv>
            </TextDiv>
          </FishingListBox>

          <FishingListBox>
            <ImageDiv></ImageDiv>
            <TextDiv>
              <InnerTextDiv>
                <TitleP>남촌낚시터</TitleP>
              </InnerTextDiv>
              <InnerTextDiv>
                <FishP>붕어 외 2종</FishP>
              </InnerTextDiv>
              <InnerTextDiv>
                <AddressP>인천 남동구</AddressP>
              </InnerTextDiv>
              <PriceDiv>
                <TitleP>20,000~</TitleP>
              </PriceDiv>
            </TextDiv>
          </FishingListBox>
        </Block1>
        <Block2>
          <FishingAreaFilterBox>
            <FilterP>지역필터</FilterP>
            <FilterButtom type="submit">선택</FilterButtom>
          </FishingAreaFilterBox>
          <FishingFilterBox>
            <FilterP>필터</FilterP>
          </FishingFilterBox>
        </Block2>
      </Container>
    </>
  );
};

export default FishingList;
