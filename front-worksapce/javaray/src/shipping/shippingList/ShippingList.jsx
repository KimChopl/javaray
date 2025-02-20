import { useState } from "react";
import {
  StyledShipDiv,
  StyledShipImage,
  StyledShipImgCover,
  StyledShipPersonDiv,
  StyledShipPersonSpan,
  StyledShipRatingCover,
  StyledShipRatingDiv,
  StyledShipTitleDiv,
  ShippingToDetail,
} from "./shippingListCss";
import ShippingSmallMenu from "./shippingSmallMenu/ShippingSamllMenu";
import { useNavigate } from "react-router-dom";

const ShippingList = (props) => {
  const navi = useNavigate();
  const data = props.data;
  const user = props.user;
  return (
    <>
      <StyledShipDiv>
        <ShippingSmallMenu user={user} shippingNo={props.shippingNo} />
        <ShippingToDetail
          onClick={() => navi(`/shipping/detail/${data.shippingNo}`)}
        >
          <StyledShipImgCover>
            {data.images[0] ? (
              <StyledShipImage
                src={`http://${data.images[0].imagePath}${data.images[0].imageChangeName}`}
                alt={data.imageOriginName}
              />
            ) : (
              <></>
            )}
          </StyledShipImgCover>
          <StyledShipTitleDiv>
            <span>{data.shippingTitle}</span>
          </StyledShipTitleDiv>
          <StyledShipRatingCover>
            <StyledShipPersonDiv>
              <StyledShipPersonSpan>
                최대 탑승 인원 : {data.allowPepleNo}명
              </StyledShipPersonSpan>
            </StyledShipPersonDiv>
            <StyledShipRatingDiv>
              <StyledShipPersonSpan>⭐ : {data.avgRating}</StyledShipPersonSpan>
            </StyledShipRatingDiv>
          </StyledShipRatingCover>
          <StyledShipTitleDiv>인당 가격 : {data.price}원</StyledShipTitleDiv>
        </ShippingToDetail>
      </StyledShipDiv>
    </>
  );
};

export default ShippingList;
