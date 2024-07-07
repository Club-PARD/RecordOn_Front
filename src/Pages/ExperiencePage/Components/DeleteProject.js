import styled from "styled-components";
import { useRecoilState } from "recoil";
import { recoilProjectModal } from "../../../Atom/UserDataAtom";
import AddProjectModal from "./DeleteProjectModal";
import { useState } from "react";


const DeleteProject = () => {

    const [modalOn, setModalOn] = useState(false);

    const handleAddProjectModal = () => {
        setModalOn((prev) => (!prev));
    }

    console.log(modalOn);
    return (
        <>
            <AddProjectButton onClick={() => setModalOn(true)}>
                프로젝트 완료하기
            </AddProjectButton>
            {modalOn && <AddProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} />}
        </>
    );
};


const AddProjectButton = styled.button`
width: 228px;
height: 50px;
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => props.theme.colors.Black};
font-size: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
cursor: pointer;
`

export default DeleteProject;
