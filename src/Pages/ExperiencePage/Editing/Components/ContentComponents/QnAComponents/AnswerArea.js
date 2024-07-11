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
  handleExpRecordEditSubmit,
} from "../../../../../../Atom/ExpRecordAtom";

const AnswerArea = ({ combinedArray }) => {
  // 리코일 변수
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordEditSubmit
  );

  //임시 변수들
  // 별도의 배열로 관리하는 상태
  const [tagIds, setTagIds] = useState(
    combinedArray.map(([tagId]) => (tagId !== null ? tagId - 1 : null))
  );
  const [questionIds, setQuestionIds] = useState(
    combinedArray.map(([, questionId]) =>
      questionId !== null ? questionId - 26 : null
    )
  );
  const [questionAnswers, setQuestionAnswers] = useState(
    combinedArray.map(([, , , answer]) => answer || "")
  );

  // 경험 입력 영역 (리코일에 올라가기 전, 임시 변수)
  const [experienceSections, setExperienceSections] = useState([
    {
      id: 0,
      selectedTag: null,
      selectedQuestionId: null,
      selectedQuestionText: "",
      questionOptions: [],
      text: "",
      isTagSelected: false, //true일 경우, 질문 드롭다운 스타일이 달라짐
      isQuestionSelected: false, // true일 경우, textarea 배경색이 달라짐.
    },
  ]);

  // 서버에서 받아온 태그와 질문
  const [tagAndQuestion, setTagAndQuestion] = useState([]);

  // 태그와 질문 데이터가 로드된 후 경험 섹션 초기화
  useEffect(() => {
    if (tagAndQuestion.length > 0 && combinedArray.length > 0) {
      const initialExperienceSections = combinedArray.map(
        ([tagId, questionId, questionText, answer], index) => ({
          id: index,
          selectedTag: tagId !== null ? tagId - 1 : null,
          selectedQuestionIdId: questionId !== null ? questionId - 1 : null,
          selectedQuestionText: questionText !== "" ? questionText : "",
          questionOptions:
            tagId !== null && tagAndQuestion[tagId - 1]
              ? tagAndQuestion[tagId - 1].questions
              : [],
          text: answer || "",
          isTagSelected: tagId !== null,
          isQuestionSelected: questionId !== null,
        })
      );

      setExperienceSections(initialExperienceSections);
      setTagIds(
        combinedArray.map(([tagId]) => (tagId !== null ? tagId - 1 : null))
      );
      setQuestionIds(
        combinedArray.map(([, questionId]) =>
          questionId !== null ? questionId - 1 : null
        )
      );
      setQuestionAnswers(combinedArray.map(([, , , answer]) => answer || ""));
    }
  }, [tagAndQuestion, combinedArray]);

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      setExperience((prev) => ({
        ...prev,
        tag_ids: tagIds.map((tagId) => (tagId !== null ? tagId + 1 : tagId)),
        question_ids: questionIds.map((questionId) =>
          questionId !== null ? questionId + 1 : questionId
        ),
        question_answers: questionAnswers,
      }));
    }
  }, [isExpRecordSubmitted]);

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
        selectedQuestionIdId: null,
        selectedQuestionText: "",
        questionOptions: [],
        text: "",
        isTagSelected: false, //true일 경우, 질문 드롭다운 스타일이 달라짐
        isQuestionSelected: false, // true일 경우, textarea 배경색이 달라짐.
      },
    ]);

    setTagIds((prevTags) => [...prevTags, null]);
    setQuestionIds((prevQuestions) => [...prevQuestions, null]);
    setQuestionAnswers((prevTexts) => [...prevTexts, ""]);
  };

  // 경험 섹션 삭제
  const removeExperienceSection = (id) => {
    setExperienceSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );

    setTagIds((prevTags) => prevTags.filter((_, index) => index !== id));

    setQuestionIds((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== id)
    );

    setQuestionAnswers((prevTexts) =>
      prevTexts.filter((_, index) => index !== id)
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
            selectedQuestionId: null,
            selectedQuestionText: "",
            isTagSelected: false,
            isQuestionSelected: false,
          };
        }

        // 새로운 태그를 선택한 경우
        const newQuestionOptions = tagAndQuestion[tagId]
          ? tagAndQuestion[tagId].questions
          : [];

        return {
          ...section,
          selectedTag: tagId,
          questionOptions: newQuestionOptions,
          selectedQuestionId: null,
          selectedQuestionText: "",
          isTagSelected: true,
          isQuestionSelected: false,
        };
      }

      return section;
    });

    setExperienceSections(updatedSections);

    // 배열 업데이트
    setTagIds((prevTags) =>
      prevTags.map((tag, index) => (index === id ? tagId : tag))
    );
    setQuestionIds((prevQuestions) =>
      prevQuestions.map((question, index) => (index === id ? null : question))
    );
  };

  // 질문 선택 핸들러
  const handleQuestionSelectInSection = (questionId, questionText, id) => {
    console.log(`QuestionId selected: ${questionId} for section id: ${id}`);
    const updatedSections = experienceSections.map((section) =>
      section.id === id
        ? {
            ...section,
            selectedQuestionId: questionId,
            selectedQuestionText: questionText,
            isQuestionSelected: true,
          }
        : section
    );
    setExperienceSections(updatedSections);

    // 별도의 배열 업데이트
    setQuestionIds((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === id ? questionId : question
      )
    );
  };

  // 텍스트 변경 핸들러
  const handleTextChangeInSection = (text, id) => {
    const updatedSections = experienceSections.map((section) =>
      section.id === id ? { ...section, text } : section
    );
    setExperienceSections(updatedSections);

    // 별도의 배열 업데이트
    setQuestionAnswers((prevTexts) =>
      prevTexts.map((t, index) => (index === id ? text : t))
    );
  };

  useEffect(() => {
    console.log({
      tagIds,
      questionIds,
      questionAnswers,
    });
  }, [tagIds, questionIds, questionAnswers]);

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
              options={section.questionOptions}
              onSelect={(questionId) =>
                handleQuestionSelectInSection(questionId, section.id)
              }
              selectedTag={section.selectedTag}
              selectedQuestion={section.selectedQuestionText}
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
