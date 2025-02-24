import {
  Button,
  ContainerDiv,
  Form,
  Input,
  Label,
  MainContainer,
  TextArea,
  Title,
} from "./FundingGoodsInsert.styles";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../UseContext/Auth/AuthContext";
import axios from "axios";
import FundingGoodsOption from "./FundingGoodsOption";

const FundingGoodsForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [goodsTitle, setGoodsTitle] = useState("");
  const [goodsContent, setGoodsContent] = useState("");
  const [saleStartDate, setSaleStartDate] = useState();
  const [saleFinishDate, setSaleFinishDate] = useState();
  const [amountOfMoney, setAmountOfMoney] = useState();
  const [options, setOptions] = useState([]);
  const [optionNo, setOptionNo] = useState(0);
  const { auth } = useContext(AuthContext);
  const [mainFile, setMainFile] = useState(null);
  const [subFiles, setSubFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [boardNo, setBoardNo] = useState();

  useEffect(() => {
    axios
      .get("http://localhost/funding/selectCategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
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

  const handleSubFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 10 * 1024 * 1024;

    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        alert("허용되지 않는 파일 형식입니다.");
        return;
      }

      if (file.size > maxSize) {
        alert("파일의 크기가 너무 큽니다. 10MB이하로 선택해주세요.");
        return;
      }
    }

    setSubFiles(selectedFiles);
  };

  const handleInsertFundingGoods = (e) => {
    e.preventDefault();
    if (0 < optionNo) {
      const formData = new FormData();
      formData.append("nickName", auth.nickname);
      formData.append("categoryName", categoryName);
      formData.append("boardTitle", goodsTitle);
      formData.append("boardContent", goodsContent);
      formData.append("startDate", saleStartDate);
      formData.append("endDate", saleFinishDate);
      formData.append("purposeAmount", amountOfMoney);
      console.log(mainFile);
      console.log(subFiles);
      if (mainFile) {
        formData.append("mainFile", mainFile);
      }

      subFiles.forEach((file) => {
        formData.append("subFiles", file);
      });

      console.log(formData.get("nickName"));
      console.log(formData.get("categoryName"));
      console.log(formData.get("boardTitle"));
      console.log(formData.get("boardContent"));
      console.log(formData.get("startDate"));
      console.log(formData.get("endDate"));
      console.log(formData.get("purposeAmount"));
      console.log(formData.get("mainFile"));
      console.log(typeof saleStartDate);
      console.log(formData.get("subFiles"));

      if (mainFile) {
        const a = async () => {
          try {
            const response = await axios.post(
              "http://localhost/goods/insert",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${auth.accessToken}`,
                },
              }
            );
            console.log(response);
            console.log(response.data);
            setBoardNo(response.data);

            return response.data;
          } catch (error) {
            console.log(error);
          }
        };

        const b = async (boardNo) => {
          console.log(boardNo);
          const response = await axios
            .post(
              `http://localhost/goods/insert/options?boardNo=${boardNo}`,
              options,
              {
                headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
                },
              }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          return response;
        };

        const c = async () => {
          const boardNo = await a();
          await b(boardNo);
        };

        c();
      }
    } else {
      alert("옵션을 최소 한개를 선택하셔야합니다!");
      return;
    }
  };

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
              {Array.from({ length: 4 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}개
                </option>
              ))}
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
                {categories.map((category) => (
                  <option
                    key={category.categoryNo}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </option>
                ))}
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
                multiple
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
