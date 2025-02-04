import { useContext, useState } from "react";
import Modal from "../../../../Modal/Modal";
import { Report } from "./ShippingReportCss";
import { ModalContext } from "../../../../Modal/OpenOrCloseModal";
const ShippingReport = () => {
    const {openModal, isModal} = useContext(ModalContext)
    const clickModal = (e) => {
        openModal(e)
    }
    const closeModal = (e) => {
        openModal(e);
    }
    return (
        <>
        <Report>
            <div>
                <label>신고하기</label>
            </div>
            <div>
                <label>삭제하기</label>
            </div>
        </Report>
        {isModal && <Modal kind={"report"} clickModal={closeModal}/>}
        </>
    )
}

export default ShippingReport;