import { useState, useEffect } from "react";
import {
  FixArea,
  FixAreaLabel,
  TextAreaWidth,
} from "./LowerComponents/LowerArea";
import { useRecoilState } from "recoil";
import {
  isValidState,
  handleExpRecordEditSubmit,
  answerState,
  tempInputState,
} from "../../../../../Atom/ExpRecordAtom";
import styled from "styled-components";
const FixedArea = () => {
  const [tempInput, setTempInput] = useRecoilState(tempInputState);
  const [answer, setAnswer] = useRecoilState(answerState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordEditSubmit
  );
  const [isValid, setIsValid] = useRecoilState(isValidState);
  const [commonQuestionAnswer, setCommonQuestionAnswer] = useState("");

  useEffect(() => {
    if (answer && answer.common_question_answer) {
      setCommonQuestionAnswer(answer.common_question_answer);
    }
  }, [answer]);

  // 입력 내용을 임시 변수에 관리
  const handleChange = (e) => {
    setCommonQuestionAnswer(e.target.value);
    setTempInput({
      ...tempInput,
      common_question_answer: e.target.value});
  };

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      setTempInput((prev) => ({
        ...prev,
        common_question_answer: commonQuestionAnswer,
      }));
    } else {
      setIsExpRecordSubmitted(false);
    }
  }, [isExpRecordSubmitted, commonQuestionAnswer, setTempInput]);

  return (
    <>
      {/* 고정 질문 영역 */}
      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 되돌아보며, 연상되는 단어를 최소 3가지 이상
          적어보세요!<Asterisk>*</Asterisk>
        </FixAreaLabel>
        <TextAreaWidth
          height="88px"
          // value={commonQuestionAnswer}
          defaultValue={answer?.common_question_answer}
          onChange={handleChange}
        />
      </FixArea>
    </>
  );
};

const Asterisk = styled.div`
  width: 10px;
  height: 23px;
  color: ${(props) => props.theme.color.fail};
  justify-content: center;
  margin-left: 2px;
`;

export default FixedArea;
