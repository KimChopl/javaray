import React, { useState } from "react";

const AddressSearch = ({ onAddressSelect }) => {
  const [isAddressSearchOpen, setIsAddressSearchOpen] = useState(false);

  const openAddressSearch = () => {
    // 이미 주소 창이 열려있는 경우 두 번 열리지 않도록 설정
    if (isAddressSearchOpen) return;

    setIsAddressSearchOpen(true);

    // 카카오 주소 API 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          const fullAddress = data.address;
          // 주소가 선택되면, 부모 컴포넌트로 주소 전달
          onAddressSelect(fullAddress);
          setIsAddressSearchOpen(false); // 주소 선택 후 창 닫기
        },
      }).open();
    };
    document.body.appendChild(script);
  };

  return (
    <div>
      <button type="button" onClick={openAddressSearch}>
        주소 찾기
      </button>
    </div>
  );
};

export default AddressSearch;
