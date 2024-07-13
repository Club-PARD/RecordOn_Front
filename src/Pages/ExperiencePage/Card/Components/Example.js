import styled from "styled-components";
import { ReactComponent as Delete } from "../../../../Assets/delete.svg";
import { ReactComponent as Edit } from "../../../../Assets/edit.svg";
import DeleteModal from "../../../../Common/DeleteModal";
import EditProjectModal from "./EditProjectModal";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { recoilUserData } from "../../../../Atom/UserDataAtom";
import { getOneProjectDataAPI } from "../../../../Axios/ProjectDataApi";
import EditProject from "./EditProject";

const Example = () => {

  const [isDmodalOpen, setIsDmodalOpen] = useState(false);
  const [isEmodalOpen, setIsEmodalOpen] = useState(false);
  const [projectData, setProjectData] = useState({});


  const openEmodalHandler = () => {
    setIsEmodalOpen(true);
  };

  const closeEmodalHandler = () => {
    setIsEmodalOpen(false);
  };

  const openDmodalHandler = () => {
    setIsDmodalOpen(true);
  };

  const closeDmodalHandler = () => {
    setIsDmodalOpen(false);
  };
  //오버레이 영역 선택하면 모달 닫힘
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      // onClose();
    }
  };

  return (
    <>
      <ToolBoxDiv>
        <DeleteDiv onClick={openDmodalHandler}>
          <Delete />
          <Text>삭제하기</Text>
        </DeleteDiv>
        <DeleteDiv >
          <Edit />
          <EditProject />
        </DeleteDiv>
      </ToolBoxDiv>
      {isDmodalOpen && <DeleteModal isOpen={isDmodalOpen} onClose={closeDmodalHandler} onKeep={closeDmodalHandler} bigAlertText1="삭제하신 프로젝트는" bigAlertText2="저장되지 않습니다." smallAlertText="프로젝트를 정말 삭제하시겠습니까?" keepButtonText="프로젝트 유지하기" deleteButtonText="삭제하기" />}
      {isEmodalOpen && <EditProjectModal isOpen={isEmodalOpen} onClose={closeEmodalHandler} propsProjectData={projectData} />}
    </>
  );
};

const Overlay = styled.div`
  display: flex;
  /* border: 1px solid black; */
  align-items: center;
  justify-content: center;
  z-index: 999998; /* Modal보다 뒤에 배치 */

  position: fixed;
  top: 0;
  left: 0;

  /* width: 100%;
  height: 100%; */

`;

const ToolBoxDiv = styled.div`
box-sizing: border-box;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 5px;
margin-top: 3px;
padding-top: 10px;
padding-bottom: 10px;
gap: 10px;
width: 126px;
height: 80px;
/* top: 199px;
left: 1168px;
position: fixed; */
color: ${(props) => props.theme.color.black};
background-color: ${(props) => props.theme.color.base2};
`

const DeleteDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 11px;
justify-content: center;
z-index: 2;
/* background-color: aliceblue; */
text-decoration: none;
cursor: pointer;
`;

const Text = styled.div`
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`;
export default Example;