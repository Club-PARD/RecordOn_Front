import styled from "styled-components";
import { ReactComponent as GoBackIcon } from "../../Assets/GoBackIcon.svg";

const WritingPage = () => {
  return (
    <Div>
      <TopTwo>
        {/* 뒤로 가기 */}
        <GoBackDiv>
          <GoBackIcon />
          <div>경험 기록 페이지 나가기</div>
        </GoBackDiv>

        {/* 내용 작성 부분 */}
        <ContentsArea>
          {/* 상단 데이터 */}
          <Upper>
            <UppderPart width={"842px"}>
              <StyledLabel>소제목</StyledLabel>
              <StyledInput
                type="text"
                placeholder="오늘의 프로젝트 경험은 어땠나요~?"
              />
            </UppderPart>

            <UppderPart width={"249px"}>
              <StyledLabel>경험한 날</StyledLabel>
              <Temp></Temp>
            </UppderPart>
          </Upper>

          {/* 고정 질문 답변 영역 */}
          <FixedArea>
            <FixedAreaLabel>
              Q. 자자자 고정질문입니다 당신을 잘 돌아봐보시오 생각해봐라~~
            </FixedAreaLabel>
            <TextAreaWidth />
          </FixedArea>

          {/* 태그별 질문 답변 영역 */}
          <div>
            <SelectArea>
              <SelectExp>경험태그</SelectExp>
              <SelectQuestion>질문 선택</SelectQuestion>
            </SelectArea>
            <TextAreaWidth />
          </div>

          {/* 경험 추가 버튼 */}
          <AddButton>경험 추가</AddButton>

          {/* 하단 데이터 */}
          <Lower>
            <FixedArea>
              <FixedAreaLabel>자유란</FixedAreaLabel>
              <TextAreaWidth />
            </FixedArea>
            <FixedArea>
              <FixedAreaLabel>관련 자료 링크</FixedAreaLabel>
              <TextAreaWidth />
            </FixedArea>
          </Lower>
        </ContentsArea>
      </TopTwo>

      <ConfirmButton>경험기록 작성완료</ConfirmButton>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoBackDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10.21px;

  position: fixed;
  top: 116px;
  left: 134.79px;

  div {
    font-weight: ${(props) => props.theme.fontWeights.TextM};
    font-size: ${(props) => props.theme.fontSizes.TextM};
    color: ${(props) => props.theme.colors.Charcoal};
  }
`;

const ContentsArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopTwo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 86px;
`;
const Upper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-bottom: 51px;
`;

const UppderPart = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  justify-content: space-between;

  width: ${({ width }) => width};
`;

const StyledLabel = styled.label`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const Temp = styled.div`
  width: 145px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.Gray};
`;
const StyledInput = styled.input`
  box-sizing: border-box;
  padding-left: 25px;

  width: 740px;
  height: 50px;

  border: 1px solid;
  border-color: ${(props) => props.theme.colors.Charcoal};
  border-radius: 5px;

  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
  }
`;
const FixedArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  width: 840px;
`;

const FixedAreaLabel = styled.label`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const TextAreaWidth = styled.textarea`
  width: 840px;
`;

const SelectArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  justify-content: space-between;
  width: 840px;

  margin-top: 49px;
  margin-bottom: 9px;
`;

const SelectExp = styled.div`
  justify-content: center;

  width: 126px;
  height: 50px;

  border: 1px solid;
  border-radius: 25px;

  line-height: 50px;
  font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
`;

const SelectQuestion = styled.div`
  justify-content: center;

  width: 704px;
  height: 50px;

  border: 1px solid;
  border-radius: 5px;
  font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
`;

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const AddButton = styled.button`
  justify-content: center;
  width: 840px;
  height: 50px;

  border: 1px solid;
  border-radius: 10px;

  font-weight: ${(props) => props.theme.fontWeights.TextXL};
    font-size: ${(props) => props.theme.fontSizes.TextXL};

  margin-top: 29px;
  margin-bottom: 44px;
`;

const ConfirmButton = styled.button`
  justify-content: center;

  width: 229px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.Black};

  color: ${(props) => props.theme.colors.White};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  margin-top: 50px;
  margin-bottom: 136px;

  cursor: pointer;
`;

export default WritingPage;
