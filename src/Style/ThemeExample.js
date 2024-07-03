// theme 사용하는 방법 예시 코드!
import styled from "styled-components";

const ThemeExample = () => {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <TitleL>기억에 의한 작성이 아닌 <span></span>기록에 의한 작성</TitleL>
      <TitleS>TitleS</TitleS>
      {/* <Title1AndBrown001>title1 & brown_001</Title1AndBrown001> */}
      {/* </ThemeProvider> */}

      <div>스타일 테스트</div>
      <StyledDiv>이게 뭐지</StyledDiv>
      <StyledInput type="text" placeholder="이게 뭐지" />
    </>
  );
};

const TitleL = styled.h1`
white-space: nowrap;
font-style: ${(props) => props.theme.fontStyles.TextXL};
  color: ${(props) => props.theme.colors.Black};
`;

const TitleS = styled.h1`
font-style: ${(props) => props.theme.fontStyles.TextL};
  /* color: ${(props) => props.theme.colors.primary_normal}; */
`;

// const Title1AndBrown001 = styled.h1`
//   font-size: ${(props) => props.theme.fontSizes.title1};
//   color: ${(props) => props.theme.colors.brown_001};
// `;

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
