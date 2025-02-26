import { LocationDiv, LocationP, LocationPepleDiv, PepleDiv, PepleInput } from "../../ShippingUpdateCss"

const UpdatePeople = ({allowPeopleNo, valueChange}) => {
    return(
        <LocationPepleDiv>
        <LocationDiv>
            <LocationP>예약 가능 인원</LocationP>
        </LocationDiv>
        <PepleDiv>
            <PepleInput
            type="number"
            value={allowPeopleNo}
            name="allowPeopleNo"
            onChange={valueChange}
            />
        </PepleDiv>
    </LocationPepleDiv>
        )
}

export default UpdatePeople;