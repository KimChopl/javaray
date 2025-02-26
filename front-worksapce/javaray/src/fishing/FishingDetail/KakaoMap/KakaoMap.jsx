import React, { useEffect } from "react";
const { kakao } = window;

const FishingMap = (props) => {
  const { lat, lng } = { ...props };

  const script = document.createElement("script");

  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=fdec4b1211603b91d9e0b0325ab81159";
  script.async = true;

  document.head.appendChild(script);

  useEffect(() => {
    const container = document.getElementById(`fishing`);
    const options = {
      center: new kakao.maps.LatLng(
        lat ? lat : 33.450701,
        lng ? lng : 126.570667 //기본 위치 카카오본사사
      ),
      level: 5, //확대대
    };

    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });

    marker.setMap(map);
  }, [lat, lng]);

  return (
    <>
      <div id={`fishing`} style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};
export default FishingMap;
