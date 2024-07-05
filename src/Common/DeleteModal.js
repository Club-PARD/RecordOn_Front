import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../Assets/close.svg";

const DeleteModal = ({
  isOpen,
  onClose,
  bigAlertText1,
  bigAlertText2,
  smallAlertText,
  keepButtonText,
  deleteButtonText,
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
        {/* 닫기 버튼 있는 상위 영역 */}
        <Upper>
          <CloseIcon onClick={onClose} />
        </Upper>

        {/* 중간 영역 */}

        <div>
          {/* 뭔가 디자인 요소 들어감 */}
          <DesignArea></DesignArea>
          <BigAlert>
            {bigAlertText1}
            <br />
            {bigAlertText2}
          </BigAlert>
          <SmallAlert>{smallAlertText}</SmallAlert>
        </div>
        {/* 하단 버튼 영역 */}
        <ButtonDiv>
          <KeepButton onClick={onKeep}>{keepButtonText}</KeepButton>
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

const Upper = styled.div`
  width: 100%;
  align-items: flex-end;
`;
const DesignArea = styled.div`
  width: 65px;
  height: 55px;
  background-color: ${(props) => props.theme.colors.Gray};

  margin-top: 16px;
`;

const BigAlert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  width: 338px;
  white-space: nowrap;

  font-size: ${(props) => props.theme.fontSizes.TitleS};
  font-weight: ${(props) => props.theme.fontWeights.TitleS};
  line-height: 39px;

  margin-top: 20px;
`;

const SmallAlert = styled.div`
  text-align: center;

  width: 320px;
  white-space: nowrap;

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

  width: 174px;
  height: 40px;
  border-radius: 10px;

  background-color: ${(props) => props.theme.colors.Black};
  color: ${(props) => props.theme.colors.White};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;

  width: 84px;
  height: 40px;
  border-radius: 10px;

  background-color: ${(props) => props.theme.colors.Gray};
  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

export default DeleteModal;
