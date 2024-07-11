import { useState, useEffect } from "react";
import {
  FixArea,
  FixAreaLabel,
  TextAreaWidth,
} from "./LowerComponents/LowerArea";
import { useRecoilState } from "recoil";
import {
  ExperienceEditState,
  handleExpRecordEditSubmit,
  answerState,
} from "../../../../../Atom/ExpRecordAtom";

const FixedArea = () => {
  const [answer, setAnswer] = useRecoilState(answerState);
  const [experience, setExperience] = useRecoilState(ExperienceEditState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordEditSubmit
  );

  const [commonQuestionAnswer, setCommonQuestionAnswer] = useState("");

  useEffect(() => {
    if (answer && answer.common_question_answer) {
      setCommonQuestionAnswer(answer.common_question_answer);
    }
  }, [answer]);

  // 입력 내용을 임시 변수에 관리
  const handleChange = (e) => {
    setCommonQuestionAnswer(e.target.value);
  };

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      setExperience((prev) => ({
        ...prev,
        common_question_answer: commonQuestionAnswer,
      }));
    }
  }, [isExpRecordSubmitted]);

  return (
    <>
      {/* 고정 질문 영역 */}
      {console.log(commonQuestionAnswer)}
      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 되돌아보며, 연상되는 단어를 최소 3가지 이상 적어보세요!
        </FixAreaLabel>
        <TextAreaWidth
          height="88px"
          value={commonQuestionAnswer}
          onChange={handleChange}
        />
      </FixArea>
    </>
  );
};

export default FixedArea;
