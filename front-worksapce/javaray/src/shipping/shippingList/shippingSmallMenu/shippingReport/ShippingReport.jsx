import { useContext, useState } from "react";
import Modal from "../../../../Modal/Modal";
import { Report } from "./ShippingReportCss";
import { ModalContext } from "../../../../Modal/OpenOrCloseModal";
const ShippingReport = ({ i }) => {
  const { openModal, isModal, setIsModal } = useContext(ModalContext);
  const [flag, isFlag] = useState(false);
  const clickModal = (e) => {
    //openModal(e);
    console.log(e);
    isFlag(e);
  };
  const closeModal = (e) => {
    isFlag(e);
    i(false);
  };

  return (
    <>
      <Report>
        <div>
          <label onClick={(flag) => clickModal(true)}>신고하기</label>
        </div>
        <div>
          <label>삭제하기</label>
        </div>
      </Report>

      {flag && <Modal kind={"report"} clickModal={closeModal} />}
    </>
  );
};

export default ShippingReport;
