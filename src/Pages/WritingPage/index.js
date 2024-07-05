import { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as GoBackIcon } from "../../Assets/GoBackIcon.svg";
import { ReactComponent as DropdownArrow } from "../../Assets/DropdownArrow.svg";

import ContentArea from "./Components/ContentsArea";

const WritingPage = () => {

  //   // 선택된 태그 이름에 맞는 질문 리스트 찾기
  //   const tagData = tagAndQuestion.find((item) => item.tag_name === tagName);
  //   if (tagData) {
  //     setSelectedQuestionKeywordList(tagData.questions);
  //   } else {
  //     setSelectedQuestionKeywordList([]);
  //   }
  //   setIsTagOpen(false);
  // };

  // // 질문 선택 시
  // const handleQuestionSelect = (question) => {
  //   setSelectedQuestionKeyword(question);
  //   setIsQuestionOpen(false);
  // };

  return (
    <Div>
      {/* 뒤로 가기 */}
      <GoBackArea>
        <MarginTopForGoBackDiv />
        <GoBackDiv>
          <GoBackIcon />
          <div>경험 기록 페이지 나가기</div>
        </GoBackDiv>
        <MarginBottomForGoBackDiv />
      </GoBackArea>
      {/* 내용 작성 영역 */}
      <ContentArea />
      {/* 버튼 */}
      <ConfirmButton>경험기록 작성완료</ConfirmButton>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GoBackArea = styled.div`
  position: fixed;
  top: 70;

  z-index: 9999;
  background-color: ${(props) => props.theme.colors.White};
`;

const MarginTopForGoBackDiv = styled.div`
  height: 46px;
  width: 1200px;

  background-color: ${(props) => props.theme.colors.White};
`;

const GoBackDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10.21px;

  background-color: ${(props) => props.theme.colors.White};

  margin-left: -1000px;

  cursor: pointer;

  div {
    font-weight: ${(props) => props.theme.fontWeights.TextM};
    font-size: ${(props) => props.theme.fontSizes.TextM};
    color: ${(props) => props.theme.colors.Charcoal};
  }
`;

const MarginBottomForGoBackDiv = styled.div`
  height: 42px;
  width: 1200px;
  background-color: ${(props) => props.theme.colors.White};
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

  margin-bottom: 136px;

  cursor: pointer;
`;

export default WritingPage;
