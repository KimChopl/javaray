import { useState } from "react";
import Modal from "../../../../Modal/Modal";
import { Report } from "./ShippingReportCss";
const ShippingReport = (props) => {
  const [flag, isFlag] = useState(false);
  const [kind, setKind] = useState("");
  const user = props.user;

  const clickModal = (boolean, kind) => {
    console.log(boolean);
    isFlag(boolean);
    //console.log(flag);
    setKind(kind);
    //console.log(kind);
  };
  const closeModal = (e) => {
    isFlag(e);
    props.i(false);
  };

  return (
    <>
      <Report>
        {user.role === "ROLE_ADMIN" ? (
          <div>
            <label onClick={() => clickModal(true, "2")}>삭제하기</label>
          </div>
        ) : (
          <div>
            <label onClick={() => clickModal(true, "1")}>신고하기</label>
          </div>
        )}
      </Report>

      {flag && (
        <Modal
          kind={kind}
          shippingNo={props.shippingNo}
          clickModal={closeModal}
        />
      )}
    </>
  );
};

export default ShippingReport;
