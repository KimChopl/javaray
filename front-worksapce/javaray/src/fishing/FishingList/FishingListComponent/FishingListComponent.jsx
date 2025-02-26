import { useNavigate } from "react-router-dom";
import { AddressP, FishingListBox, FishP, ImageDiv, InnerTextDiv, TextDiv, TitleP } from "../FishingList.styled";

const FishingListComponent = ({fishings}) => {
    const navigate = useNavigate();
    return(
        <>
        {fishings.map((fishing) => (
            <FishingListBox style={{display:"inline-block"}}
            onClick={() => navigate(`/fishing/detail/${fishing.fishingNo}`)}
            >
        <ImageDiv src={fishing.fishingFileUrl}></ImageDiv>
        <TextDiv>
            <InnerTextDiv>
            <TitleP>{fishing.fishingName}</TitleP>
            </InnerTextDiv>

            <InnerTextDiv>
            {fishing.fishList.map((fish) => {
                return <FishP>{fish.fishName}</FishP>;
            })}
            </InnerTextDiv>
            <InnerTextDiv>
            <AddressP>{fishing.address}</AddressP>
            </InnerTextDiv>
        </TextDiv>
        </FishingListBox>
    ))}
    </>
    )
}

export default FishingListComponent;