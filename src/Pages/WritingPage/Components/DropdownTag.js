import React from "react";
import styled from "styled-components";
import { ReactComponent as DropdownArrow } from "../../../Assets/DropdownArrow.svg";

const DropdownTag = ({ isOpen, toggleDropdown, options, onSelect }) => {
  return (
    <DropdownContainer>
      <SelectExp onClick={toggleDropdown}>
        <div>경험태그</div>
        <DropdownArrow />
      </SelectExp>
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

export default DropdownTag;
