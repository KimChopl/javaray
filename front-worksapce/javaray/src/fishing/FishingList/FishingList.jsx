import { useEffect, useState } from "react";
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
  moreButton,
  FullContainer,
} from "./FishingList.styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FishingList = () => {
  const navigate = useNavigate();

  const [fishings, setFishings] = useState([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost/fishing?page=${page}`)
      .then((response) => {
        setFishings((fishings) => [...fishings, ...response.data]);
        if (response.data.length < 6) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handleMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <FullContainer>
        <TitleLine>
          <TitleText>민물낚시</TitleText>
        </TitleLine>
        <Container>
          <Block1>
            {fishings.map((fishing) => (
              <FishingListBox
                key={fishing.fishingNo}
                onClick={() =>
                  navigate(`detail?fishingNo=${fishing.fishingNo}`)
                }
              >
                <ImageDiv></ImageDiv>
                <TextDiv>
                  <InnerTextDiv>
                    <TitleP>{fishing.fishingName}</TitleP>
                  </InnerTextDiv>

                  <InnerTextDiv>
                    {fishing.fishList.map((fish) => {
                      return <FishP>{fish.fishName}</FishP>;
                    })}
                  </InnerTextDiv>
                  <InnerTextDiv>
                    <AddressP>{fishing.address}</AddressP>
                  </InnerTextDiv>
                </TextDiv>
              </FishingListBox>
            ))}
            {hasMore && (
              <FilterButtom onClick={handleMore}>더보기</FilterButtom>
            )}
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
      </FullContainer>
    </>
  );
};

export default FishingList;
