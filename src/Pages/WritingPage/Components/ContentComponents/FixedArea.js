import { FixArea, FixAreaLabel, TextAreaWidth } from "./LowerArea";

const FixedArea = () => {
  return (
    <>
    {/* 고정 질문 영역 */}
      <FixArea>
        <FixAreaLabel>
          Q. 자자자 고정질문입니다 당신을 잘 돌아봐보시오 생각해봐라~~
        </FixAreaLabel>
        <TextAreaWidth height="168px"/>
      </FixArea>
    </>
  );
};

export default FixedArea;
