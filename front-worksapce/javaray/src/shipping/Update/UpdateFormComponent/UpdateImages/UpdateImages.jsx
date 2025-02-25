import { useRef } from "react";
import { ImageBigDiv, InputImg, UploadImg } from "../../ShippingUpdateCss"
import { ShippingBeforeImage, ShippingNewImage } from "../ShippingImage"

const UpdateImages = ({info, images}) => {
    const inputFileRef = useRef(null);
    const {setFiles, setImageUrl, imageUrl, objectChange} = info;
    const uploadImg = (e) => {
        const fileList = Array.from(e.target.files);
        setFiles(fileList);
        const url = fileList.map((image) => URL.createObjectURL(image));
        setImageUrl([...imageUrl, ...url]);
      };
    
      const imgDivClick = () => {
        inputFileRef.current.click();
      };
    return (
        <ImageBigDiv>
            {images && (
            <ShippingBeforeImage
                image={images}
                setImage={objectChange}
            />
            )}
            <ShippingNewImage
            setFiles={setFiles}
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            />
            <UploadImg onClick={imgDivClick} />
            <InputImg
            type="file"
            multiple
            onChange={uploadImg}
            ref={inputFileRef}
            />
        </ImageBigDiv>
    )
}

export default UpdateImages;