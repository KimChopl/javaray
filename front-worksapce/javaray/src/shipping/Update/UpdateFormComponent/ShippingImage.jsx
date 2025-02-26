import { ImageCover, Images } from "../ShippingUpdateCss";

export const ShippingBeforeImage = ({ image, setImage }) => {
  const deleteImage = (e) => {
    const newImage = image.filter((img) => img.imageNo !== e);
    setImage([...newImage], "images");
    console.log("이게머지?" + image);
  };
  return (
    <>
      {image.length > 0 ? (
        image.map((img) => (
          <ImageCover
            key={img.imageNo}
            onClick={() => deleteImage(img.imageNo)}
            name="images"
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
