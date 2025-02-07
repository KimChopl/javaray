import { useState } from "react";
import Modal from "../../../../Modal/Modal";
import { Report } from "./ShippingReportCss";
const ShippingReport = ({ i }) => {
  const [flag, isFlag] = useState(false);
  const [kind, setKind] = useState("");
  const clickModal = (boolean, kind) => {
    isFlag(boolean);
    setKind(kind);
  };
  const closeModal = (e) => {
    isFlag(e);
    i(false);
  };

  return (
    <>
      <Report>
        <div>
          <label onClick={() => clickModal(true, "1")}>신고하기</label>
        </div>
        <div>
          <label onClick={() => clickModal(true, "2")}>삭제하기</label>
        </div>
      </Report>

      {flag && <Modal kind={kind} clickModal={closeModal} />}
    </>
  );
};

export default ShippingReport;
