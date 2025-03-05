import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const ShippingBook = () => {
    const {shippingNo} = useParams();
    useEffect(() => {
        axios.get(`http://localhost/shipping-book/${shippingNo}`)
        .then((response) => console.log(response))
    })

    return(
        <>
        <>
        </>
        </>
    )
}

export default ShippingBook;
// 인원 날짜 유저 정보 (전화번호, 닉네임) 특이사항