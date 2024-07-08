import styled from "styled-components";
import { useState } from "react";
import EditProjectModal from "./EditProjectModal";


const EditProject = () => {

    const [modalOn, setModalOn] = useState(false);

    const handleAddProjectModal = () => {
        setModalOn((prev) => (!prev));
    }

    // console.log(modalOn);
    return (
        <>
            <EditProjectButton onClick={() => setModalOn(true)}>
                편집
            </EditProjectButton>
            {modalOn && <EditProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} />}
        </>
    );
};


const EditProjectButton = styled.button`
width: 42px;
height: 32px;
/* border: 1px solid black; */
color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
justify-content: end;
align-items: end;
margin-top: 4px;
text-decoration: underline;
cursor: pointer;
`

export default EditProject;
