import FishingDetail from "./FishingDetail";
import {
  DownWrap,
  AddressDiv,
  DownAddressH2,
  MessageDiv,
  MessageDiv1,
  MessageDiv2,
  MessageTitle,
  MessageText,
} from "./FishingProduct.styled";
import { useNavigate } from "react-router-dom";

const FishingProduct = ({ fishingsDetail }) => {
  return (
    <>
      <DownWrap>
        <AddressDiv>
          <DownAddressH2>{fishingsDetail?.address}</DownAddressH2>
        </AddressDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>사장님 한마디</MessageTitle>
          </MessageDiv1>
          <MessageDiv2>
            <MessageText>{fishingsDetail?.introduce}</MessageText>
          </MessageDiv2>
        </MessageDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>운영 시간</MessageTitle>
          </MessageDiv1>
          <MessageDiv2>
            <MessageText>
              영업 시작 시간 : {fishingsDetail?.startTime}
            </MessageText>
            <MessageText>
              영업 종료 시간 : {fishingsDetail?.endTime}
            </MessageText>
          </MessageDiv2>
        </MessageDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>편의시설</MessageTitle>
          </MessageDiv1>
          <MessageDiv2></MessageDiv2>
        </MessageDiv>
      </DownWrap>
    </>
  );
};

export default FishingProduct;
