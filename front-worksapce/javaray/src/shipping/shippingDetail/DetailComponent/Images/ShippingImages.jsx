import { useState } from "react";
import { ImageBox, ImageCover } from "../../ShippingDetailCss"

export const ShippingImages = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    return(
        <ImageCover onClick={nextImage}>
            {images.length > 0 ? (
            <ImageBox
                src={`http://${images[currentIndex].imagePath}${images[currentIndex].imageChangeName}`}
                alt="여러장 넣어야하는디"
            />
            ) : (
            <></>
            )}
        </ImageCover>
    )
}