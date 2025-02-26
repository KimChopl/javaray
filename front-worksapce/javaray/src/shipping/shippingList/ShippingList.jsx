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
import { ListCover } from "../ShippingCss";

const ShippingList = ({ setData, data, user }) => {
  const navi = useNavigate();
  return (
    <ListCover>
      {data.map((datas) => {
        return (
          <StyledShipDiv key={datas.shippingNo}>
            <ShippingSmallMenu
              data={data}
              setData={setData}
              user={user}
              shippingNo={datas.shippingNo}
            />
            <ShippingToDetail
              onClick={() => navi(`/shipping/detail/${datas.shippingNo}`)}
            >
              <StyledShipImgCover>
                {datas.images[0] ? (
                  <StyledShipImage
                    src={`http://${datas.images[0].imagePath}${datas.images[0].imageChangeName}`}
                    alt={datas.imageOriginName}
                  />
                ) : (
                  <></>
                )}
              </StyledShipImgCover>
              <StyledShipTitleDiv>
                <span>{datas.shippingTitle}</span>
              </StyledShipTitleDiv>
              <StyledShipRatingCover>
                <StyledShipPersonDiv>
                  <StyledShipPersonSpan>
                    최대 탑승 인원 : {datas.allowPeopleNo}명
                  </StyledShipPersonSpan>
                </StyledShipPersonDiv>
                <StyledShipRatingDiv>
                  <StyledShipPersonSpan>
                    ⭐ : {datas.avgRating}
                  </StyledShipPersonSpan>
                </StyledShipRatingDiv>
              </StyledShipRatingCover>
              <StyledShipTitleDiv>
                인당 가격 : {datas.price}원
              </StyledShipTitleDiv>
            </ShippingToDetail>
          </StyledShipDiv>
        );
      })}
    </ListCover>
  );
};

export default ShippingList;
