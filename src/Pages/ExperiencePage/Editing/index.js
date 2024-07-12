import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  handleExpRecordEditSubmit,
  answerState,
  isAllValidState,
  tempInputState,
} from "../../../Atom/ExpRecordAtom";
import { recoilSnack, recoilUserData } from "../../../Atom/UserDataAtom";

import { editOneExpereienceAPI } from "../../../Axios/ExperienceApi";

import DeleteModal from "../../../Common/DeleteModal";
import { ReactComponent as GoBackIcon } from "../../../Assets/GoBackIcon.svg";

import ContentsArea from "./Components/ContentsArea";

const EditPage = () => {
  const [answer, setAnswer] = useRecoilState(answerState);
  const [tempInput, setTempInput] = useRecoilState(tempInputState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordEditSubmit
  );
  const [userInfo, setUserInfo] = useRecoilState(recoilUserData);
  const [snack, setSnack] = useRecoilState(recoilSnack);
  const [isAllValid, setIsAllValid] = useRecoilState(isAllValidState);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expId, setExpId] = useState(null);

  const handleSubmit = () => {
    setIsExpRecordSubmitted(true);
    if (isAllValid) {
      editOneExpereienceAPI(expId, tempInput);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setExpId(userInfo.id);
    }
  }, [userInfo]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { location } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  console.log("answer: ", answer);

  return (
    <Div>
      {/* 뒤로 가기 */}

      <GoBackArea>
        <MarginTopForGoBackDiv />
        <GoBackDiv onClick={openModal}>
          <GoBackIcon />
          <div>경험 수정 페이지 나가기</div>
        </GoBackDiv>
        <MarginBottomForGoBackDiv />
      </GoBackArea>

      {/* 내용 작성 영역 */}
      <ContentsArea />

      {/* 버튼 */}
      <ConfirmButton onClick={handleSubmit}>경험기록 수정완료</ConfirmButton>

      {/* 모달 컴포넌트 */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal} // 모달 닫기 함수 설정
        bigAlertText1="수정하신 기록은"
        bigAlertText2="저장되지 않습니다."
        smallAlertText="수정 페이지에서 정말 나가시겠습니까?"
        keepButtonText="남아서 수정하기"
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
