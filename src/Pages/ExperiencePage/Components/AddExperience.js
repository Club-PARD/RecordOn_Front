import styled from "styled-components";
import { useRecoilState } from "recoil";
import { recoilProjectModal } from "../../../Atom/UserDataAtom";
import AddProjectModal from "./DeleteProjectModal";
import { useState } from "react";


const AddExperience = () => {

    const [modalOn, setModalOn] = useState(false);

    const handleAddProjectModal = () => {
        setModalOn((prev) => (!prev));
    }

    // console.log(modalOn);
    return (
        <>
            <AddProjectButton onClick={() => setModalOn(true)}>
                + 경험 기록 추가
            </AddProjectButton>
            {modalOn && <AddProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} />}
        </>
    );
};


const AddProjectButton = styled.button`
width: 228px;
height: 50px;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
cursor: pointer;
`

export default AddExperience;
