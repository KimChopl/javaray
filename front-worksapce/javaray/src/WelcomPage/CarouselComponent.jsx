import React from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const CarouselWithIndicatorsExample = () => {
  return (
    <>
      <CCarousel controls indicators>
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
    </>
  );
};
