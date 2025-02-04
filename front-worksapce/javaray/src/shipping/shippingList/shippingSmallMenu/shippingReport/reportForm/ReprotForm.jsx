import Modal from "../../../../../Modal/Modal";
import {
  ReportBody,
  BtnCover,
  ReportButton,
  ReportSelect,
  ReportSelectCover,
  ReportTextarea,
  ReportTextareaCover,
  ReportTitle,
  ModalWrap,
  ReportBtnCover,
  CancelButton,
} from "./ReprotFormCss";

const ReportForm = () => {
  return (
    <>
        <ReportTitle>신고하기</ReportTitle>
      <ReportBody>
        <ReportSelectCover>
          <ReportSelect>
            <option value="1">무엇을 신고하시겠습니까</option>
            <option value="2">골라 골라 흔히 오는 기회가 아니야</option>
          </ReportSelect>
        </ReportSelectCover>
        <ReportTextareaCover>
          <ReportTextarea />
        </ReportTextareaCover>
        <BtnCover>
          <ReportBtnCover>
            <CancelButton>취소하기</CancelButton>
          </ReportBtnCover>
          <ReportBtnCover>
            <ReportButton>신고하기</ReportButton>
          </ReportBtnCover>
        </BtnCover>
        </ReportBody>
    </>
  );
};

export default ReportForm;
