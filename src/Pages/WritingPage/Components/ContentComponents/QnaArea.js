import { useState, useEffect } from "react";
import styled from "styled-components";
import DropdownQuestion from "../DropdownQuestion";
import DropdownTag from "../DropdownTag";
import { getAllTagAndQuestionAPI } from "../../../../Axios/StoredTagInfoApi";
import {TextAreaWidth} from "./LowerArea";

const QnaArea = () => {
  const [experienceSections, setExperienceSections] = useState([
    {
      id: 1,
      selectedTag: "",
      selectedQuestion: "",
      questionOptions: [],
    },
  ]);

  const [tagAndQuestion, setTagAndQuestion] = useState([]);

  const tagKeywords = [
    "도전경험",
    "어려움경험",
    "실패경험",
    "성공경험",
    "배움경험",
  ];

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

  // 태그 선택 핸들러
  const handleTagSelectInSection = (tagName, id) => {
    console.log(`Tag selected: ${tagName} for section id: ${id}`);

    const updatedSections = experienceSections.map((section) => {
      if (section.id === id) {
        const selectedTag = tagAndQuestion.find(
          (tag) => tag.tag_name === tagName
        );
        // 태그가 바뀔 때 선택된 질문 초기화
        const selectedQuestion = selectedTag ? selectedTag.questions[0] : "";
        return {
          ...section,
          selectedTag: tagName,
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

  // 경험 섹션 추가
  const addExperienceSection = () => {
    setExperienceSections([
      ...experienceSections,
      {
        id: experienceSections.length + 1,
        selectedTag: "",
        selectedQuestion: "",
        questionOptions: [],
        isTagOpen: false,
        isQuestionOpen: false,
      },
    ]);
  };
  return (
    <>
      {experienceSections.map((section) => (
        <QuestionArea key={section.id}>
          <SelectArea>
            <DropdownTag
              options={tagKeywords}
              onSelect={(tagName) =>
                handleTagSelectInSection(tagName, section.id)
              }
            />
            <DropdownQuestion
              options={section.questionOptions}
              onSelect={(question) =>
                handleQuestionSelectInSection(question, section.id)
              }
              tagName={section.selectedTag}
            />
          </SelectArea>
          <TextAreaWidth height="200px"/>
        </QuestionArea>
      ))}

      {/* 경험 추가 버튼 */}
      <AddButton onClick={addExperienceSection}>+ 경험 추가</AddButton>
    </>
  );
};

const QuestionArea = styled.div``;

const SelectArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  justify-content: space-between;
  width: 840px;

  margin-top: 49px;
  margin-bottom: 9px;
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

  margin-top: 29px;
`;

export default QnaArea;
