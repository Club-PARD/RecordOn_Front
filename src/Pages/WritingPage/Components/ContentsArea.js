import { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "../../../Common/Calendar";
import DropdownQuestion from "./DropdownQuestion";
import DropdownTag from "./DropdownTag";
import { getAllTagAndQuestionAPI } from "../../../Axios/StoredTagInfoApi";

const ContentsArea = () => {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [experienceSections, setExperienceSections] = useState([
    { id: 1, selectedTag: "", selectedQuestion: "" },
  ]);
  const [selectedQuestionKeywordList, setSelectedQuestionKeywordList] =
    useState([]);
  const [tagAndQuestion, setTagAndQuestion] = useState([]);

  const tagKeywords = ["성장", "갈등", "성공", "실패", "도전"];

  // 서버에서 태그와 질문을 받아오는 API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTagAndQuestionAPI();
        setTagAndQuestion(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 드롭다운 토글 상태 관리
  const toggleTag = () => setIsTagOpen(!isTagOpen);
  const toggleQuestion = () => {
    setIsQuestionOpen(!isQuestionOpen);
  };

  // 태그 선택 핸들러
  const handleTagSelectInSection = (tagName, id) => {
    console.log(`Tag selected: ${tagName} for section id: ${id}`);

    // 선택된 태그에 따라 experienceSections 상태를 업데이트합니다.
    const updatedSections = experienceSections.map((section) =>
      section.id === id ? { ...section, selectedTag: tagName } : section
    );

    setExperienceSections(updatedSections);

    // 선택된 태그와 일치하는 질문 목록을 찾습니다.
    const selectedTag = tagAndQuestion.find((tag) => tag.tag_name === tagName);
    if (selectedTag) {
      // 해당 태그에 일치하는 질문들을 설정합니다.
      setSelectedQuestionKeywordList(selectedTag.questions);
    } else {
      // 해당 태그가 없으면 빈 질문 목록을 설정합니다.
      setSelectedQuestionKeywordList([]);
    }
  };

  //질문 선택 핸들러
  const handleQuestionSelectInSection = (question, id) => {
    console.log(`Question selected: ${question} for section id: ${id}`);

    // 선택된 질문에 따라 experienceSections 상태를 업데이트합니다.
    const updatedSections = experienceSections.map((section) =>
      section.id === id ? { ...section, selectedQuestion: question } : section
    );

    setExperienceSections(updatedSections);
  };

  const addExperienceSection = () => {
    setExperienceSections([
      ...experienceSections,
      {
        id: experienceSections.length + 1,
        selectedTag: "",
        selectedQuestion: "",
      },
    ]);
  };

  return (
    <>
      {/* 내용 작성 부분 */}
      {console.log(tagAndQuestion)}
      <ContentArea>
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
        {experienceSections.map((section) => (
          <QuestionArea key={section.id}>
            <SelectArea>
              <DropdownTag
                isOpen={isTagOpen}
                toggleDropdown={toggleTag}
                options={tagKeywords}
                onSelect={(tagName) =>
                  handleTagSelectInSection(tagName, section.id)
                }
              />
              <DropdownQuestion
                isOpen={isQuestionOpen}
                toggleDropdown={toggleQuestion}
                options={selectedQuestionKeywordList}
                onSelect={(question) =>
                  handleQuestionSelectInSection(question, section.id)
                }
              />
            </SelectArea>
            <TextAreaWidth height="168px" cols="100" rows="6" />
          </QuestionArea>
        ))}

        {/* 경험 추가 버튼 */}
        <AddButton onClick={addExperienceSection}>+ 경험 추가</AddButton>

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
      </ContentArea>
    </>
  );
};

const ContentArea = styled.div`
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

export default ContentsArea;
