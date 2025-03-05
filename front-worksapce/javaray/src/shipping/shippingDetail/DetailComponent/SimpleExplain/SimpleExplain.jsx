import { AllowNumberDiv, AttentionInfo, BaseBar, BaseCover, BookBtn, BookBtnCover, ContentLabel, LocationDiv, OtherInfo, PriceDiv, RatingInfo } from "../../ShippingDetailCss"
import DetailFish from "../Fish/DetailFish"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SimpleExplain = ({info}) => {
    const {shipping, move, auth, setShipping, attention, setAttention, setFishNo, isFlag, navi} = info;
    const clickModal = (e, fishNo) => {
        if (fishNo) {
          setFishNo(fishNo);
        }
        isFlag(e);
      };
    const shippingBook = () => {
      if(auth.isAuthenticated){
        navi(`/shipping/book/${shipping.shippingNo}`)
      } else {
        alert('로그인 후 사용할 수 있습니다.')
      }
    }
    const changeAttention = () => {
        if (auth.isAuthenticated) {
          if (attention) {
            axios
              .delete(
                `http://localhost/shippings/attention?shippingNo=${shipping.shippingNo}`,
                {
                  headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                  },
                }
              )
              .then(() => {
                setShipping({
                  ...shipping,
                  attention: shipping.attention - 1,
                });
                setAttention(false);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            axios
              .post(
                `http://localhost/shippings/attention?shippingNo=${shipping.shippingNo}`,
                null,
                { headers: { Authorization: `Bearer ${auth.accessToken}` } }
              )
              .then(() => {
                setShipping({
                  ...shipping,
                  attention: shipping.attention + 1,
                });
                setAttention(true);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          alert("로그인 후 이용 가능합니다.");
        }
      };
    return (
        <BaseCover>
          <BaseBar>
            <LocationDiv>
              <ContentLabel>{shipping.port.address}</ContentLabel>
            </LocationDiv>
          </BaseBar>
          <BaseBar>
            <PriceDiv>
              <ContentLabel>인당 가격 : {shipping.price}원</ContentLabel>
            </PriceDiv>
            <AllowNumberDiv>
              <ContentLabel>
                최대 탑승 인원 : {shipping.allowPeopleNo}명
              </ContentLabel>
            </AllowNumberDiv>
          </BaseBar>
          <BaseBar>
            <DetailFish clickModal={clickModal} fishs={shipping.fishs} />
          </BaseBar>
          <BaseBar>
            <BookBtnCover>
              {shipping.member.nickname === auth.nickname ? (
                <BookBtn
                  onClick={() =>
                    navi(`/shipping/update/${shipping.shippingNo}`)
                  }
                >
                  수정하기
                </BookBtn>
              ) : (
                <BookBtn onClick={shippingBook}>에약하기</BookBtn>
              )}
            </BookBtnCover>
            <AttentionInfo onClick={changeAttention}>
              {attention ? "❤" : "🤍"}
              <label>+{shipping.attention}</label>
            </AttentionInfo>
          </BaseBar>
          <BaseBar>
            <OtherInfo onClick={() => move("contentSection")}>
              상세내용
            </OtherInfo>
            <OtherInfo onClick={() => move("reviewSection")}>
              리뷰
            </OtherInfo>
            <RatingInfo>⭐ : {shipping.avgRating}</RatingInfo>
          </BaseBar>
        </BaseCover>
    )
}