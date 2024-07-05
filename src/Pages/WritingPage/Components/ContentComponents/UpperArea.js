import styled from "styled-components";
import Calendar from "../../../../Common/Calendar";
const UppderArea = () => {
  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <Upper>
        <UppderPart width={"842px"}>
          <StyledLabel>소제목</StyledLabel>
          <StyledInput
            type="text"
            placeholder="오늘의 프로젝트 경험은 어땠나요~?"
          />
        </UppderPart>

        <UppderPart width={"227px"}>
          <StyledLabel>경험한 날</StyledLabel>
          <Calendar />
        </UppderPart>
      </Upper>
    </>
  );
};

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin-top: 153px;
  margin-bottom: 70px;
`;

const UppderPart = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  justify-content: space-between;

  width: ${({ width }) => width};
`;

const StyledLabel = styled.label`
  box-sizing: border-box;

  white-space: nowrap;
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  padding-left: 25px;

  width: 740px;
  height: 50px;

  border: 1px solid;
  border-color: ${(props) => props.theme.colors.Charcoal};
  border-radius: 5px;

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};
  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
    color: ${(props) => props.theme.colors.Charcoal};
  }
`;

export default UppderArea;
