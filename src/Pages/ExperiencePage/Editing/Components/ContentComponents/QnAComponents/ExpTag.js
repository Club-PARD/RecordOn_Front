import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as RightArrow } from "../../../../../../Assets/RightArrow.svg";

const ExpTag = ({ selectedTag, onSelect }) => {
  const keywords = [
    { id: 0, label: "도전", color: "#2ABCDC" },
    { id: 1, label: "어려움", color: "#FF971D" },
    { id: 2, label: "성공", color: "#4B9EFF" },
    { id: 3, label: "실패", color: "#F25454" },
    { id: 4, label: "배움", color: "#42B887" },
  ];

  // 선택된 경험 태그의 인덱스를 저장
  const [clickedButtonIndex, setClickedButtonIndex] = useState(selectedTag);

  useEffect(() => {
    setClickedButtonIndex(selectedTag);
  },[selectedTag]);

  const handleButtonClick = (index) => {
    if (clickedButtonIndex === index) {
      // 이미 선택된 태그를 다시 클릭한 경우
      setClickedButtonIndex(null);

    } else {
      // 새로운 태그를 선택한 경우
      setClickedButtonIndex(index);
  
    }
    console.log ("index: " + index);
    // onSelect에 현재 선택된 태그의 인덱스 전달
    onSelect(index);
  };

  return (
    <>
      <Div>
        {/* "경험태그 > " */}
        <TitleButton>
        <TitleDiv>경험태그<Asterisk>*</Asterisk></TitleDiv>
          <RightArrow />
        </TitleButton>

        {/* 키워드 버튼들 */}
        <Buttons>
          {keywords.map((keyword, index) => (
            <StyledButton
              key={index}
              onClick={() => handleButtonClick(index)}
              isClicked={clickedButtonIndex === index}
              color={keyword.color}
            >
              {keyword.label}
            </StyledButton>
          ))}
        </Buttons>
      </Div>
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 840px;
`;

const TitleButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 113px;

  font-size: ${(props) => props.theme.fontSizes.TextXL};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  color: ${(props) => props.theme.color.black};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  justify-content: center;
  width: 126px;
  height: 50px;

  border: 1.5px solid;
  border-radius: 25px;

  font-size: ${(props) => props.theme.fontSizes.TextL};
  font-weight: ${(props) => props.theme.fontWeights.TextL};
  cursor: pointer;

  //항상 맨 아래에 둬야 함!
  border-color: ${({ isClicked, color }) =>
    isClicked ? color : "${(props) => props.theme.color.black"};
  color: ${({ isClicked, color }) =>
    isClicked ? color : "${(props) => props.theme.color.black"};
`;

const TitleDiv = styled.div`
flex-direction: row;
`

const Asterisk = styled.div`
width: 10px;
height: 23px;
color: ${(props) => props.theme.color.fail};
justify-content: center;
margin-left: 2px;
`

export default ExpTag;
