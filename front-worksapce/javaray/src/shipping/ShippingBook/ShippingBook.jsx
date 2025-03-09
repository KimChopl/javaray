import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Calendar from "../../Calendar/Calendar";
import { AuthContext } from "../../UseContext/Auth/AuthContext";

const ShippingBook = () => {
    const [bookData, setBookData] = useState([]);
    const [people, setPeople] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [booker, setBooker] = useState({
        inPeople : 0,
        playDate : '',
        bookContent : '',
    })
    const {shippingNo} = useParams();
    const {auth} = useContext(AuthContext);
    const setInfo = (e, name) => {
        setBooker({
            ...booker,
            [name] : e.target.value
        })
    }
    const setPlayDate = (e, name) => {
        setBooker({
            ...booker,
            [name] : e
        })
    }
    const registBook = () => {
            axios.post(`http://localhost/shipping-book/${shippingNo}`, booker , {headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            }})
            .then((response) => {
                console.log(response)
                alert('등록 성공')
            })
            .catch((error) => {
                console.log(error)
            })
    }
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
        탑승 인원 : <input type="number" value={booker.inPeople} onChange={(e) => setInfo(e, "inPeople")}></input>
        <br />
        <Calendar data={{bookData, people, selectedDate, setSelectedDate, setPlayDate}}/>
        <br />
        선장님께 한마디 : <textarea value={booker.bookContent} onChange={(e) => setInfo(e, "bookContent")}></textarea>
        <div><button onClick={registBook}>예약하기</button></div>
        </>
        </>
    )
}

export default ShippingBook;
// 인원 날짜 유저 정보 (전화번호, 닉네임) 특이사항