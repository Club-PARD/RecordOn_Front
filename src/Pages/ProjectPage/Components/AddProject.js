import styled from "styled-components";
import { useRecoilState } from "recoil";
import { recoilProjectModal } from "../../../Atom/UserDataAtom";
import AddProjectModal from "./AddProjectModal";
import { useState } from "react";


const AddProject = () => {

    const [modalOn, setModalOn] = useState(false);

    const handleAddProjectModal = () => {
        setModalOn((prev) => (!prev));
    }

    // console.log(modalOn);
    return (
        <>
            <AddProjectButton onClick={() => setModalOn(true)}>
                + 프로젝트 추가
            </AddProjectButton>
            {modalOn && <AddProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} />}
        </>
    );
};


const AddProjectButton = styled.button`
width: 228px;
height: 50px;
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextXL};
font-weight: ${(props) => props.theme.fontWeights.TextXL};
justify-content:center;
border-radius: 10px;
margin-top: 18px;
cursor: pointer;
`

export default AddProject;
