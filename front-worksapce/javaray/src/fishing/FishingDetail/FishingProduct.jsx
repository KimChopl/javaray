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

const FishingProduct = () => {
  return (
    <>
      <DownWrap>
        <AddressDiv>
          <DownAddressH2>서울 노원구 동일로 190길 47</DownAddressH2>
        </AddressDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>사장님 한마디</MessageTitle>
          </MessageDiv1>
          <MessageDiv2>
            <MessageText>
              최고의 낚시를 위해 노력하는 자바레이낚시터 입니다. <br />{" "}
              고객님들께 최고의 낚시를 제공하기 위해 노력하는 자바레이낚시터!{" "}
              <br /> 많은 방문 부탁드립니다.
            </MessageText>
          </MessageDiv2>
        </MessageDiv>
        <MessageDiv>
          <MessageDiv1>
            <MessageTitle>운영 시간</MessageTitle>
          </MessageDiv1>
          <MessageDiv2></MessageDiv2>
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
