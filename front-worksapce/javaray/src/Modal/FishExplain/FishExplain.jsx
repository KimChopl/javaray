import {
  ExplainBody,
  ExplainContentCover,
  FishImage,
  FishTable,
  FishTdBorder,
  FishThBorder,
  FishTrBorder,
  ImageCover,
} from "./FishExplainCss";

const FishExplain = () => {
  return (
    <>
      <ExplainBody>
        <ImageCover>
          <FishImage
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAxMjJfNzcg%2FMDAxNzM3NTE3MTA1NjM4.mxWlr8mOW01ALw5QFJyHfMExu0Ns9WaxBJI4TJ0M69cg.b_62j5A8PtBuJ1IHDsnPIniBnlsrM6M31I8vl16Whdkg.PNG%2FIMG_1235.PNG&type=a340"
            alt="물고기고기"
          />
        </ImageCover>
        <FishTable>
          <thead>
            <tr>
              <th>이름</th>
              <FishThBorder>금어기 시작일</FishThBorder>
              <FishThBorder>종료일</FishThBorder>
              <FishThBorder>금지체장</FishThBorder>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>조피볼락(우럭)</td>
              <FishTdBorder>1월 1일</FishTdBorder>
              <FishTdBorder>12월 31일</FishTdBorder>
              <FishTdBorder>두흉갑장 9cm 이하</FishTdBorder>
            </tr>
          </tbody>
        </FishTable>
        <ExplainContentCover>
          <p>
            동경131도30분 이동수역은 6월 1일부터 10월 31일까지로 하고,
            북위38도34분09.68초와 강원특별자치도 고성군 현내면 지경리 해안선의
            교점, 북위38도34분09.69초와 동경128도30분06.89초의 교점,
            북위38도33분09.69초와 동경128도30분06.89초의 교점,
            북위38도33분09.69초와 강원특별자치도 고성군 현내면 저진리 해안선의
            교점을 차례대로 연결한 선 안의 해역에서는 4월 1일부터 7월 20일까지,
            10월 1일부터 11월 30일까지
          </p>
        </ExplainContentCover>
        <ExplainContentCover>
          <p></p>
        </ExplainContentCover>
      </ExplainBody>
    </>
  );
};
export default FishExplain;
