import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  DropdownContainer,
  StyledDropdownArrow,
  List,
  ListItem,
} from "./DropdownTag";
import {ReactComponent as QArrow} from "../../../Assets/QdropdownArrow.svg";

const DropdownQuestion = ({ options, onSelect, tagName }) => {
  // 드롭다운 열림 상태
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  // 선택된 질문을 저장하는 상태
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const toggleDropdown = () => {
    setIsQuestionOpen(!isQuestionOpen);
  };

  const handleSelect = (questionKeyword) => {
    setSelectedQuestion(questionKeyword);
    onSelect(questionKeyword);
    setIsQuestionOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  useEffect(() => {
    setSelectedQuestion("");
  }, [tagName]);

  return (
    <DropdownContainer>
      <SelectQuestion onClick={toggleDropdown}>
        {selectedQuestion ? (
          <>
            <div>{selectedQuestion}</div>
            <StyledDropdownArrow isOpen={isQuestionOpen} />
          </>
        ) : (
          <>
            <PreQuestion>Q. 질문을 선택해 주세요.</PreQuestion>
            <QArrow isOpen={isQuestionOpen} />
          </>
        )}
      </SelectQuestion>
      {isQuestionOpen && (
        <List>
          {options.map((questionKeyword) => (
            <ListItem
              key={questionKeyword}
              onClick={() => handleSelect(questionKeyword)}
            >
              {questionKeyword}
            </ListItem>
          ))}
        </List>
      )}
    </DropdownContainer>
  );
};

const SelectQuestion = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding-left: 24px;
  padding-right: 24px;

  width: 840px;
  height: 88px;

  border: 1px solid;
  border-radius: 5px;
  border-color: ${(props) => props.theme.colors.LightGray};

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};

  margin-bottom: 20px;

  cursor: pointer;
`;

const PreQuestion = styled.div`
  color: ${(props) => props.theme.colors.LightGray};

  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

export default DropdownQuestion;
