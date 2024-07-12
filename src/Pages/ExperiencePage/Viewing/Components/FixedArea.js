import { useState, useEffect } from "react";
import { FixArea, FixAreaLabel, TextAreaWidth } from "../Components/ContentComponents/LowerArea";
import { useRecoilState } from "recoil";
import {
  answerState,
} from "../../../Atom/ExpRecordAtom";

const FixedArea = () => {
  const [answer, setAnswer] = useRecoilState(answerState);

  return (
    <>
      {/* {console.log(experience)} */}
      {/* 고정 질문 영역 */}
      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 되돌아보며, 연상되는 단어를 최소 3가지 이상 적어보세요!
        </FixAreaLabel>
        <TextAreaWidth
          placeholder="예시) 고객 관리, 팀프로젝트 회의, 매출 향상, 갈등 이슈, 현직자 멘토링"
          height="88px"
          value={answer && answer.common_question_answer}
        />
      </FixArea>
    </>
  );
};

export default FixedArea;
