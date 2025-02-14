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
  const setFish = (e) => {
    props.setFish(e);
  };
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
    const findFish = fishs.find((fishs) => fishs.fishNo === e.target.value);
    const newFish = fish.filter((fish) => fish.fishNo !== findFish.fishNo);
    if (fish.length === newFish.length) {
      fish.push({ fishNo: findFish.fishNo, fishName: findFish.fishName });
      setFish(fish);
    } else {
      const index = fishs.findIndex((e) => e.fishNo === findFish.fishNo);
      console.log(index);
      fishs[index].note = false;
      setFish(newFish);
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
              name="fish"
              value={fishs.fishNo}
              checked={fishs.note}
              onChange={changeFishs}
            />
            <FishLabel>{fishs.fishName}</FishLabel>
          </FishDiv>
        ))}
      </SearchFish>
    </SearchWrap>
  );
};

export default FishForm;
