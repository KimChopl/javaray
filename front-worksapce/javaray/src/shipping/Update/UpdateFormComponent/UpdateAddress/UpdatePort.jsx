import { useState } from "react";
import { LocationDiv, LocationP, LocationPepleDiv, SearchBtn, SearchFishDiv } from "../../ShippingUpdateCss"
import Modal from "../../../../Modal/Modal";

const UpdatePort = ({port, objectChange}) => {
    const [searchAddress, setSearchAddress] = useState(false);
    const isAddress = (e) => {
        setSearchAddress(e);
      };
    return(
        <>
        <LocationPepleDiv>
            <LocationDiv>
                {port && <LocationP>{port.address}</LocationP>}
            </LocationDiv>
            <SearchFishDiv>
                <SearchBtn onClick={() => isAddress(true)}>검색하기</SearchBtn>
            </SearchFishDiv>
        </LocationPepleDiv>
        {searchAddress && (
            <Modal
            clickModal={isAddress}
            setAddress={objectChange}
            kind={"searchAddress"}
            port={port}
            />
        )}
        </>
    )
}

export default UpdatePort;