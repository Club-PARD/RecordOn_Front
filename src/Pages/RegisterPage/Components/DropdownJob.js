import React, { useState }from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as DropdownArrow } from "../../../Assets/DropdownArrow.svg";
import { ReactComponent as SmallCheck } from "../../../Assets/SmallCheck.svg";

const DropdownJob = ({options, onSelect}) => {
  // 드롭다운 열림 상태
  const [isJobOpen, setIsJobOpen] = useState(false);

  // 선택딘 태그를 저장하는 상태
  const [selectedJob, setSelectedJob] = useState("");

  const toggleDropdown = () => {
    setIsJobOpen(!isJobOpen);
  };
  
  const handleSelect = (jobKeywords) => {
    setSelectedJob(jobKeywords);
    onSelect(jobKeywords);
    setIsJobOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  
  // 호버 상태 관리
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <DropdownContainer>
      <SelectJob onClick={toggleDropdown}>
      {selectedJob ? (
          <>
            <div>{selectedJob}</div>
            <StyledDropdownArrow isOpen={isJobOpen} />
          </>
        ) : (
          <>
            <PlaceHolderDiv>희망직군 선택</PlaceHolderDiv>
            <StyledDropdownArrow isOpen={isJobOpen} />
          </>
        )}
      </SelectJob>
      {isJobOpen && (
        <List>
          {options.map((jobKeywords) => (
             <ListItemWrapper
             key={jobKeywords}
             onClick={() => handleSelect (jobKeywords)}
             onMouseEnter={() => setHoveredItem(jobKeywords)}
             onMouseLeave={() => setHoveredItem(null)}
            >
            <ListItem>{jobKeywords}</ListItem>
            <IconWrapper isVisible={hoveredItem === jobKeywords}>
                <SmallCheck />
              </IconWrapper>
            </ListItemWrapper>
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
  justify-content: start;
  position: absolute;
  align-items: start;
  padding-left: 13px;
  top: 160%;
  left: -13px;
  width: 215px;
  height: 160px;
  flex-shrink: 0;
  z-index: 1000;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 0px ${(props) => props.theme.colors.Black};

  background-color: ${(props) => props.theme.colors.White};
  

  animation: ${slideDown} 0.3s ease-out forwards;
`;

const ListItem = styled.div`
  padding: 5px;
  cursor: pointer;
  text-align: start;
`;

const ListItemWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 208px;
  height: 30px;
  flex-shrink: 0; 
  border-radius: 2px;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  font-smooth: antialiased;
  -webkit-font-smoothing: antialiased;
  line-height: 23.4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.base3};
  }
`;
const IconWrapper = styled.div`
  display: flex;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;

export default DropdownJob;
