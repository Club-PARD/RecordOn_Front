import { useState, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { answerState } from "../../../../Atom/ExpRecordAtom";

import UppderArea from "../Components/ContentComponents/UpperArea";
import FixedArea from "../Components/ContentComponents/FixedArea";
import AnswerArea from "../Components/ContentComponents/QnAComponents/AnswerArea";
import LowerArea from "../Components/ContentComponents/LowerComponents/LowerArea";

const ContentsArea = () => {
  const [answer, setAnswer] = useRecoilState(answerState);

  // 중간 배열 생성
  const combinedArray =
    answer.question_text &&
    answer.question_text.map((_, index) => [
      answer.tag_ids[index],
      answer.question_text[index],
      answer.question_answer[index],
    ]);


  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <UppderArea />

      {/* 내용 작성 부분 */}
      <ContentArea>
        {/* 고정 질문 답변 영역 */}
        <FixedArea />

        {/* 태그별 질문 답변 영역 */}
        <AnswerArea combinedArray={combinedArray}/>

        {/* 하단 영역 : 자유란과 관련 자료 링크 */}
        <LowerArea />
      </ContentArea>
    </>
  );
};

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ContentsArea;
