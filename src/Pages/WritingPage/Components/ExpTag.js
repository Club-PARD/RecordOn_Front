import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as RightArrow } from "../../../Assets/RightArrow.svg";
import { useRecoilState } from "recoil";
import { expTagSelectState } from "../../../Atom/ExpRecordAtom";

const ExpTag = () => {
  const keywords = [
    { id : 0, label: "도전", color: "#2ABCDC" },
    { id : 1,label: "어려움", color: "#FF971D" },
    { id : 2,label: "성공", color: "#4B9EFF" },
    { id : 3,label: "실패", color: "#F25454" },
    { id : 4,label: "배움", color: "#42B887" },
  ];

  const [tagState, setTagState] = useRecoilState(expTagSelectState);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);

  const handleButtonClick = (index) => {
    if (clickedButtonIndex === index) {
      setClickedButtonIndex(null);
      setTagState({
        ...tagState,
        isTagClicked: false,
        selectedTagId: null,
      });
    } else {
      setClickedButtonIndex(index);
      setTagState({
        ...tagState,
        isTagClicked: true,
        selectedTagId: keywords[index].id,
      });
    }
  };

  return (
    <>
      <Div>
        {console.log (tagState)}
        {/* "경험태그 > " */}
        <TitleButton>
          <div>경험태그</div>
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

export default ExpTag;
