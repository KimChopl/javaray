import { useContext, useEffect, useState } from "react";
import { SearchHeader, SearchWrap } from "../SearchFish/SearchFishCss";
import {
  AddressBtn,
  AddressInput,
  AddressInputDiv,
  AddressSelect,
  Prot,
  ProtAddress,
  RegistBtn,
  ResultDiv,
  ResultPort,
} from "./SearchAddressCss";
import axios from "axios";
import { AuthContext } from "../../UseContext/Auth/AuthContext";

const SearchAddress = (props) => {
  const [option, setOption] = useState(1);
  const [inputVal, setInputVal] = useState("");
  const { auth } = useContext(AuthContext);
  const [port, setPort] = useState(null);
  const [selectPort, setSelectPort] = useState();
  const setAddress = (e) => {
    props.setAddress(e, "port");
  };
  const changeInput = (e) => {
    setInputVal(e.target.value);
  };
  const selectOption = (e) => {
    setOption(e.target.value);
  };
  const searchPort = () => {
    axios
      .get(
        `http://localhost/shippings/search/port?option=${option}&searchContent=${inputVal}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setPort(response.data);
      });
  };
  const registAddress = () => {
    setAddress(selectPort);
  };
  const clickModal = () => {
    props.clickModal(false);
  };
  const selectAddress = (e) => {
    console.log(props.address);
    let portNo = e.target.value;
    const select = port.filter((item) => item.portNo === portNo);
    setSelectPort(select[0]);
  };

  useEffect(() => {
    setSelectPort(props.address);
  }, []);
  return (
    <SearchWrap>
      <SearchHeader>
        <h2>주소 검색</h2>
      </SearchHeader>
      <AddressInputDiv>
        <AddressSelect onChange={selectOption}>
          <option value="1">항구검색</option>
          <option value="2">주소검색</option>
        </AddressSelect>
        <AddressInput type="text" value={inputVal} onChange={changeInput} />
        <AddressBtn onClick={searchPort}>검색</AddressBtn>
      </AddressInputDiv>
      <ResultDiv>
        {port ? (
          port.length > 0 ? (
            port.map((port) => (
              <ResultPort key={port.portNo}>
                <input
                  name="port"
                  type="radio"
                  value={port.portNo}
                  onChange={selectAddress}
                />
                <Prot>{port.address}</Prot>
                <ProtAddress>{port.detailAddress}</ProtAddress>
              </ResultPort>
            ))
          ) : (
            <ResultDiv>조회된 항목이 없습니다.</ResultDiv>
          )
        ) : (
          <></>
        )}
      </ResultDiv>
      <RegistBtn>추가하기</RegistBtn>
      <RegistBtn
        onClick={() => {
          registAddress();
          clickModal();
        }}
      >
        확정하기
      </RegistBtn>
    </SearchWrap>
  );
};

export default SearchAddress;
