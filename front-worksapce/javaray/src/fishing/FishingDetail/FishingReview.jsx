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

const FishingReview = () => {
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태 관리
  const navigate = useNavigate();

  // useEffect를 사용해 리뷰 데이터를 불러옴
  useEffect(() => {
    // 실제 API 요청이 있다면 fetch 또는 axios 사용 가능
    // 여기서는 임시 데이터로 설정
    const updateReviews = [
      { id: 1, nickname: "낚시왕", title: "좋은 낚시터", date: "2024-02-09" },
      {
        id: 2,
        nickname: "고기잡이",
        title: "고기가 많아요!",
        date: "2024-02-08",
      },
      { id: 3, nickname: "강태공", title: "분위기 최고!", date: "2024-02-07" },
      {
        id: 4,
        nickname: "물고기헌터",
        title: "낚시 도전기",
        date: "2024-02-06",
      },
      {
        id: 5,
        nickname: "조용한낚시꾼",
        title: "힐링됐어요",
        date: "2024-02-05",
      },
    ];

    setReviews(updateReviews); // 리뷰 데이터 업데이트
  }, []);

  return (
    <DownWrap>
      <ReviewWrap>
        {reviews.map((review) => (
          <ReviewDiv key={review.id}>
            <ReviewDivTop>
              <ReviewDivTopP>{review.nickname}</ReviewDivTopP>
            </ReviewDivTop>
            <ReviewDivMiddel></ReviewDivMiddel>
            <ReviewDivBottom>
              <ReviewTitle>
                <ReviewTitleP>{review.title}</ReviewTitleP>
              </ReviewTitle>
              <ReviewDate>
                <ReivewDateP>{review.date}</ReivewDateP>
              </ReviewDate>
            </ReviewDivBottom>
          </ReviewDiv>
        ))}
      </ReviewWrap>
      <ReviewButtonWrap>
        <ReviewButton onClick={() => navigate("/fishing/review/insert")}>
          리뷰작성
        </ReviewButton>
      </ReviewButtonWrap>
    </DownWrap>
  );
};

export default FishingReview;
