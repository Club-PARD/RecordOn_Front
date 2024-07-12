import { useState, useEffect } from "react";
import styled from "styled-components";

// 컴포넌트
import DropdownQuestion from "./DropdownQuestion";
import ExpTag from "./ExpTag";
import { ReactComponent as DeleteIcon } from "../../../../../../Assets/DeleteButton.svg";

// Api 문서
import { getAllTagAndQuestionAPI } from "../../../../../../Axios/StoredTagInfoApi";

// 리코일
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
} from "../../../../../../Atom/ExpRecordAtom";

const AnswerArea = () => {
  // 리코일 변수
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );

  // 서버에서 받아온 태그와 질문
  const [tagAndQuestion, setTagAndQuestion] = useState([]);

  // 경험 입력 영역 (리코일에 올라가기 전, 임시 변수)
  const [experienceSections, setExperienceSections] = useState([
    {
      id: 0,
      selectedTag: null,
      selectedQuestionText: "",
      selectedQuestionId: null,
      questionOptionIds: [],
      questionOptionTexts: [],
      text: "",
      isTagSelected: false, //true일 경우, 질문 드롭다운 스타일이 달라짐
      isQuestionSelected: false, // true일 경우, textarea 배경색이 달라짐.
    },
  ]);

  // 태그 및 질문 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTagAndQuestionAPI();
        setTagAndQuestion(response);
      } catch (error) {
        // console.error(error);
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
        selectedQuestionText: "",
        selectedQuestionId: null,
        questionOptionIds: [],
        questionOptionTexts: [],
        text: "",
        isTagSelected: false,
        isQuestionSelected: false,
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
    const updatedSections = experienceSections.map((section) => {
      if (section.id === id) {
        if (section.selectedTag === tagId) {
          return {
            ...section,
            selectedTag: null,
            questionOptionIds: [],
            questionOptionTexts: [],
            selectedQuestionText: "",
            selectedQuestionId: null,
            isTagSelected: false,
            isQuestionSelected: false,
            text: "",
          };
        }

        const newQuestionOptionTexts = tagAndQuestion[tagId]?.questions || [];
        const newQuestionOptionIds = tagAndQuestion[tagId]?.question_ids || [];

        return {
          ...section,
          selectedTag: tagId,
          questionOptionTexts: newQuestionOptionTexts,
          questionOptionIds: newQuestionOptionIds,
          selectedQuestionText: "",
          selectedQuestionId: null,
          isTagSelected: true,
          isQuestionSelected: false,
          text: "",
        };
      }
      return section;
    });

    setExperienceSections(updatedSections);
  };

  // 질문 선택 핸들러
  const handleQuestionSelectInSection = (selectedQuestionId, id) => {
    const updatedSections = experienceSections.map((section) =>
      section.id === id
        ? {
          ...section,
          selectedQuestionId: selectedQuestionId,
          isQuestionSelected: true,
        }
        : section
    );
    setExperienceSections(updatedSections);
  };

  // 텍스트 변경 핸들러
  const handleTextChangeInSection = (text, id) => {
    const updatedSections = experienceSections.map((section) =>
      section.id === id ? { ...section, text } : section
    );
    setExperienceSections(updatedSections);
  };


  // 제출 처리
  useEffect(() => {
    if (isExpRecordSubmitted) {
      setExperience((prev) => ({
        ...prev,
        tag_ids: experienceSections.map((section) =>
          section.selectedTag !== null ? section.selectedTag + 1 : null
        ),
        question_ids: experienceSections.map((section) =>
          section.selectedQuestionId !== null
            ? section.selectedQuestionId
            : null
        ),
        question_answers: experienceSections.map((section) => section.text),
      }));
    }
  }, [isExpRecordSubmitted, experienceSections, setExperience]);

  return (
    <>
      <Guide>Tip. 각 경험태그의 첫 번째 질문부터 답하면 경험을 정리하는데 도움이 될거예요!</Guide>
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
              optionTexts={section.questionOptionTexts}
              optionIds={section.questionOptionIds}
              onSelect={(selectedQuestionId) =>
                handleQuestionSelectInSection(selectedQuestionId, section.id)
              }
              selectedTag={section.selectedTag}
            />
          </SelectArea>
          {/* 답변란 */}
          <TextAreaWidth
            isQuestionSelected={section.isQuestionSelected}
            value={section.text}
            onChange={(e) =>
              handleTextChangeInSection(e.target.value, section.id)
            }
            disabled={!section.isQuestionSelected}
            placeholder={
              section.id === 0
                ? "태그별 첫 번째 질문부터 답하면 작성하는 데 도움이 될거예요!"
                : "기록할수록 더욱 단단해지는 경험!"
            }
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

  background-color: ${({ isQuestionSelected, theme }) =>
    isQuestionSelected ? theme.color.base2 : theme.color.base1};
  resize: none;
  overflow-y: auto;

  line-height: 1.5;

  &::placeholder {
    color: ${({ isQuestionSelected, theme }) =>
    isQuestionSelected ? theme.color.base5 : theme.color.base3};
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
