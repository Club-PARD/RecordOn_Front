import styled from "styled-components";
const LowerArea = () => {
  return (
    <>
    {/* 하단 영역 : 자유란과 관련 자료 링크 */}
      <Lower>
        <FixArea>
          <FixAreaLabel>자유란</FixAreaLabel>
          <TextAreaWidth cols="100" rows="6" />
        </FixArea>
        <FixArea>
          <FixAreaLabel>관련 자료 링크</FixAreaLabel>
          <TextAreaWidth cols="100" rows="1" />
        </FixArea>
        <AddButtonWrapper>
          <AddButton>+ 관련 자료 추가</AddButton>
        </AddButtonWrapper>
      </Lower>
    </>
  );
};

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 44px;
`;

const FixArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  width: 840px;
`;

const FixAreaLabel = styled.label`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const TextAreaWidth = styled.textarea`
  box-sizing: border-box;
  width: 840px;

  border: 1px solid;
  border-radius: 10px;

  padding: 22px 24px 31px 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;
`;

const AddButtonWrapper = styled.div`
  margin-top: 29px;
  margin-bottom: 49px;
`;

const AddButton = styled.button`
  justify-content: center;
  width: 840px;
  height: 50px;

  border: 1px solid;
  border-radius: 10px;

  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  cursor: pointer;
`;

export default LowerArea;
export {FixArea, FixAreaLabel, TextAreaWidth};