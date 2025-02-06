import { useState } from "react";
import { SbTitle, SbTitleMenu, SbTitleMenuItem } from "./Sidebar.styles";
import { useNavigate } from "react-router-dom";

const Sidebar2 = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "바다 예약내역", path: "/shipping" },
    { name: "민물 예약내역", path: "/freshwater" },
    { name: "펀딩내역", path: "/funding" },
    { name: "문의내역", path: "/inquiries" },
    { name: "리뷰관리", path: "/reviews" },
    { name: "채팅하기", path: "/chat" },
    { name: "개인정보수정", path: "/profile" },
    { name: "찜하기", path: "/favorites" },
    { name: "업체관리", path: "/management" },
    { name: "신고관리", path: "/reports" },
  ];

  return (
    <div>
      <SbTitle>마이 자바 🎣 </SbTitle>
      <SbTitleMenu>
        {menuItems.map((item, index) => (
          <SbTitleMenuItem key={index} onClick={() => navigate(item.path)}>
            {item.name}
          </SbTitleMenuItem>
        ))}
      </SbTitleMenu>
    </div>
  );
};

export default Sidebar2;
