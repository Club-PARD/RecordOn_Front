import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import DeleteModal from "../../../Common/DeleteModal";
import {
  editOneExpereienceAPI,
} from "../../../Axios/ExperienceApi";
import { experienceState } from "../../../Atom/ExpRecordAtom";
import { ReactComponent as GoBackIcon } from "../../../Assets/GoBackIcon.svg";
import { handleExpRecordSubmit } from "../../../Atom/ExpRecordAtom";
import ContentsArea
 from "./Components/ContentsArea";
const EditPage = () => {
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    setIsExpRecordSubmitted(true);

    try {
      await editOneExpereienceAPI(experience);
      // refreshRecoil();
      // navigate("/experience");
      console.log("경험 데이터가 제출되었습니다.");
      console.log(experience);
    } catch (error) {
      console.error("경험 데이터 제출 중 오류가 발생했습니다:", error);
      setIsExpRecordSubmitted(false); // 오류 발생 시 제출 상태를 초기화해야 할 수도 있습니다.
    }
  };

  const refreshRecoil = () => {
    setIsExpRecordSubmitted(false);
    setExperience({
      user_id: "",
      exp_date: "",
      exp_title: "",
      tag_ids: [],
      free_content: "",
      question_ids: [],
      question_answers: [],
      reference_links: [],
      common_question_answer: "",
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  {
    console.log(experience);
  }

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

      {/* 내용 작성 영역 */}
      <ContentsArea />

      {/* 버튼 */}
      <ConfirmButton onClick={handleSubmit}>경험기록 작성완료</ConfirmButton>

      {/* 모달 컴포넌트 */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal} // 모달 닫기 함수 설정
        bigAlertText1="중단하신 기록은"
        bigAlertText2="저장되지 않습니다."
        smallAlertText="경험 기록 페이지에서 정말 나가시겠습니까?"
        keepButtonText="남아서 기록하기"
        deleteButtonText="나가기"
        keepButtonWidth="151px"
        onKeep={() => {
          // '계속 작성' 버튼 클릭 시 처리 로직
          console.log("계속 작성");
          closeModal(); // 모달 닫기
        }}
        onDelete={() => {
          // '나가기' 버튼 클릭 시 처리 로직
          console.log("나가기");
          // refreshRecoil();
          closeModal(); // 모달 닫기
          navigate("/experience");
        }}
      />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GoBackArea = styled.div`
  position: fixed;
  top: 70;

  z-index: 9999;
  background-color: ${(props) => props.theme.color.white};
`;

const MarginTopForGoBackDiv = styled.div`
  height: 46px;
  width: 1200px;

  background-color: ${(props) => props.theme.color.white};
`;

const GoBackDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10.21px;

  background-color: ${(props) => props.theme.color.white};

  margin-left: -1000px;

  cursor: pointer;

  div {
    font-weight: ${(props) => props.theme.fontWeights.TextM};
    font-size: ${(props) => props.theme.fontSizes.TextM};
    color: ${(props) => props.theme.color.base6};
  }
`;

const MarginBottomForGoBackDiv = styled.div`
  height: 42px;
  width: 1200px;
  background-color: ${(props) => props.theme.color.white};
`;

const ConfirmButton = styled.button`
  justify-content: center;

  width: 229px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.color.main};

  color: ${(props) => props.theme.color.white};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  margin-bottom: 79px;

  cursor: pointer;
`;

export default EditPage;
