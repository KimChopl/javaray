import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Calendar from "../../Calendar/Calendar";

const ShippingBook = () => {
    const [bookData, setBookData] = useState([]);
    const [people, setPeople] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const {shippingNo} = useParams();
    useEffect(() => {
        axios.get(`http://localhost/shipping-book/${shippingNo}`)
        .then((response) => 
        {
            setBookData(response.data.bookInfo);
            setPeople(response.data.people)
            console.log(response.data.bookInfo)
        })
    }, [])

    return(
        <>
        <>
        <Calendar data={{bookData, people, selectedDate, setSelectedDate}}/>
        </>
        </>
    )
}

export default ShippingBook;
// 인원 날짜 유저 정보 (전화번호, 닉네임) 특이사항