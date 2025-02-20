import { ImageCover, Images } from "../ShippingUpdateCss";

export const ShippingBeforeImage = ({ image, setImage }) => {
  const deleteImage = (e) => {
    setImage((image) => image.filter((img) => img.imageNo !== e));
  };
  return (
    <>
      {image.length > 0 ? (
        image.map((img) => (
          <ImageCover
            key={img.imageNo}
            onClick={() => deleteImage(img.imageNo)}
          >
            <Images
              src={`http://${img.imagePath}${img.imageChangeName}`}
              alt={img.imageOriginName}
            />
          </ImageCover>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export const ShippingNewImage = ({ setImageUrl, setFiles, imageUrl }) => {
  const deleteNewImage = (e) => {
    setFiles((deleteImg) => deleteImg.filter((_, index) => index !== e));
    setImageUrl((prevURLs) => prevURLs.filter((_, index) => index !== e));
  };
  return (
    <>
      {imageUrl.length > 0 ? (
        imageUrl.map((url, index) => (
          <ImageCover key={index} onClick={() => deleteNewImage(index)}>
            <Images src={url} alt={`preview-${index}`} />
          </ImageCover>
        ))
      ) : (
        <></>
      )}
    </>
  );
};
