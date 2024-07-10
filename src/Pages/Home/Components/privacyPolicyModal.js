import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Close } from "../../../Assets/close.svg";

const PrivacyPolicyModal = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  //오버레이 영역 선택하면 모달 닫힘
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
      <StyledClose onClick={onClose} />
{/* 
      <TextContainer> */}
      <TitleDiv>개인정보 수집 및 이용 동의</TitleDiv>
      <ContentDiv>
      레코드온 서비스는 원활한 서비스 제공을 위해 최소한의 
범위 내에서 아래와 같이 개인정보를 수집 및 이용합니다.
<br /><br />
1. 수집 항목<br />
- 구글 이메일을 통한 로그인 및 회원가입<br />
: 구글 이메일, 프로필 사진, 이름<br />
- 서비스 회원가입<br />
: 닉네임, 희망직군<br />
<br />
2. 수집 및 이용 목적<br />
- 회원 식별 및 서비스 제공<br />
<br />
3. 보유 및 이용기간<br />
- 서비스 탈퇴 시<br />
<br />
귀하는 이와 같이 개인정보를 수집 및 이용하는데 동의를 <br />
거부할 권리가 있습니다. 다만, 필수 수집 항목에 대한 동의를 <br />
거절하는 경우 서비스 이용이 제한 될 수 있습니다.

      </ContentDiv>
      {/* </TextContainer> */}
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: rgba(18, 18, 18, 0.40); */
  z-index: 100000;
`;

const Modal = styled.div`
   justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 중앙으로 배치하기 위해
  overflow-y: auto;

  width: 432px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.White};
`;

const StyledClose = styled(Close)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 25px;
  left: 386px;
  flex-shrink: 0;
  cursor: pointer;
`;

// const TextContainer = styled.div`

// `;
const TitleDiv = styled.div`
  position: absolute;
  flex-direction: row;
  width: 332px;
  height: 23px;
  top: 50px;
  left: 50px;
  text-align: start;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

const  ContentDiv = styled.div`
  position: absolute;
  width: 332px;
  height: 360px;
  top: 90px;
  left: 50px;
  font-size: ${(props) => props.theme.fontSizes.TextS};
  font-weight: ${(props) => props.theme.fontWeights.TextS};
  line-height: 18.2px;
letter-spacing: -0.28px;
`;
export default PrivacyPolicyModal;
