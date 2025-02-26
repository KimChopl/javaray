import React, { useEffect, useState } from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { MainPageDiv, ProductDiv } from "./WelcomPage";
import ShippingList from "../shipping/shippingList/ShippingList";
import FishingListComponent from "../fishing/FishingList/FishingListComponent/FishingListComponent";
import { Load } from "../shipping/shippingDetail/ShippingDetailCss";
import FundingListComponent from "../Funding/FundingList/FundingListComponent/FundingListComponent";

export const CarouselWithIndicatorsExample = () => {
  const [fishings, setFishings] = useState({});
  const [fundings, setFundings] = useState({});
  const [shippings, setShippings] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [isLoad, setIsLooad] = useState(true);
  const getRemainDate = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);

    const diffTime = end.getTime() - today.getTime();

    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return remainingDays > 0 ? `${remainingDays}일 남음` : "마감됨";
  };
  useEffect(() => {
    axios.get('http://localhost/main').then(response => {
      console.log(response.data)
      setFishings(response.data.fishings);
      setFundings(response.data.fundings);
      setShippings(response.data.shippings);
      setIsLooad(false)
    }).catch();
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  const opacity = Math.max(1 - scrollY / 1200, 0);
  if(isLoad){
    return <Load />
  }
  return (
    <div className="relative h-[400vh]">
      <CCarousel controls indicators style={{
          opacity: opacity,
        }}>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="https://pimg.mk.co.kr/meet/neds/2021/02/image_readtop_2021_710048_16444619794726838.jpg"
            alt="slide 1"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="./DSC07081.jpg"
            alt="slide 2"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage
            className="d-block w-100"
            src="./DSC07181.jpg"
            alt="slide 3"
          />
        </CCarouselItem>
      </CCarousel>
      <MainPageDiv style={{margin:"auto"}}>
        <ProductDiv style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <FundingListComponent boards={fundings} getRemainDate={getRemainDate}/>
        </ProductDiv>
        <ProductDiv>
          <FishingListComponent fishings={fishings} />
        </ProductDiv>
        <ProductDiv style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <ShippingList data={shippings} setData={setShippings}/>
        </ProductDiv>
      </MainPageDiv>
    </ div>
  );
};
