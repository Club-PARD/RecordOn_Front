import { useState, useEffect } from "react";
import styled from "styled-components";

// 컴포넌트
import DropdownQuestion from "../DropdownQuestion";
import ExpTag from "../ExpTag";
import { ReactComponent as DeleteIcon } from "../../../../Assets/DeleteButton.svg";

// Api 문서
import { getAllTagAndQuestionAPI } from "../../../../Axios/StoredTagInfoApi";

// 리코일
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
  expTagSelectState,
  questionSelectState,
} from "../../../../Atom/ExpRecordAtom";

const AnswerArea = () => {
  // 리코일 변수
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );
  const [questionState, setQuestionState] = useRecoilState(questionSelectState);

  // 경험 입력 영역 (리코일에 올라가기 전, 임시 변수)
  const [experienceSections, setExperienceSections] = useState([
    {
      id: 0,
      selectedTag: null,
      selectedQuestion: null,
      questionOptions: [],
      text: "",
      isTagSelected: false, //true일 경우, 질문 드롭다운 스타일이 달라짐
      isQuestionOpen: false, // true일 경우, 질문 드롭다운이 내려옴
      isQuestionSelected: false, // true일 경우, textarea 배경색이 달라짐.
    },
  ]);
  // 서버에서 받아온 태그와 질문
  const [tagAndQuestion, setTagAndQuestion] = useState([]);

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

  // 경험 섹션 추가
  const addExperienceSection = () => {
    const newSectionId = experienceSections.length;
    setExperienceSections((prevSections) => [
      ...prevSections,
      {
        id: newSectionId,
        selectedTag: null,
        selectedQuestion: null,
        questionOptions: [],
        text: "",
        isTagSelected: false, //true일 경우, 질문 드롭다운 스타일이 달라짐
        isQuestionOpen: false, // true일 경우, 질문 드롭다운이 내려옴
        isQuestionSelected: false, // true일 경우, textarea 배경색이 달라짐.
      },
    ]);
  };

  // 경험 섹션 삭제
  const removeExperienceSection = (id) => {
    setExperienceSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
  };

  // 태그 선택 핸들러
  const handleTagSelectInSection = (index, id) => {
    const tagId = index;
    console.log(`TagId selected: ${tagId} for section id: ${id}`);

    const updatedSections = experienceSections.map((section) => {
      if (section.id === id) {
        // 이미 선택된 태그인 경우 선택 해제
        if (section.selectedTag === tagId) {
          return {
            ...section,
            selectedTag: null,
            questionOptions: [],
            selectedQuestion: null,
            isTagSelected: false,
          };
        }

        // 새로운 태그를 선택한 경우
        return {
          ...section,
          selectedTag: tagId,
          questionOptions: tagId ? tagAndQuestion[tagId].questions : [],
          selectedQuestion: null,
          isTagSelected: true,
        };
      }

      return section;
    });

    setExperienceSections(updatedSections);
  };

  // 질문 선택 핸들러
  const handleQuestionSelectInSection = (questionId, id) => {
    console.log(`QuestionId selected: ${questionId} for section id: ${id}`);
    const updatedSections = experienceSections.map((section) =>
      section.id === id
        ? { ...section, selectedQuestion: questionId, isQuestionOpen: false }
        : section
    );
    setExperienceSections(updatedSections);
  };

  return (
    <>
      <Guide>* 경험태그 선택 후, 질문을 선택해 주세요.</Guide>
      {/* 한 세트 */}
      {experienceSections.map((section) => (
        <SectionWrapper key={section.id}>
          {/* 삭제 버튼 */}
          {section.id !== 0 && (
            <DeleteButtonWrapper>
              <StyledHr />
              <DeleteButton onClick={() => removeExperienceSection(section.id)}>
                하단 경험질문 삭제
                <DeleteIcon />
              </DeleteButton>
            </DeleteButtonWrapper>
          )}
          {/* 선택하는 부분 */}
          <SelectArea>
            <ExpTag
              onSelect={(index) => handleTagSelectInSection(index, section.id)}
            />
            <DropdownQuestion
              isTagSelected={section.isTagSelected}
              options={section.questionOptions}
              onSelect={(questionId) =>
                handleQuestionSelectInSection(questionId, section.id)
              }
            />
          </SelectArea>
          {/* 답변란 */}
          <TextAreaWidth
            isQuestionClicked={questionState.isQuestionClicked}
          />{" "}
        </SectionWrapper>
      ))}

      {/* 경험 추가 버튼 */}
      <AddButton onClick={addExperienceSection}>+ 경험 추가</AddButton>
    </>
  );
};

const Guide = styled.div`
  align-self: flex-start;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  color: ${(props) => props.theme.color.main};

  margin-top: 80px;
  margin-bottom: 16px;
`;

const SelectArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;

  width: 840px;
`;

const TextAreaWidth = styled.textarea`
  box-sizing: border-box;
  width: 840px;
  height: 150px;

  border-radius: 10px;

  padding: 22px 24px 31px 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  background-color: ${({ isQuestionClicked, theme }) =>
    isQuestionClicked ? theme.color.base2 : theme.color.base1};
  resize: none;
  overflow-y: auto;

  line-height: 1.5;

  &::placeholder {
    color: ${(props) => props.theme.color.base3};
  }
`;

const StyledHr = styled.hr`
  width: 661px;
  height: 1px;
  border: 0;
  background-color: ${(props) => props.theme.color.main};
`;

const DeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 2;

  width: 162px;

  font-weight: ${(props) => props.theme.fontWeights.TextM};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  color: ${(props) => props.theme.color.main};

  cursor: pointer;
`;

const AddButton = styled.button`
  justify-content: center;
  width: 840px;
  height: 50px;

  border-radius: 10px;

  background-color: ${(props) => props.theme.color.base2};

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};

  cursor: pointer;

  margin-top: 9px;
`;

const SectionWrapper = styled.div`
  /* margin-bottom: 24px; */
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 840px;

  margin-top: 59px;
  margin-bottom: 24px;
`;

export default AnswerArea;
