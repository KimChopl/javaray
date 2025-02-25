import { useState } from "react";
import Modal from "../../../../Modal/Modal";
import { FishsDiv, SearchBtn, SearchFishDiv } from "../../ShippingUpdateCss";
import ShippingFish from "../Fish";

const UpdateFish = ({fishs, info}) => {
    const [searchFish, setSearchFish] = useState(false);
    const {objectChange} = info;
    const isFish = (e) => {
        setSearchFish(e);
      };
    return(
        <>
        <FishsDiv>
          {fishs &&
            fishs.map((fish) => {
                return (
                    <ShippingFish
                    setFish={objectChange}
                    fishs={fishs}
                    fish={fish}
                    />
                );
            })}
          <SearchFishDiv>
            <SearchBtn onClick={() => isFish(true)}>검색하기</SearchBtn>
          </SearchFishDiv>
        </FishsDiv>
        {searchFish && (
            <Modal
            clickModal={isFish}
            setFish={objectChange}
            kind={"searchFish"}
            selectedFish={fishs}
            />
        )}
        </>
    )
}
export default UpdateFish;