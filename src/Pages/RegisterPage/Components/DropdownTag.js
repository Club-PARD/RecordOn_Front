import React, { useState }from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as DropdownArrow } from "../../../Assets/DropdownArrow.svg";

const DropdownTag = ({options, onSelect }) => {
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
      <SelectJob onClick={toggleDropdown}>
      {selectedTag ? (
          <>
            <div>{selectedTag}</div>
            <StyledDropdownArrow isOpen={isTagOpen} />
          </>
        ) : (
          <>
            <PlaceHolderDiv>희망직군 선택</PlaceHolderDiv>
            <StyledDropdownArrow isOpen={isTagOpen} />
          </>
        )}
      </SelectJob>
      {isTagOpen && (
        <List>
          {options.map((tagKeyword) => (
            <ListItem alignItems={"start"} key={tagKeyword}
            onClick={() => handleSelect (tagKeyword)}>
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
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  font-size: ${(props) => props.theme.fontSizes.TextM};
`;

const StyledDropdownArrow = styled(DropdownArrow)`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
`;

const SelectJob = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  width: 202px;
  height: 19px;
  margin-top: 8px;
  line-height: 50px;
  color: ${(props) => props.theme.colors.Black};
  cursor: pointer;
`;

const PlaceHolderDiv = styled.div`
color: ${(props) => props.theme.colors.Gray};

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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  text-align: left;
  top: 160%;
  left: -13px;
  width: 228px;
  height: 160px;
  flex-shrink: 0;
  z-index: 1000;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 0px ${(props) => props.theme.colors.Black};

  background-color: ${(props) => props.theme.colors.White};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  animation: ${slideDown} 0.3s ease-out forwards;
`;

const ListItem = styled.div`
  padding: 5px;
  cursor: pointer;
  text-align: left;
`;

export default DropdownTag;
