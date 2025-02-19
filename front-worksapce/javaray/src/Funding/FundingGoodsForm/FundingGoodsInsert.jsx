import {
  Button,
  ContainerDiv,
  Form,
  Input,
  Label,
  MainContainer,
  OptionContainer,
  TextArea,
  Title,
} from "./FundingGoodsInsert.styles";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import axios from "axios";
import FundingGoodsOption from "./FundingGoodsOption";

const FundingGoodsForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [goodsTitle, setGoodsTitle] = useState();
  const [goodsContent, setGoodsContent] = useState();
  const [saleStartDate, setSaleStartDate] = useState();
  const [saleFinishDate, setSaleFinishDate] = useState();
  const [amountOfMoney, setAmountOfMoney] = useState();
  const [options, setOptions] = useState([]);
  const [optionNo, setOptionNo] = useState(0);
  const { auth } = useContext(AuthContext);
  const [mainFile, setMainFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/funding/selectCategory")
      .then((response) => {
        console.log(response);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setOptions(
      Array.from({ length: optionNo }, (_, index) => ({
        id: index + 1,
        title: "",
        content: "",
        price: "",
        count: "",
      }))
    );
  }, [optionNo]);

  const updateOption = (index, field, value) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index ? { ...option, [field]: value } : option
      )
    );
  };

  const handleCategory = (e) => {
    setCategoryName(e.target.value);
  };

  const handleOption = (e) => {
    setOptionNo(e.target.value);
  };

  const handleInsertFundingGoods = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(options);
  };

  const handleMainFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 10 * 1024 * 1024;

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert("허용되지 않는 파일 형식입니다.");
      return;
    }

    if (selectedFile && selectedFile.size > maxSize) {
      alert("파일의 크기가 너무 큽니다. 10MB이하로 선택해주세요.");
      return;
    }

    setMainFile(selectedFile);
  };

  const handleSubFileChange = (e) => {};

  const formData = new FormData();
  formData.append("nickname", auth.nickname);
  formData.append("categoryName", categoryName);
  formData.append("goodsTitle", goodsTitle);
  formData.append("goodsContent", goodsContent);
  formData.append("saleStartDate", saleStartDate);
  formData.append("saleFinishDate", saleFinishDate);
  formData.append("amountOfMoney", amountOfMoney);
  if (mainFile) {
    formData.append("mainFile", mainFile);
  }
  /*
  if(mainFile){
    axios.post("http://localhost/")
  }
*/
  return (
    <>
      <ContainerDiv>
        <Form onSubmit={handleInsertFundingGoods}>
          <MainContainer>
            <Title>상품등록</Title>
            <select
              id="select-box"
              value={optionNo}
              onChange={handleOption}
              style={{ textAlign: "center" }}
            >
              <option value="">-- 옵션 개수를 선택해주세요 --</option>
              <option value="1">1개</option>
              <option value="2">2개</option>
              <option value="3">3개</option>
              <option value="4">4개</option>
            </select>
            <br />
            <br />
            <div>
              <Label>작성자 ID</Label>
              <Input id="username" type="text" readOnly value={auth.nickname} />
            </div>
            <div>
              <label htmlFor="select-box">상품 카테고리 선택: </label>
              <br />
              <br />
              <select
                id="select-box"
                value={categoryName}
                onChange={handleCategory}
              >
                <option value="">선택해주세요</option>
                <option value="1">🈴전체</option>
                <option value="2">🎣낚시대</option>
                <option value="3">🦾릴</option>
                <option value="4">🧵낚시줄</option>
                <option value="5">🦺낚시의류</option>
              </select>
            </div>
            <br />
            <div>
              <Label htmlFor="categoryNo">상품카테고리</Label>
              <Input
                id="categoryNo"
                value={categoryName}
                type="text"
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="goodsTitle">상품 제목</Label>
              <Input
                id="goodsTitle"
                value={goodsTitle}
                onChange={(e) => setGoodsTitle(e.target.value)}
                type="text"
                required
                placeholder="내용을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="goodsContent">상품 설명</Label>
              <TextArea
                id="goodsContent"
                value={goodsContent}
                onChange={(e) => setGoodsContent(e.target.value)}
                required
                placeholder="설명을 입력하세요"
              ></TextArea>
            </div>
            <div>
              <Label htmlFor="saleStartDate" required>
                판매 시작 날짜
              </Label>
              <Input
                id="saleStartDate"
                value={saleStartDate}
                onChange={(e) => setSaleStartDate(e.target.value)}
                type="datetime-local"
              />
            </div>
            <div>
              <Label htmlFor="saleFinishDate" required>
                판매 종료 날짜
              </Label>
              <Input
                id="saleFinishDate"
                value={saleFinishDate}
                onChange={(e) => setSaleFinishDate(e.target.value)}
                type="datetime-local"
              />
            </div>
            <div>
              <Label htmlFor="amountOfMoney">목표 금액</Label>
              <Input
                id="amountOfMoney"
                value={amountOfMoney}
                onChange={(e) => setAmountOfMoney(e.target.value)}
                type="number"
                placeholder="금액을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="mainFile"> 메인 파일 첨부 :</label>
              <br />
              <input
                id="mainFile"
                type="file"
                accept="image/*"
                onChange={handleMainFileChange}
              />
            </div>
            <div>
              <label htmlFor="subFile"> 서브 파일 첨부 :</label>
              <br />
              <input
                id="subFile"
                type="file"
                accept="image/*"
                onChange={handleSubFileChange}
              />
            </div>
          </MainContainer>
          <div>
            {options.map((option, index) => (
              <FundingGoodsOption
                key={option.id}
                option={option}
                updateOption={(field, value) =>
                  updateOption(index, field, value)
                }
              />
            ))}
          </div>

          <Button type="submit">작성</Button>
        </Form>
      </ContainerDiv>
    </>
  );
};

export default FundingGoodsForm;
