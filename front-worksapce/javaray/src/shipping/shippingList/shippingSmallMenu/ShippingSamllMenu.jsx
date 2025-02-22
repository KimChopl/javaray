import { useContext, useEffect, useState } from "react";
import { CircleCover, CircleDiv, PositionDiv } from "./ShippingSmallMenuCss";
import ShippingReport from "./shippingReport/ShippingReport";
import { AuthContext } from "../../../UseContext/Auth/AuthContext";
import axios from "axios";

const TripleCircleDiv = () => {
  return (
    <>
      <CircleDiv />
      <CircleDiv />
      <CircleDiv />
    </>
  );
};

const ShippingSmallMenu = (props) => {
  const [displayDiv, setDisplayDiv] = useState(false);
  const [count, setCount] = useState(0);
  const data = props.data;
  const [user, setUser] = useState();
  const {auth} = useContext(AuthContext);
  const accessToken = auth.accessToken;
  const setData = (e) => {
    props.setData(e);
  }
  const onClickDiv = () => {
    setDisplayDiv(true);
    if(auth.isAuthenticated){

      axios.get('http://localhost/members/users', {
        headers : {
          Authorization : `Bearer ${accessToken}`
        }
      }).then(response =>{
        console.log(response)
        setUser(response.data)
      });
    }
  }
    

  const closeDiv = () => {
    setDisplayDiv(false);
  };
 

  return (
    <CircleCover>
      <PositionDiv onClick={!displayDiv ? onClickDiv : closeDiv}>
        <TripleCircleDiv />
      </PositionDiv>
      {displayDiv && (
        <ShippingReport
          shippingNo={props.shippingNo}
          i={setDisplayDiv}
          data={data}
          setData={setData}
          user={user}
        />
      )}
    </CircleCover>
  );
};

export default ShippingSmallMenu;
