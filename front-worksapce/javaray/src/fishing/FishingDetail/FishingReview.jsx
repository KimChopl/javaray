import {
  ReviewDiv,
  ReviewWrap,
  ReviewDivTop,
  ReviewDivTopP,
  ReviewDivBottom,
  ReviewTitle,
  ReviewDivMiddel,
  ReviewTitleP,
  ReviewDate,
  ReivewDateP,
  ReviewButton,
  ReviewButtonWrap,
} from "./FishingReview.styled";
import { useState, useEffect } from "react";
import { DownWrap } from "./FishingProduct.styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FishingReview = ({ fishingsDetail }) => {
  console.log("FishingDetail에서 받은 데이터: ", fishingsDetail);

  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태 관리
  const navigate = useNavigate();

  // useEffect를 사용해 리뷰 데이터를 불러옴
  useEffect(() => {
    axios
      .get("http://localhost/fishing/review", {
        params: {
          fishingNo: fishingsDetail.fishingNo,
        },
      })
      .then((response) => {
        console.log("불러온 리뷰:", response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("리뷰 불러오기 오류:", error);
      });
  }, [fishingsDetail.fishingNo]);

  return (
    <DownWrap>
      <ReviewWrap>
        {reviews.length === 0 ? (
          <h3>아직 등록된 리뷰가 없습니다.</h3>
        ) : (
          reviews.map((review) => (
            <ReviewDiv key={review.reviewNo}>
              <ReviewDivTop>
                <ReviewDivTopP>{review.nickname}</ReviewDivTopP>
              </ReviewDivTop>
              <ReviewDivMiddel></ReviewDivMiddel>
              <ReviewDivBottom>
                <ReviewTitle>
                  <ReviewTitleP>{review.title}</ReviewTitleP>
                </ReviewTitle>
                <ReviewDate>
                  <ReivewDateP>{review.fishingDate}</ReivewDateP>
                </ReviewDate>
              </ReviewDivBottom>
            </ReviewDiv>
          ))
        )}
      </ReviewWrap>
      <ReviewButtonWrap>
        <ReviewButton
          onClick={() => {
            navigate("/fishing/review/insert", { state: { fishingsDetail } });
          }}
        >
          리뷰작성
        </ReviewButton>
      </ReviewButtonWrap>
    </DownWrap>
  );
};

export default FishingReview;
