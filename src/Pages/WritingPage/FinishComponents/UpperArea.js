import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  FixArea,
  FixAreaLabel,
} from "../Components/ContentComponents/LowerArea";

const UpperArea = () => {

  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <Upper>
        <UppderPart width={"840px"}>
          <StyledLabel>소제목</StyledLabel>
          <StyledInput
            type="text"
            placeholder="오늘의 프로젝트 경험은 어땠나요~?"
          />
        </UppderPart>

        <UppderPart width={"713px"}>
          <StyledLabel>경험태그</StyledLabel>
          <StyledTagArea>
            <StyledTag>도전</StyledTag>
            <StyledTag>배움</StyledTag>
            <StyledTag>성공</StyledTag>
            <StyledTag>실패</StyledTag>
            <StyledTag>어려움</StyledTag>
          </StyledTagArea>
        </UppderPart>

        <UppderPart width={"239px"}>
          <StyledLabel>경험한 날</StyledLabel>
          <StyledDate></StyledDate>
        </UppderPart>
      </Upper>

      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 떠올리며, 연상되는 다섯 가지 단어를 적어보세요!
        </FixAreaLabel>
        <FixAnswer>와이어프레임, 로고, 멘토링, 저녁약속, GUI</FixAnswer>
      </FixArea>
    </>
  );
};

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin-top: 153px;
  margin-bottom: 69px;
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

const StyledTagArea = styled.div`
  flex-direction: row;
  align-items: flex-start;

  width: 610px;
  gap: 10px;
`;

const StyledTag = styled.div`
  justify-content: center;

  width: 114px;
  height: 40px;

  border-radius: 25px;
  border: 1.5px solid black;

  font-size: ${(props) => props.theme.fontSizes.TextL};
  font-weight: ${(props) => props.theme.fontWeights.TitleL};
  background-color: ${(props) => props.theme.color.white};
`;
const StyledInput = styled.input`
  box-sizing: border-box;
  padding-left: 25px;

  width: 740px;
  height: 50px;

  background-color: ${(props) => props.theme.color.base2};
  border-radius: 5px;

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};
  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
    color: ${(props) => props.theme.color.base6};
  }
`;

const StyledDate = styled.div`
  width: 136px;
  height: 40px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.color.base2};
`;

const FixAnswer = styled.div`
  align-items: flex-start;

  width: 792px;
  height: 74px;

  font-weight: ${(props) => props.theme.fontWeights.TextM};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  color: ${(props) => props.theme.color.black};

  margin-top: 2px;
`;
export default UpperArea;
export {StyledTag, FixAreaLabel};