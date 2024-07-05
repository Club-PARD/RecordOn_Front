import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as DropdownArrow } from "../../../Assets/DropdownArrow.svg";

const DropdownTag = ({ options, onSelect }) => {
  // 드롭다운 열림 상태
  const [isTagOpen, setIsTagOpen] = useState(false);

  // 선택딘 태그를 저장하는 상태
  const [selectedTag, setSelectedTag] = useState("");

  const toggleDropdown = () => {
    setIsTagOpen(!isTagOpen);
  };

  const handleSelect = (tagKeyword) => {
    setSelectedTag(tagKeyword);
    onSelect(tagKeyword);
    setIsTagOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  return (
    <DropdownContainer>
      <SelectExp onClick={toggleDropdown}>
        {selectedTag ? (
          <>
            <div>{selectedTag}</div>
            <StyledDropdownArrow isOpen={isTagOpen} />
          </>
        ) : (
          <>
            <div>경험태그</div>
            <StyledDropdownArrow isOpen={isTagOpen} />
          </>
        )}
      </SelectExp>
      {isTagOpen && (
        <List>
          {options.map((tagKeyword) => (
            <ListItem
              alignItems={"center"}
              key={tagKeyword}
              onClick={() => handleSelect(tagKeyword)}
            >
              {tagKeyword}
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

const SelectExp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 126px;
  height: 50px;

  border: 1px solid;
  border-radius: 25px;

  line-height: 50px;
  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};

  cursor: pointer;
`;

const StyledDropdownArrow = styled(DropdownArrow)`
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
  align-items: flex-start;
  gap: 5px;
  padding: 17px 9px 17px 9px;

  overflow-y: auto;
  max-height: 190px;

  position: absolute;
  top: 115%;
  left: 0;
  width: 100%;
  z-index: 1000;

  border-radius: 5px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  background-color: ${(props) => props.theme.colors.White};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  animation: ${slideDown} 0.3s ease-out forwards;
`;

const ListItem = styled.div`
  display: flex;
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
  height: 28px;
  cursor: pointer;
`;

export default DropdownTag;
export { DropdownContainer, List, ListItem, StyledDropdownArrow };
