import { useContext, useState } from "react";
import Modal from "../../../../Modal/Modal";
import { Report } from "./ShippingReportCss";
import { AuthContext } from "../../../../UseContext/Auth/AuthContext";
const ShippingReport = ({ i }) => {
  const [flag, isFlag] = useState(false);
  const [kind, setKind] = useState("");
  const { auth } = useContext(AuthContext);

  const clickModal = (boolean, kind) => {
    console.log(boolean);
    isFlag(boolean);
    //console.log(flag);
    setKind(kind);
    //console.log(kind);
  };
  const closeModal = (e) => {
    isFlag(e);
    i(false);
  };

  return (
    <>
      <Report>
        {auth.role === "ADMIN" ? (
          <div>
            <label onClick={() => clickModal(true, "2")}>삭제하기</label>
          </div>
        ) : (
          <div>
            <label onClick={() => clickModal(true, "1")}>신고하기</label>
          </div>
        )}
      </Report>

      {flag && <Modal kind={kind} clickModal={closeModal} />}
    </>
  );
};

export default ShippingReport;
