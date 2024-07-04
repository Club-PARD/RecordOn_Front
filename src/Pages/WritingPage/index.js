import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as GoBackIcon } from "../../Assets/GoBackIcon.svg";
import { ReactComponent as DropdownArrow } from "../../Assets/DropdownArrow.svg";
import Calendar from "../../Common/Calendar";

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

  const tagKeywords = ["성장", "갈등", "성공", "실패", "도전"];
  const questionKeywords = ["A", "B", "C", "D"];

  // 드롭다운 토글 상태 관리
  const toggleTag = () => setIsTagOpen(!isTagOpen);
  const toggleQuestion = () => {
    setIsQuestionOpen(!isQuestionOpen);
    console.log(isQuestionOpen);
  };

  // 선택된 키워드들을 배열에 추가
  const addTagKeyword = (value) => () => {
    setSelectedTagKeywordList([...selectedTagKeyword, value]);
    setIsTagOpen(false);
    console.log(selectedQuestionKeywordList);
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
          <TextAreaWidth />
        </FixedArea>

        {/* 태그별 질문 답변 영역 */}
        <QuestionArea>
          <SelectArea>
            <ListContainer>
              <SelectExp onClick={toggleTag}>
                <div>경험태그</div>
                <DropdownArrow />
              </SelectExp>

              {isTagOpen && (
                <List>
                  {tagKeywords.map((tagKeyword) => (
                    <ListItem
                      onClick={() => addTagKeyword(tagKeyword)}
                      key={tagKeyword}
                    >
                      {tagKeyword}
                    </ListItem>
                  ))}
                </List>
              )}
            </ListContainer>

            <ListContainer>
              <SelectQuestion onClick={toggleQuestion}>
                <div>질문 선택</div>
                <DropdownArrow />
              </SelectQuestion>
              {isQuestionOpen && (
                <List>
                  {questionKeywords.map((questionKeyword) => (
                    <ListItem key={questionKeyword}>{questionKeyword}</ListItem>
                  ))}
                </List>
              )}
            </ListContainer>
          </SelectArea>
          <TextAreaWidth2 />
        </QuestionArea>

        {/* 경험 추가 버튼 */}
        <AddButton>+ 경험 추가</AddButton>

        {/* 하단 데이터 */}
        <Lower>
          <FixedArea>
            <FixedAreaLabel>자유란</FixedAreaLabel>
            <TextAreaWidth />
          </FixedArea>
          <FixedArea>
            <FixedAreaLabel>관련 자료 링크</FixedAreaLabel>
            <TextAreaWidth3 />
          </FixedArea>
          <AddButton>+ 경험 추가</AddButton>
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
  background-color: ${(props) => props.theme.colors.White};
`;

const MarginTopForGoBackDiv = styled.div`
  height: 46px;
  width: 1200px;
`;

const GoBackDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10.21px;

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

const QuestionArea = styled.div``;
const FixedAreaLabel = styled.label`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const TextAreaWidth = styled.textarea`
  box-sizing: border-box;
  width: 840px;
  height: 168px;

  border: 1px solid;
  border-radius: 10px;

  padding-top: 22px;
  padding-left: 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  line-height: ${(props) => props.theme.fontWeights.TextM};
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

const SelectExp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 126px;
  height: 50px;

  border: 1px solid;
  border-radius: 25px;

  line-height: 50px;
  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};

  cursor: pointer;
`;

const ListContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const ListItem = styled.div`
  cursor: pointer;
`;

const SelectQuestion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 704px;
  height: 50px;

  border: 1px solid;
  border-radius: 5px;
  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};

  cursor: pointer;
`;

const TextAreaWidth2 = styled.textarea`
  box-sizing: border-box;
  width: 840px;
  height: 200px;

  border: 1px solid;
  border-radius: 10px;

  padding-top: 22px;
  padding-left: 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  line-height: ${(props) => props.theme.fontWeights.TextM};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;
`;

const TextAreaWidth3 = styled.textarea`
  box-sizing: border-box;
  width: 840px;
  height: 86px;

  border: 1px solid;
  border-radius: 10px;

  padding-top: 22px;
  padding-left: 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  line-height: ${(props) => props.theme.fontWeights.TextM};
  resize: none;
  overflow-y: auto;

  line-height: 1.5;
`;
const Lower = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AddButton = styled.button`
  justify-content: center;
  width: 840px;
  height: 50px;

  border: 1px solid;
  border-radius: 10px;

  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  margin-top: 29px;
  margin-bottom: 44px;

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

  /* margin-top: 50px; */
  margin-bottom: 136px;

  cursor: pointer;
`;

export default WritingPage;
