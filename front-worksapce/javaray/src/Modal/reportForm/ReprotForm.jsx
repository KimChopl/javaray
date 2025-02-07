import { useEffect, useState } from "react";
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

const ReportForm = (props) => {
  const kind = props.kind;
  const [content, setContent] = useState();
  const putContent = (e) => {
    setContent(e.target.value);
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
            <ReportButton>
              {kind === "1" ? "신고하기" : "삭제하기"}
            </ReportButton>
          </ReportBtnCover>
        </BtnCover>
      </ReportBody>
    </>
  );
};

export default ReportForm;
