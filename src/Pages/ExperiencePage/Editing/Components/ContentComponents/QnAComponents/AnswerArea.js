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
  isValidState,
  handleExpRecordEditSubmit,
  answerState,
  tempInputState,
} from "../../../../../../Atom/ExpRecordAtom";

const AnswerArea = () => {
  // 리코일 변수
  const [tempInput, setTempInput] = useRecoilState(tempInputState);
  const [answer, setAnswer] = useRecoilState(answerState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordEditSubmit
  );
  const [isValid, setIsValid] = useRecoilState(isValidState);

  // 서버에서 받아온 태그와 질문
  const [tagAndQuestion, setTagAndQuestion] = useState([]);
  // 경험 입력 영역 (리코일에 올라가기 전, 임시 변수)
  const [experienceSections, setExperienceSections] = useState([]);

  // 경험 섹션 초기값 설정
  useEffect(() => {
    if (answer && tagAndQuestion.length > 0) {
      const initialSections = answer.tag_ids.map((_, index) => ({
        id: index,
        selectedTag: answer.tag_ids[index] - 1,
        selectedQuestionText: answer.question_texts[index],
        selectedQuestionId: answer.question_ids[index] - 1,
        questionOptionIds:
          tagAndQuestion[answer.tag_ids[index] - 1]?.question_ids || [],
        questionOptionTexts:
          tagAndQuestion[answer.tag_ids[index] - 1]?.questions || [],
        text: answer.question_answers[index],
        isTagSelected: true, // true일 경우, 질문 드롭다운 스타일이 달라짐
        isQuestionSelected: true, // true일 경우, textarea 배경색이 달라짐
      }));

      setExperienceSections(initialSections);
      console.log("지금: ", initialSections);
    }
  }, [answer, tagAndQuestion]);

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
  const handleTagSelectInSection = (index, sectionId) => {
    const tagId = index;

    const updatedSections = experienceSections.map((section) => {
      if (section.id === sectionId) {
        // 이미 선택된 태그인 경우 선택 해제
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
          };
        }

        // 새로운 태그를 선택한 경우
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
        };
      }

      return section;
    });

    setExperienceSections(updatedSections);
    setTempInput({
      ...tempInput,
      tag_ids: (updatedSections.selectedTag)-1,
    })
  };
  // 질문 선택 핸들러
  const handleQuestionSelectInSection = (
    selectedQuestionId,
    selectedQuestionText,
    id
  ) => {
    const updatedSections = experienceSections.map((section) =>
      section.id === id
        ? {
            ...section,
            selectedQuestionId: selectedQuestionId,
            selectedQuestionText: selectedQuestionText,
            isQuestionSelected: true,
          }
        : section
    );
    setExperienceSections(updatedSections);
    setTempInput({
      ...tempInput,
      question_ids:(updatedSections.selectedQuestionId)-1,
    })
  };

  // 텍스트 변경 핸들러
  const handleTextChangeInSection = (text, id) => {
    const updatedSections = experienceSections.map((section) =>
      section.id === id ? { ...section, text } : section
    );
    setExperienceSections(updatedSections);
    setTempInput({
      ...tempInput,
      question_answers: updatedSections,
    })
  };

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      setTempInput((prev) => ({
        ...prev,
        tag_ids: experienceSections.map((section) =>
          section.selectedTag !== null ? section.selectedTag + 1 : null
        ),
        question_ids: experienceSections.map((section) =>
          section.selectedQuestionId !== null
            ? section.selectedQuestionId + 1
            : null
        ),
        question_answers: experienceSections.map((section) => section.text),
      }));
    }
  }, [isExpRecordSubmitted, experienceSections, setTempInput]);

  console.log("tempInput", tempInput);

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
              selectedTag={section.selectedTag}
            />
            <DropdownQuestion
              isTagSelected={section.isTagSelected}
              optionTexts={section.questionOptionTexts}
              optionIds={section.questionOptionIds}
              onSelect={(selectedQuestionId, selectedQuestionText) =>
                handleQuestionSelectInSection(
                  selectedQuestionId,
                  selectedQuestionText,
                  section.id
                )
              }
              selectedTag={section.selectedTag}
              selectedQuestionId={section.selectedQuestionId}
              selectedQuestionText={section.selectedQuestionText}
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
                ? "첫 번째 질문부터 답하면 작성하는 데 도움이 될거예요!"
                : ""
            }
          />{" "}
        </SectionWrapper>
      ))}

      {/* 경험 추가 버튼 */}
      <AddButton onClick={addExperienceSection}>+ 경험 추가</AddButton>
      {/* {console.log("지금찍어보는 겁니다: ", experience)} */}
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
      isQuestionSelected ? theme.color.base6 : theme.color.base3};
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
