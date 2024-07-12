import { useState, useEffect } from "react";
import {
  FixArea,
  FixAreaLabel,
  TextAreaWidth,
} from "./LowerComponents/LowerArea";
import { useRecoilState } from "recoil";
import {
  expEditState,
  handleExpRecordEditSubmit,
  answerState,
} from "../../../../../Atom/ExpRecordAtom";

const FixedArea = () => {
  const [answer, setAnswer] = useRecoilState(answerState);
  const [experience, setExperience] = useRecoilState(expEditState);
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

  const validateCommonQuestionAnswer = (commonQuestionAnswer) => {
    const errors = [];
    if (commonQuestionAnswer.trim().split(' ').length < 3) {
      errors.push("연상되는 단어를 최소 3가지 이상 적어주세요.");
    }
    return errors;
  };

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      const errors = validateCommonQuestionAnswer(commonQuestionAnswer);

      if (errors.length === 0) {
        setExperience((prev) => ({
          ...prev,
          common_question_answer: commonQuestionAnswer,
        }));
      } else {
        setIsExpRecordSubmitted(false);
        alert("다음 항목을 확인해 주세요:\n" + errors.join("\n"));
      }
    }
  }, [isExpRecordSubmitted, commonQuestionAnswer]);

  return (
    <>
      {/* 고정 질문 영역 */}
      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 되돌아보며, 연상되는 단어를 최소 3가지 이상
          적어보세요!
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
