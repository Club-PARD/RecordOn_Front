// theme 사용하는 방법 예시 코드!
import styled from "styled-components";

const ThemeExample = () => {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <HeaderAndPrimaryNormal>header & primary_normal</HeaderAndPrimaryNormal>
      <Title1AndBrown001>title1 & brown_001</Title1AndBrown001>
      {/* </ThemeProvider> */}

      <div>스타일 테스트</div>
      <StyledDiv>이게 뭐지</StyledDiv>
      <StyledInput type="text" placeholder="이게 뭐지" />
    </>
  );
};

const HeaderAndPrimaryNormal = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.header};
  color: ${(props) => props.theme.colors.primary_normal};
`;

const Title1AndBrown001 = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.title1};
  color: ${(props) => props.theme.colors.brown_001};
`;

const StyledDiv = styled.div`
  width: 150px;
  background-color: beige;
`;

const StyledInput = styled.input`
  width: 150px;
  background-color: aliceblue;
  text-align: center;
`;

export default ThemeExample;
