import styled from "styled-components";
import { useState } from "react";
import ProjectEndModal from "../../RegisterPage/Components/ProjectEndModal";


const FinishProject = () => {

    const [modalOn, setModalOn] = useState(false);
    const [showProjectEndModal, setShowProjectEndModal] = useState(false);

    const handleAddProjectModal = () => {
        setModalOn((prev) => (!prev));
    }

    const handleProjectEndModal = () => {
        setShowProjectEndModal(true);
      };

    // console.log(modalOn);
    return (
        <>
            <AddProjectButton onClick={handleProjectEndModal}>
                프로젝트 완료하기
            </AddProjectButton>
            <ProjectEndModal  show={showProjectEndModal} onClose={() => setShowProjectEndModal(false)} />
            {/* {modalOn && <AddProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} />} */}
        </>
    );
};


const AddProjectButton = styled.button`
width: 228px;
height: 50px;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.base7};
font-size: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
cursor: pointer;
`

export default FinishProject;
