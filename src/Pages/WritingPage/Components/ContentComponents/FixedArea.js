import { useState, useEffect } from "react";
import { FixArea, FixAreaLabel, TextAreaWidth } from "./LowerArea";
import { useRecoilState } from "recoil";
import { experienceState, handleExpRecordSubmit } from "../../../../Atom/ExpRecordAtom";

const FixedArea = () => {
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );

  const [commonQuestionAnswer, setCommonQuestionAnswer] = useState("");

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
    {console.log (experience)}
      {/* 고정 질문 영역 */}
      <FixArea>
        <FixAreaLabel>
          Q. 자자자 고정질문입니다 당신을 잘 돌아봐보시오 생각해봐라~~
        </FixAreaLabel>
        <TextAreaWidth
          height="168px"
          value={commonQuestionAnswer}
          onChange={handleChange}
        />
      </FixArea>
    </>
  );
};

export default FixedArea;
