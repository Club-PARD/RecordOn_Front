import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as DropdownArrow } from "../../../Assets/DropdownArrow.svg";

const DropdownQuestion = ({ options, onSelect }) => {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  const toggleDropdown = () => {
    setIsQuestionOpen(!isQuestionOpen);
  };

  const handleSelect = (questionKeyword) => {
    onSelect(questionKeyword);
    setIsQuestionOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  return (
    <DropdownContainer>
      <SelectQuestion onClick={toggleDropdown}>
        <div>질문 선택</div>
        <DropdownArrow />
      </SelectQuestion>
      {isQuestionOpen && (
        <List>
          {options.map((questionKeyword) => (
            <ListItem key={questionKeyword} onClick={() => handleSelect(questionKeyword)}>
              {questionKeyword}
            </ListItem>
          ))}
        </List>
      )}
    </DropdownContainer>
  );
};
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: absolute;
  top: 115%;
  left: 0;
  width: 100%;
  height: 190px;
  z-index: 1000;

  border-radius: 5px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  background-color: ${(props) => props.theme.colors.White};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

const ListItem = styled.div`
  cursor: pointer;
`;

export default DropdownQuestion;
