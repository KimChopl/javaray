import { useContext, useEffect, useState } from "react";
import {
  ReportBody,
  BtnCover,
  ReportButton,
  ReportSelect,
  ReportSelectCover,
  ReportTextarea,
  ReportTextareaCover,
  ReportTitle,
  ReportBtnCover,
  CancelButton,
  Hr,
} from "./ReprotFormCss";
import axios from "axios";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const ReportForm = ({ kind, shippingNo }) => {
  //const kind = props.kind;
  //const shippingNo = props.shippingNo;
  const [content, setContent] = useState();
  const { auth } = useContext(AuthContext);
  //const navi = useNavigate();
  const putContent = (e) => {
    setContent(e.target.value);
  };
  const report = () => {
    if (kind === "1") {
      //1이뭐임??
    } else {
      axios
        .delete(`http://localhost/manager/shippings`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
          data: { shippingNo: shippingNo, deleteReason: content },
        })
        .then(() => {
          alert("삭제가 완료 되었습니다.");
          window.location.reload(); // 좋지 않음
        });
    }
  };
  return (
    <>
      <ReportTitle>{kind === "1" ? "신고하기" : "삭제하기"}</ReportTitle>
      <Hr />
      <ReportBody>
        <ReportSelectCover>
          <ReportSelect>
            {kind === "1" ? (
              <>
                <option value="1">무엇을 신고하시겠습니까</option>
                <option value="2">골라 골라 흔히 오는 기회가 아니야</option>
              </>
            ) : (
              <>
                <option>삭제 사유</option>
              </>
            )}
          </ReportSelect>
        </ReportSelectCover>
        <ReportTextareaCover>
          <ReportTextarea value={content} onChange={putContent} />
        </ReportTextareaCover>
        <BtnCover>
          <ReportBtnCover>
            <CancelButton>취소하기</CancelButton>
          </ReportBtnCover>
          <ReportBtnCover>
            <ReportButton onClick={report}>
              {kind === "1" ? "신고하기" : "삭제하기"}
            </ReportButton>
          </ReportBtnCover>
        </BtnCover>
      </ReportBody>
    </>
  );
};

export default ReportForm;
