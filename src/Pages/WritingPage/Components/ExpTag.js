import { ReactComponent as RightArrow } from "../../../Assets/RightArrow.svg";
import styled from "styled-components";

const ExpTag = () => {
  return (
    <>
      <Div>
        {/* "경험태그 > " */}
        <TitleButton>
          <div>경험태그</div>
          <RightArrow />
        </TitleButton>

        {/* 키워드 버튼들 */}
        <Buttons>
          <StyledButton>도전</StyledButton>
          <StyledButton>어려움</StyledButton>
          <StyledButton>성공</StyledButton>
          <StyledButton>실패</StyledButton>
          <StyledButton>배움</StyledButton>
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
  color: ${(props) => props.theme.colors.Black};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17px;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  justify-content: center;
  width: 126px;
  height: 50px;

  border: 1.5px solid;
  border-color: ${(props) => props.theme.colors.Black};
  border-radius: 25px;

  font-size: ${(props) => props.theme.fontSizes.TextL};
  font-weight: ${(props) => props.theme.fontWeights.TextL};

  cursor: pointer;
`;

export default ExpTag;
