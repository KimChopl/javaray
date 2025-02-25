import { useEffect, useState } from "react";
import {
  CheckBox,
  FishDiv,
  FishLabel,
  SearchFish,
  SearchHeader,
  SearchWrap,
} from "./SearchFishCss";
import { Load } from "../../shipping/shippingDetail/ShippingDetailCss";
import axios from "axios";

const FishForm = (props) => {
  const [load, isLoad] = useState(true);
  const [fishs, setFishs] = useState([]);
  const fish = props.fishs;
  const checkedFish = (e) => {
    e.forEach((fishs) => {
      const findFish = fish.find((fish) => fish.fishNo === fishs.fishNo);
      if (findFish) {
        fishs.note = true;
      }
    });
    return fishs;
  };
  const changeFishs = (e) => {
    console.log(e.target.checked);
    const findFish = fishs.find((fishs) => fishs.fishNo === e.target.value);
    if (e.target.checked) {
      const newFish = fish.push({
        fishNo: findFish.fishNo,
        fishName: findFish.fishName,
      });
      props.setFish([...fish, newFish]);
      return (e.target.checked = true);
    } else {
      const deleteFish = fish.filter((fish) => {
        return fish.fishNo !== findFish.fishNo;
      });
      console.log(findFish.fishNo);
      console.log(deleteFish);
      props.setFish([...deleteFish], "fishs");
      return (e.target.checked = false);
    }
  };
  useEffect(() => {
    if (load) {
      axios
        .get("http://localhost/shippings/fishs")
        .then((response) => {
          setFishs(response.data);
          checkedFish(response.data);
          isLoad(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  if (load) {
    return <Load />;
  }
  return (
    <SearchWrap>
      <SearchHeader>
        <h2>어종 검색하기</h2>
      </SearchHeader>
      <SearchFish>
        {fishs.map((fishs) => (
          <FishDiv key={fishs.fishNo}>
            <CheckBox
              name="fishs"
              value={fishs.fishNo}
              checked={fishs.note}
              onChange={(e) => changeFishs(e)}
            />
            <FishLabel>{fishs.fishName}</FishLabel>
          </FishDiv>
        ))}
      </SearchFish>
    </SearchWrap>
  );
};

export default FishForm;
