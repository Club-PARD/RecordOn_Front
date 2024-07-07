import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

import { DropdownContainer } from "./DropdownTag";
import { ReactComponent as QArrow } from "../../../Assets/QdropdownArrow.svg";
import { ReactComponent as BigCheck } from "../../../Assets/BigCheck.svg";

const DropdownQuestion = ({ isTagSelected, options, onSelect }) => {
  // 드롭다운 열림 상태
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  // 선택된 질문을 저장하는 상태 (임시변수)
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // 호버 상태 관리
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleDropdown = () => {
    if (isTagSelected)
    setIsQuestionOpen(!isQuestionOpen);
  };

  const handleSelect = (question, index) => {
    setSelectedQuestion(question);
    console.log (question)
    onSelect(index);
    setIsQuestionOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  useEffect(() => {
    setIsQuestionOpen(false);
    setSelectedQuestion("");
  }, [isTagSelected]);

  return (
    <DropdownContainer>
      {console.log (isTagSelected)}
      <SelectQuestion onClick={toggleDropdown} isTagSelected={isTagSelected}>
        {selectedQuestion ? (
          <>
            <SelectedQuestion>{selectedQuestion}</SelectedQuestion>
            <StyledQArrow isTagSelected={isTagSelected} isOpen={isQuestionOpen} />
          </>
        ) : (
          <>
            <PreQuestion isTagSelected={isTagSelected}>
              Q. 질문을 선택해 주세요.
            </PreQuestion>
            <StyledQArrow isTagSelected={isTagSelected} isOpen={isQuestionOpen} />
          </>
        )}
      </SelectQuestion>
      {isQuestionOpen && (
        <List>
          {console.log (options)}
          {options.map((question, index) => (
            <ListItemWrapper
              key={index}
              onClick={() => handleSelect(question, index)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ListItem>{question}</ListItem>
              <IconWrapper isVisible={hoveredItem === index}>
                <BigCheck />
              </IconWrapper>
            </ListItemWrapper>
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
  border-color: ${(props) => (props.isTagSelected ? "none" : props.theme.color.base3)};
  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};

  box-shadow: ${(props) => (props.isTagSelected ? "1px 1px 3px 0px #00000033" : "none")};

  margin-bottom: 20px;

  cursor: pointer;
`;

const SelectedQuestion = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
  color: ${(props) => ( props.theme.color.black)};
  line-height: 31.2px;

`;
const PreQuestion = styled.div`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
  color: ${(props) => (props.isTagSelected ? props.theme.color.black : props.theme.color.base3)};
`;

const StyledQArrow = styled(QArrow)`
  stroke: ${(props) => (props.isTagSelected ? props.theme.color.black : props.theme.color.base3)};
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const List = styled.div`
  box-sizing: border-box;
  display: inline-block;
  flex-direction: column;
  gap: 3px;

  padding: 14px 11px 14px 14px;

  overflow-y: auto;
  height: 233px;

  position: absolute;
  top: 90%;
  left: 0;
  width: 100%;
  z-index: 1000;

  border-radius: 5px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  background-color: ${(props) => props.theme.colors.White};
  animation: ${slideDown} 0.3s ease-out forwards;
`;

const ListItemWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px 13px 10px 13px;
  width: 805px;

  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.TextXL};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  line-height: 31.2px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.base3};
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 714px;
  height: 60px;

  /* 조건부 스타일링 */
  ${(props) => {
    // 글자 수가 42자 이상인 경우 height를 80px으로 설정
    if (props.children && props.children.length > 42) {
      return css`
        height: 80px;
      `;
    }
  }}
`;

const IconWrapper = styled.div`
  display: flex;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;

export default DropdownQuestion;
