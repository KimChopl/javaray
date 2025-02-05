import { useState } from "react";
import { SbTitle, SbTitleMenu, SbTitleMenuItem } from "./Sidebar.styles";

const Sidebar2 = () => {
  const menuItems = [
    "바다 예약내역",
    "민물 예약내역",
    "펀딩내역",
    "문의내역",
    "리뷰관리",
    "채팅하기",
    "개인정보수정",
    "찜하기",
    "업체관리",
    "신고관리",
  ];

  return (
    <div>
      <SbTitle>마이 자바</SbTitle>
      <SbTitleMenu>
        {menuItems.map((item, index) => (
          <SbTitleMenuItem key={index}>{item}</SbTitleMenuItem>
        ))}
      </SbTitleMenu>
    </div>
  );
};

export default Sidebar2;
