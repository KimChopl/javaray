import { FishTable, Td } from "../../ShippingDetailCss";

const DetailFish = ({clickModal, fishs}) => {
    return(
        <FishTable>
            <thead>
            <tr>
                <th colSpan={fishs.length}>
                낚시 가능 어종
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                {fishs.map((fish) => (
                <Td
                    key={fish.fishNo}
                    onClick={() => {
                    clickModal(true, fish.fishNo);
                    }}
                >
                    {fish.fishName} 
                </Td>
                ))}
            </tr>
            </tbody>
        </FishTable>
    )
}
export default DetailFish;