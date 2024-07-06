import { useState, useEffect } from "react";
import styled from "styled-components";
import DropdownQuestion from "../DropdownQuestion";
import ExpTag from "../ExpTag";

const AnswerArea = () => {
  return (
    <>
      <Guide>* 경험태그 선택 후, 질문을 선택해 주세요.</Guide>
      {/* 한 세트 */}
      <div>
        {/* 선택하는 부분 */}
        <SelectArea>
          <ExpTag />
          <DropdownQuestion />
        </SelectArea>
        {/* 답변란 */}
        <TextAreaWidth />
      </div>
    </>
  );
};

const Guide = styled.div`
  align-self: flex-start;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  color: ${(props) => props.theme.color.main};

  margin-top: 80px;
  margin-bottom: 16px;
`;

const SelectArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;

  width: 840px;
`;

const TextAreaWidth = styled.textarea`
  box-sizing: border-box;
  width: 840px;
  height: 150px;

  border-radius: 10px;

  padding: 22px 24px 31px 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  background-color: ${(props) => props.theme.color.base1};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;

  &::placeholder {
    color: ${(props) => props.theme.color.base3};
  }
`;
export default AnswerArea;
