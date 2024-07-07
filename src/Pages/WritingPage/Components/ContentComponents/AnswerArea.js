import { useState, useEffect } from "react";
import styled from "styled-components";

// 컴포넌트
import DropdownQuestion from "../DropdownQuestion";
import ExpTag from "../ExpTag";

// Api 문서
import { getAllTagAndQuestionAPI } from "../../../../Axios/StoredTagInfoApi";

// 리코일
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
  expTagSelectState
} from "../../../../Atom/ExpRecordAtom";


const AnswerArea = () => {
  // 리코일 변수
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );
    // 경험 태그 선택 상태 관리하는 리코일
    const [tagState, setTagState] = useRecoilState(expTagSelectState);

  // 경험 입력 영역 (리코일에 올라가기 전, 임시 변수)
  const [experienceSections, setExperienceSections] = useState([
    {
      id: 1,
      selectedTag: null,
      selectedQuestion: null,
      questionOptions: [],
      text: "",
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

  useEffect(() => {
    console.log (tagState);
  },[tagState]);

  // 태그 선택 핸들러
  const handleTagSelectInSection = (index, id) => {
    const tagId = index;
    console.log(`TagId selected: ${tagId} for section id: ${id}`);

    const updatedSections = experienceSections.map((section) => {
      if (section.id === id) {
        const selectedTag = tagAndQuestion[tagId];
        // 태그가 바뀔 때 선택된 질문 초기화
        const selectedQuestion = selectedTag ? selectedTag.questions[0] : "";
        return {
          ...section,
          selectedTag: tagId,
          questionOptions: selectedTag ? selectedTag.questions : [],
          selectedQuestion: "",
        };
      }

      return section;
    });

    setExperienceSections(updatedSections);
  };

  // 질문 선택 핸들러
  const handleQuestionSelectInSection = (question, id) => {
    console.log(`Question selected: ${question} for section id: ${id}`);
    const updatedSections = experienceSections.map((section) =>
      section.id === id
        ? { ...section, selectedQuestion: question, isQuestionOpen: false }
        : section
    );
    setExperienceSections(updatedSections);
  };

  return (
    <>
      <Guide>* 경험태그 선택 후, 질문을 선택해 주세요.</Guide>
      {/* 한 세트 */}
      {experienceSections.map((section) => (
        <div key={section.id}>
          {console.log(section.questionOptions)}

          {/* 선택하는 부분 */}
          <SelectArea>
            <ExpTag
              onSelect={(index) => handleTagSelectInSection(index, section.id)}
            />
            <DropdownQuestion
              options={section.questionOptions}
              onSelect={(question) =>
                handleQuestionSelectInSection(question, section.id)
              }
            />
          </SelectArea>
          {/* 답변란 */}
          <TextAreaWidth />
        </div>
      ))}
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

  background-color: ${(props) => props.theme.color.base1};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;

  &::placeholder {
    color: ${(props) => props.theme.color.base3};
  }
`;
export default AnswerArea;
