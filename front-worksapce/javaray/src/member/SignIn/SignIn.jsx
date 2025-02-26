import { useContext, useEffect, useState } from "react";
import { CloseImg } from "../../Modal/ModalCss";
import { ModalBackground } from "../../shipping/ShippingCss";
import {
  CloseBtn,
  CloseDiv,
  ContentDiv,
  IdCover,
  InputCover,
  SignInWarp,
  TitleCover,
  ContentP,
  Input,
  SignInBtn,
  BtnCover,
  CloseModalBtn,
} from "./SignInCss";
import axios from "axios";
import { AuthContext } from "../../UseContext/Auth/AuthContext";

const SignIn = (props) => {
  const closeModal = () => {
    props.signinModal(false);
  };
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [able, setAlbe] = useState(true);
  const { signin } = useContext(AuthContext);
  const isAble = () => {
    if (id !== "" && pwd !== "") {
      setAlbe(false);
    } else {
      setAlbe(true);
    }
  };
  const settingId = (e) => {
    setId(e.target.value);
  };
  const settingPwd = (e) => {
    setPwd(e.target.value);
  };
  const sigin = () => {
    axios
      .post("http://localhost/members/login", {
        username: id,
        userPwd: pwd,
      })
      .then((response) => {
        console.log(response);
        const data = response.data;
        signin(
          data.nickname,
          data.tokens.accessToken,
          data.tokens.refreshToken
        );

        closeModal();
      })
      .catch((error) => {
        if (error.status === 400) {
          console.log(
            error.response.data
              ? error.response.data
              : error.response.data.username
              ? error.response.data.userPwd
              : null
          );
        } else {
          alert(error.response.data);
        }
      });
  };
  useEffect(() => {
    isAble();
  }, [id, pwd]);
  return (
    <ModalBackground>
      <SignInWarp>
        <CloseDiv>
          <CloseBtn onClick={closeModal}>
            <CloseImg
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX///8AAABjY2NmZmZcXFxgYGBYWFiOjo6RkZGVlZVbW1tRUVGKiopVVVWNjY0bGxsVFRVDf2CoAAADS0lEQVR4nO2dC4LbIAxEl3y6ybbb7f1P2yau29iBGNsIo/F7B4gspAEFY/H2BgAAAAAAAAAAAAAAAAAAAAAAAAAAdXj/XsnQ549KhkZcQjhVMXQO4b2KoRHX8IdDBUPHm6FrBUMj7g6GcDY3dOgMXcwNjbiEv3wzNnTqDVVO1Gv4h20UD/8NVY3ig4O2Wjw+Gqro4sBByyieh4aquXgJI6y0eBobqqTF69iuVaIenw1ViWLEQRsXIw5WWRefUtQqUZ9StFKi/ozbLT/dnFOGrGvUz5ThwokaTdE75uV+cmyLRvGQtFKh2E+PbjktJjRYPFMSpF0sFcV0BO0L/TvWI1wjSyawVUkdpU+QHuWP1b+ddrCKBu0fw17lmVhpsQEN2j7Kh1luLMAindJT2AYOWiRqQynaUXpa37RUi1N2zDcu1eKU1E0zy8SQcuPenAZ70lGcV900UarFSY/9nOmhkVLN7uHKDJMZ6xOsVKqbsXaSaHKZGLJuom+sVIuzJgrNLhNDlu+sNLxMDFkaCQca7FmmpkZLtThLouFEgz3zH9dRinbMrUyaLtXizHtkyy1JM+ZM/Q3+o88hX4vuNNiTO/1v/vJlOXmxcbZMDMnRl5tSLc70HOlWgz1TBZyrUi3O6xi51mDPKyfcp2hH2sUvDQdfJWo6us5ILwhxmi7V4qQTNYazFO1ILxrPuFkmhuRr0Z0Ge3Kj6DSCN/K06FKDPTkzqsNZ9JFpFxvesshjKlFdp2jHaxcFHHy9aLhdJoaki+1fWz9aGeRjKK9D+bl0ujZ1vh7K1zTydan8fwv5/4fy//Hl92nk99rk90vl97zl31vIv3uaOnTi/v3h9Dtgh0eFHpF/jy9/FiP3nIzb8zTyZ6Lkz7XJn02UP18qf0ZY/py3/Fl9+e8tli/gTpb+NY0CXGhR/ts1+e8P1/8Vary6kf8OWP5bbvnv8eV7Ksj3xZDvbSLfn0a+x5B8nyib8W5Ii/L92uR77sn3TZTvfSnfv9R+Z2XjvRv5PsLyvaD1+3nr92TX76u/g7sRdnC/xQ7uKNnBPTM7uCtoB/c97eDOror3rh03ieAN+bvzdnD/4Q7usAQAAAAAAAAAAAAAAAAAAAAAAAAA2CG/AbVnHk3h43u0AAAAAElFTkSuQmCC"
              alt=""
            />
          </CloseBtn>
        </CloseDiv>
        <TitleCover>
          <h2>로그인</h2>
        </TitleCover>
        <IdCover>
          <ContentDiv>
            <ContentP>아이디</ContentP>
          </ContentDiv>
          <InputCover>
            <Input type="text" value={id} onChange={settingId} />
          </InputCover>
        </IdCover>
        <IdCover>
          <ContentDiv>
            <ContentP>비밀번호</ContentP>
          </ContentDiv>
          <InputCover>
            <Input type="password" value={pwd} onChange={settingPwd} />
          </InputCover>
        </IdCover>
        <BtnCover>
          <CloseModalBtn onClick={closeModal}>취소하기</CloseModalBtn>
          <SignInBtn onClick={sigin} disabled={able}>
            로그인
          </SignInBtn>
        </BtnCover>
      </SignInWarp>
    </ModalBackground>
  );
};

export default SignIn;
