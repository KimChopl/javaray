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
  const settingNote = (findFish, e) => {
    const newFishs = fishs.map((fish) =>
      fish.fishNo === findFish.fishNo ? { ...fish, note: e } : fish
    );
    setFishs(newFishs);
  };
  const changeFishs = (e) => {
    const findFish = fishs.find((fishs) => fishs.fishNo === e.target.value);
    if (e.target.checked) {
      const newFish = fish.push({
        fishNo: findFish.fishNo,
        fishName: findFish.fishName,
      });
      settingNote(findFish, true);
    } else {
      const deleteFish = fish.filter((fish) => {
        return fish.fishNo !== findFish.fishNo;
      });
      props.setFish([...deleteFish], "fishs");
      settingNote(findFish, false);
    }
  };
  useEffect(() => {
    if (load) {
      axios
        .get("http://localhost/shippings/fishs")
        .then((response) => {
          console.log(response);
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
