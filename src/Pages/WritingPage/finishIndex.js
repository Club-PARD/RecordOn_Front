import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UpperArea, {
  StyledTag,
  FixAreaLabel,
} from "./FinishComponents/UpperArea";
import {
  Div,
  GoBackArea,
  MarginTopForGoBackDiv,
  MarginBottomForGoBackDiv,
  GoBackDiv,
  GoBackIcon,
} from "./index";
import Bookmark from "./Components/ContentComponents/Bookmark";
import {
  FixArea,
  BookmarkComponent,
} from "./Components/ContentComponents/LowerArea";
import DeleteModal from "../../Common/DeleteModal";

const ViewPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Div>
      {/* 뒤로 가기 */}
      <GoBackArea>
        <MarginTopForGoBackDiv />
        <GoBackDiv onClick={openModal}>
          <GoBackIcon />
          <div>경험 기록 페이지 나가기</div>
        </GoBackDiv>
        <MarginBottomForGoBackDiv />
      </GoBackArea>

      <UpperArea />

      <StyledHr />
      <FixAreaWrapper>
        <FixArea>
          <StyledTag>도전</StyledTag>
          <FixAreaLabel>
            Q. 성장했다고 느끼는 부분은 구체적으로 어떤 부분인가요? 이루신
            성과가 있다면 같이 적어주세요!
          </FixAreaLabel>
          <FixAnswer>
            자자 텍스트라인은 이정도까지입니다. 여백 잘 봐주시고여 이런
            느낌입니다이런느낌~~~~아시겠죠~~ 야호야호 나의 성공경험은 이거라고
            저거라고 어쩌라고 저쩌라고 뭐라고자자 텍스트라인은 이정도까지입니다.
            여백 잘 봐주시고여 이런 느낌입니다이런느낌~~~~아시겠죠~~ 야호야호
            나의 성공경험은 이거라고 저거라고 어쩌라고 저쩌라고 뭐라고자자
            텍스트라인은 이정도까지입니다. 여백 잘 봐주시고여 이런
            느낌입니다이런느낌~~~~아시겠죠~~ 야호야호 나의 성공경험은 이거라고
            저거라고 어쩌라고 저쩌라고 뭐라고
          </FixAnswer>
        </FixArea>
      </FixAreaWrapper>

      <StyledHr marginTop={"46px"} />

      <FixArea>
        <FixAreaLabel>자유란</FixAreaLabel>
        <FixAnswer>
          자자 텍스트라인은 이정도까지입니다. 여백 잘 봐주시고여 이런
          느낌입니다이런느낌~~~~아시겠죠~~ 야호야호 나의 성공경험은 이거라고
          저거라고 어쩌라고 저쩌라고 뭐라고자자 텍스트라인은 이정도까지입니다.
          여백 잘 봐주시고여 이런 느낌입니다이런느낌~~~~아시겠죠~~ 야호야호 나의
          성공경험은 이거라고 저거라고 어쩌라고 저쩌라고 뭐라고자자 텍스트라인은
          이정도까지입니다. 여백 잘 봐주시고여 이런
          느낌입니다이런느낌~~~~아시겠죠~~ 야호야호 나의 성공경험은 이거라고
          저거라고 어쩌라고 저쩌라고 뭐라고
        </FixAnswer>
      </FixArea>

      <StyledHr marginTop={"46px"} />

      <FixArea>
        <FixAreaLabel>관련 자료 링크</FixAreaLabel>
        <BookmarkComponent>
          <Bookmark />
        </BookmarkComponent>
      </FixArea>

      <ButtonArea>
        <Button
          color={(props) => props.theme.color.white}
          bgColor={(props) => props.theme.color.main}
        >
          수정하기
        </Button>
        <Button
          color={(props) => props.theme.color.base6}
          bgColor={(props) => props.theme.color.base3}
          onClick={openModal}
        >
          삭제하기
        </Button>
      </ButtonArea>

      {/* 모달 컴포넌트 */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal} // 모달 닫기 함수 설정
        bigAlertText1="삭제하신 경험은"
        bigAlertText2="저장되지 않습니다."
        smallAlertText="경험기록을 정말 삭제하시겠습니까?"
        keepButtonText="경험기록 유지하기"
        deleteButtonText="삭제하기"
        keepButtonWidth="174px"
        onKeep={() => {
          // '계속 작성' 버튼 클릭 시 처리 로직
          console.log("유지");
          closeModal(); // 모달 닫기
        }}
        onDelete={() => {
          // '나가기' 버튼 클릭 시 처리 로직
          console.log("삭제");
          closeModal(); // 모달 닫기
          navigate("/experience");
        }}
      />
    </Div>
  );
};

const StyledHr = styled.hr`
  border: 0;
  width: 840px;
  height: 1px;
  background-color: ${(props) => props.theme.color.base4};

  margin-top: ${(props) => props.marginTop};
  margin-bottom: 50px;
`;

const FixAreaWrapper = styled.div`
  gap: 60px;
`;

const FixAnswer = styled.div`
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: 400px;
  line-height: 23.4px;
  color: ${(props) => props.theme.color.black};
`;

const ButtonArea = styled.div`
  flex-direction: row;
  gap: 10px;

  margin-top: 50px;
  margin-bottom: 136px;
`;

const Button = styled.div`
  justify-content: center;

  width: 126px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};

  font-size: ${(props) => props.theme.fontSizes.TextXL};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  cursor: pointer;
`;
export default ViewPage;
