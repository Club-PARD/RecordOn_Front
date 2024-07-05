import styled from "styled-components";

import UppderArea from "../Components/ContentComponents/UpperArea";
import FixedArea from "../Components/ContentComponents/FixedArea";
import QnaArea from "../Components/ContentComponents/QnaArea";
import LowerArea from "../Components/ContentComponents/LowerArea";

const ContentsArea = () => {
  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <UppderArea />

      {/* 내용 작성 부분 */}
      <ContentArea>
        {/* 고정 질문 답변 영역 */}
        <FixedArea />

        {/* 태그별 질문 답변 영역 */}
        <QnaArea />

        {/* 하단 영역 : 자유란과 관련 자료 링크 */}
        <LowerArea />

      </ContentArea>
    </>
  );
};

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 153px;
`;

export default ContentsArea;
