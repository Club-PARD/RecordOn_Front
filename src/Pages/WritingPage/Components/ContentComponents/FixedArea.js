import { useState, useEffect } from "react";
import { FixArea, FixAreaLabel, TextAreaWidth } from "./LowerArea";
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
} from "../../../../Atom/ExpRecordAtom";

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
      {console.log(experience)}
      {/* 고정 질문 영역 */}
      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 떠올리며, 연상되는 다섯 가지 단어를 적어보세요!
        </FixAreaLabel>
        <TextAreaWidth
        placeholder="예시) 현직자 멘토링, 굿즈 발주 넣기, 원페이저 작성, 디자이너와의 소통이슈, B2B 전략수립"
          height="88px"
          value={commonQuestionAnswer}
          onChange={handleChange}
        />
      </FixArea>
    </>
  );
};

export default FixedArea;
