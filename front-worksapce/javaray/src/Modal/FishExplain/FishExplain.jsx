import { useEffect, useState } from "react";
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
import axios from "axios";

const FishExplain = (props) => {
  const fishNo = props.fishNo;
  const [fish, setFish] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost/shippings/fish?fishNo=${fishNo}`)
      .then((response) => {
        console.log(response);
        setFish(response.data);
        setIsLoad(false);
      });
  }, []);
  if (isLoad) {
    return <></>;
  }
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
              <th>어종 이름</th>
              <FishThBorder>금어기 시작일</FishThBorder>
              <FishThBorder>종료일</FishThBorder>
              <FishThBorder>금지체장</FishThBorder>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{fish.fishName}</td>
              <FishTdBorder>
                {fish.startOutOfSeason ? fish.startOutOfSeason : "-"}
              </FishTdBorder>
              <FishTdBorder>
                {fish.startOutOfSeason ? fish.endOutOfSeason : "-"}
              </FishTdBorder>
              <FishTdBorder>
                {fish.defaultSize ? fish.defaultSize : "-"}
              </FishTdBorder>
            </tr>
          </tbody>
        </FishTable>
        <ExplainContentCover>
          <p>{fish.explaination}</p>
        </ExplainContentCover>
        <ExplainContentCover>
          <p>{fish.note}</p>
        </ExplainContentCover>
      </ExplainBody>
    </>
  );
};
export default FishExplain;
