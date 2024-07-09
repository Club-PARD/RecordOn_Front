import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as GoldenBell } from "../Assets/GoldenBell.svg";

const privacyPolicyModal = ({
  isOpen,
  onClose,
  bigAlertText1,
  bigAlertText2,
  smallAlertText,
  keepButtonText,
  deleteButtonText,
  keepButtonWidth,
  onKeep,
  onDelete,
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
        <div>
          {/* 뭔가 디자인 요소 들어감 */}
          <DesignArea>
            <GoldenBell />
          </DesignArea>
          <BigAlert>
            {bigAlertText1}
            <br />
            {bigAlertText2}
          </BigAlert>
          <SmallAlert>{smallAlertText}</SmallAlert>
        </div>
        {/* 하단 버튼 영역 */}
        <ButtonDiv>
          <KeepButton keepButtonWidth = {keepButtonWidth} onClick={onKeep}>{keepButtonText}</KeepButton>
          <DeleteButton onClick={onDelete}>{deleteButtonText}</DeleteButton>
        </ButtonDiv>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999998; /* Modal보다 뒤에 배치 */

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 432px;
  height: 400px;
  z-index: 999999;

  padding: 24px 31px 71px;

  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.White};
`;

const DesignArea = styled.div`
  width: 69px;
  height: 73px;

  margin-top: 16px;
`;

const BigAlert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  width: 338px;
  white-space: nowrap;

  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TitleS};
  font-weight: ${(props) => props.theme.fontWeights.TitleS};
  line-height: 39px;

  margin-top: 20px;
`;

const SmallAlert = styled.div`
  text-align: center;

  width: 320px;
  white-space: nowrap;

  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  margin-top: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  margin-top: 40px;
`;

const KeepButton = styled.button`
  display: flex;
  justify-content: center;

  width: ${({keepButtonWidth}) => keepButtonWidth || "174px"};

  height: 40px;
  border-radius: 10px;

  background-color: ${(props) => props.theme.color.main};
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  cursor: pointer;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;

  width: 84px;
  height: 40px;
  border-radius: 10px;

  background-color: ${(props) => props.theme.color.base3};
  color: ${(props) => props.theme.color.base6};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  cursor: pointer;
`;

export default privacyPolicyModal;
