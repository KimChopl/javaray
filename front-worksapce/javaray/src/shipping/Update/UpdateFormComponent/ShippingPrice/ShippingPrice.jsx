import { PriceDiv, PriceInput, PriceP } from "../../ShippingUpdateCss";

const ShippingPrice = ({price, valueChange}) => {
    return(
        <PriceDiv>
            <PriceP>인당 탑승 인원</PriceP>
            <PriceInput
            type="number"
            value={price}
            name="price"
            onChange={valueChange}
            />
        </PriceDiv>
    )
}

export default ShippingPrice;