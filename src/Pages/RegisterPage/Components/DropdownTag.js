import React from "react";
import styled from "styled-components";
import { ReactComponent as DropdownArrow } from "../../../Assets/DropdownArrow.svg";

const DropdownTag = ({ isOpen, toggleDropdown, options, onSelect }) => {
  return (
    <DropdownContainer>
      <SelectJob onClick={toggleDropdown}>
        희망직군
        <DropdownArrow />
      </SelectJob>
      {isOpen && (
        <List>
          {options.map((tagKeyword) => (
            <ListItem key={tagKeyword} onClick={() => onSelect(tagKeyword)}>
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
  color: ${(props) => props.theme.colors.Gray};
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: absolute;
  top: 160%;
  left: -13px;
  width: 228px;
  height: 100px;
  z-index: 1000;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  background-color: ${(props) => props.theme.colors.White};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

const ListItem = styled.div`
  text-align: st;
  padding: 5px;
  cursor: pointer;
`;

export default DropdownTag;
