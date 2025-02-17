import styled from "styled-components";

export const TitleDiv = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
`;

export const TitleInput = styled.input`
  width: 40%;
  height: 34px;
  padding: 3px 40px 3px 40px;
  border: 1px solid #a4a4a4;
  border-radius: 8px;
  &:focus {
    border: 1px solid #33bfe8;
    outline: none;
    box-shadow: 1px 3px 5px rgba(51, 190, 232, 0.77);
  }
`;

export const ImageBigDiv = styled.div`
  width: 100%;
  min-height: 450px;
  height: auto;
  margin-top: 35px;
  vertical-align: top;
`;

export const ImageCover = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  display: inline-block;
`;

export const UploadImg = styled.div`
  width: 150px;
  height: 150px;
  margin: 10px;
  display: inline-block;
  border: 1px dashed #ccc;
  &:hover {
    cursor: pointer;
  }
`;

export const InputImg = styled.input`
  display: none;
`;

export const NoImageDiv = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const Images = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
`;

export const FishsDiv = styled.div`
  width: 100%;
  height: 80px;
  text-align: center;
`;

export const SearchFishDiv = styled.div`
  width: 120px;
  height: 55px;
  margin-left: 45px;
  margin-top: 12.5px;
  display: inline-block;
  vertical-align: top;
`;

export const SearchBtn = styled.button`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: rgb(83, 185, 216);
  border: none;
  &:hover {
    background-color: rgb(46, 159, 194);
    cursor: pointer;
  }
`;

export const ComplateBtn = styled.div`
  width: 150px;
  height: 60px;
  margin-left: 43%;
`;

export const FishsExDiv = styled.div`
  width: 100px;
  height: 50px;
  margin-top: 15px;
  margin-left: 30px;
  text-align: center;
  display: inline-block;
`;

export const DeleteFishs = styled.div`
  width: 10px;
  height: 10px;
  margin-left: 90px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;
export const DeleteImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const FishP = styled.p`
  display: block;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 15px;
  margin: 0;
`;

export const LocationAndPeple = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 25px;
`;
export const LocationPepleDiv = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
  display: inline-block;
  vertical-align: top;
`;

export const LocationDiv = styled.div`
  width: auto;
  height: 50px;
  min-width: 200px;
  max-width: 450px;
  margin-left: 35px;
  margin-top: 15px;
  display: inline-block;
`;

export const LocationP = styled.p`
  margin: 0;
  width: auto;
  height: 35px;
  min-width: 100px;
  font-size: 20px;
`;

export const PepleInput = styled.input`
  width: 120px;
  height: 30px;
  margin-top: 10px;
  padding: 3px 20px 3px 20px;
  border: 1px solid #a4a4a4;
  border-radius: 8px;
  &:focus {
    border: 1px solid #33bfe8;
    outline: none;
    box-shadow: 1px 3px 5px rgba(51, 190, 232, 0.77);
  }
`;

export const PepleDiv = styled.div`
  width: auto;
  height: 50px;
  min-width: 200px;
  max-width: 450px;
  margin-top: 15px;
  display: inline-block;
`;

export const OptionDiv = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
`;

export const OptionLine = styled.div`
  width: 370px;
  height: 105px;
  box-sizing: border-box;
  margin-left: 35%;
`;

export const OptionCover = styled.div`
  width: 70px;
  height: 45px;
  display: inline-block;
`;

export const Option = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 20px 0 20px;
  &:focus {
    border: 2px solid black;
  }
`;

export const OptionImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const OptionExpDiv = styled.div`
  width: 70px;
  height: 15px;
  text-align: center;
`;

export const OptionP = styled.p`
  width: 100%;
  height: 100%;
  font-size: 12px;
  display: block;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
  &:checked + Label {
    border: 1px solid black;
    margin: 1px;
    width: 72px;
    height: 47px;
  }
`;

export const Label = styled.label`
  width: 70px;
  height: 45px;
  margin: 2px;
`;

export const ContentDiv = styled.div`
  width: 100%;
  min-height: 400px;
  height: auto;
`;

export const ContentText = styled.textarea`
  width: 70%;
  min-height: 390px;
  height: auto;
`;
