import { useState } from "react";
import { Report } from "./ShippingReportCss";
const ShippingReport = (props) => {
    
    const [deleteShipping, setDeleteShipping] = useState(false);
    const clickReort = () =>{
        props.a(true)
    }
    const clickDelete = () => {
        setDeleteShipping(true);
    }
    return (
        <>
        <Report>
            <div>
                <label onClick={clickReort}>신고하기</label>
            </div>
            <div>
                <label onClick={clickDelete}>삭제하기</label>
            </div>
        </Report>
        
        </>
    )
}

export default ShippingReport;