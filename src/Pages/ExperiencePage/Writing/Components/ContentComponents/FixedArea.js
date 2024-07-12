import { useState, useEffect } from "react";
import {
  FixArea,
  FixAreaLabel,
  TextAreaWidth,
} from "./LowerComponents/LowerArea";
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
} from "../../../../../Atom/ExpRecordAtom";
import styled from "styled-components";

const FixedArea = () => {
  // 리코일 변수
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );
  
  // 임시 변수
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
  }, [isExpRecordSubmitted, commonQuestionAnswer, setExperience]);

  return (
    <>
      {/* 고정 질문 영역 */}
      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 되돌아보며, 연상되는 단어를 최소 3가지 이상 적어보세요!<Asterisk>*</Asterisk>
        </FixAreaLabel>
        <TextAreaWidth
          placeholder="예시) 현직자 멘토링, 굿즈 발주, 원페이저 작성, 디자이너와의 소통이슈, B2B 전략수립"
          height="88px"
          value={commonQuestionAnswer}
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
`

export default FixedArea;
