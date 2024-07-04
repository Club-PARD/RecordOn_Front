import { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as GoBackIcon } from "../../Assets/GoBackIcon.svg";
import { ReactComponent as DropdownArrow } from "../../Assets/DropdownArrow.svg";
import Calendar from "../../Common/Calendar";
import { getAllTagAndQuestionAPI } from "../../Axios/StoredTagInfoApi";
import DropdownQuestion from "./Components/DropdownQuestion";
import DropdownTag from "./Components/DropdownTag";

const WritingPage = () => {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  // 당시 선택된 키워드
  const [selectedTagKeyword, setSelectedTagKeyword] = useState("");
  const [selectedQuestionKeyword, setSelectedQuestionKeyword] = useState("");

  // 서버에 전송할 키워드 배열
  const [selectedTagKeywordList, setSelectedTagKeywordList] = useState([]);
  const [selectedQuestionKeywordList, setSelectedQuestionKeywordList] =
    useState([]);

  // 서버에서 받아올 태그답변 JSON
  const [tagAndQuestion, setTagAndQuestion] = useState([]);

  const tagKeywords = ["성장", "갈등", "성공", "실패", "도전"];

  // 드롭다운 토글 상태 관리
  const toggleTag = () => setIsTagOpen(!isTagOpen);
  const toggleQuestion = () => {
    setIsQuestionOpen(!isQuestionOpen);
    console.log(isQuestionOpen);
  };

  // 서버에서 태그와 질문을 받아오는 API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTagAndQuestionAPI();
        console.log(response);
        setTagAndQuestion(response);
        console.log(tagAndQuestion);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //태그 선택 시 해당 태그 이름으로 질문 리스트 설정
  const handleTagSelect = (tagName) => {
    setSelectedTagKeyword(tagName);

    // 선택된 태그 이름에 맞는 질문 리스트 찾기
    const tagData = tagAndQuestion.find((item) => item.tag_name === tagName);
    if (tagData) {
      setSelectedQuestionKeywordList(tagData.questions);
    } else {
      setSelectedQuestionKeywordList([]);
    }
    setIsTagOpen(false);
  };

  // 질문 선택 시
  const handleQuestionSelect = (question) => {
    setSelectedQuestionKeyword(question);
    setIsQuestionOpen(false);
  };

  return (
    <Div>
      {/* 뒤로 가기 */}
      <GoBackArea>
        <MarginTopForGoBackDiv />
        <GoBackDiv>
          <GoBackIcon />
          <div>경험 기록 페이지 나가기</div>
        </GoBackDiv>
        <MarginBottomForGoBackDiv />
      </GoBackArea>

      {/* 내용 작성 부분 */}
      <ContentsArea>
        {/* 상단 데이터 */}
        <Upper>
          <UppderPart width={"842px"}>
            <StyledLabel>소제목</StyledLabel>
            <StyledInput
              type="text"
              placeholder="오늘의 프로젝트 경험은 어땠나요~?"
            />
          </UppderPart>

          <UppderPart width={"227px"}>
            <StyledLabel>경험한 날</StyledLabel>
            <Calendar />
          </UppderPart>
        </Upper>

        {/* 고정 질문 답변 영역 */}
        <FixedArea>
          <FixedAreaLabel>
            Q. 자자자 고정질문입니다 당신을 잘 돌아봐보시오 생각해봐라~~
          </FixedAreaLabel>
          <TextAreaWidth cols="100" rows="5.8" />
        </FixedArea>

        {/* 태그별 질문 답변 영역 */}
        <QuestionArea>
          <SelectArea>
            <DropdownTag
              isOpen={isTagOpen}
              toggleDropdown={toggleTag}
              options={tagKeywords}
              onSelect={handleTagSelect}
            />
            <DropdownQuestion
              isOpen={isQuestionOpen}
              toggleDropdown={toggleQuestion}
              options={selectedQuestionKeywordList}
              onSelect={handleQuestionSelect}
            />
          </SelectArea>
          <TextAreaWidth height="168px" cols="100" rows="6" />
        </QuestionArea>

        {/* 경험 추가 버튼 */}
        <AddButton>+ 경험 추가</AddButton>

        {/* 하단 데이터 */}
        <Lower>
          <FixedArea>
            <FixedAreaLabel>자유란</FixedAreaLabel>
            <TextAreaWidth cols="100" rows="6" />
          </FixedArea>
          <FixedArea>
            <FixedAreaLabel>관련 자료 링크</FixedAreaLabel>
            <TextAreaWidth cols="100" rows="1" />
          </FixedArea>
          <AddButtonWrapper>
            <AddButton>+ 관련 자료 추가</AddButton>
          </AddButtonWrapper>
        </Lower>
      </ContentsArea>

      <ConfirmButton>경험기록 작성완료</ConfirmButton>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GoBackArea = styled.div`
  position: fixed;
  top: 70;

  z-index: 9999;
  background-color: ${(props) => props.theme.colors.White};
`;

const MarginTopForGoBackDiv = styled.div`
  height: 46px;
  width: 1200px;

  background-color: ${(props) => props.theme.colors.White};
`;

const GoBackDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10.21px;

  background-color: ${(props) => props.theme.colors.White};

  margin-left: -1000px;

  cursor: pointer;

  div {
    font-weight: ${(props) => props.theme.fontWeights.TextM};
    font-size: ${(props) => props.theme.fontSizes.TextM};
    color: ${(props) => props.theme.colors.Charcoal};
  }
`;

const MarginBottomForGoBackDiv = styled.div`
  height: 42px;
  width: 1200px;
  background-color: ${(props) => props.theme.colors.White};
`;

const ContentsArea = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 153px;
`;

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin-bottom: 51px;
`;

const UppderPart = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  justify-content: space-between;

  width: ${({ width }) => width};
`;

const StyledLabel = styled.label`
  box-sizing: border-box;

  white-space: nowrap;
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  padding-left: 25px;

  width: 740px;
  height: 50px;

  border: 1px solid;
  border-color: ${(props) => props.theme.colors.Charcoal};
  border-radius: 5px;

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};
  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
    color: ${(props) => props.theme.colors.Charcoal};
  }
`;
const FixedArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  width: 840px;
`;

const QuestionArea = styled.div`
  margin-bottom: 29px;
`;

const FixedAreaLabel = styled.label`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const TextAreaWidth = styled.textarea`
  box-sizing: border-box;
  width: 840px;

  border: 1px solid;
  border-radius: 10px;

  padding: 22px 24px 31px 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;
`;

const SelectArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  justify-content: space-between;
  width: 840px;

  margin-top: 49px;
  margin-bottom: 9px;
`;

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 44px;
`;

const AddButtonWrapper = styled.div`
  margin-top: 29px;
  margin-bottom: 49px;
`;

const AddButton = styled.button`
  justify-content: center;
  width: 840px;
  height: 50px;

  border: 1px solid;
  border-radius: 10px;

  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  cursor: pointer;
`;

const ConfirmButton = styled.button`
  justify-content: center;

  width: 229px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.Black};

  color: ${(props) => props.theme.colors.White};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  margin-bottom: 136px;

  cursor: pointer;
`;

export default WritingPage;
