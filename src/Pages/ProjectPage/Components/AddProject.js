import styled from "styled-components";
import { useRecoilState } from "recoil";
import { recoilProjectModal } from "../../../Atom/UserDataAtom";


const AddProject = () => {

    const [modalOn, setModalOn] = useRecoilState(recoilProjectModal);

    const handleAddProjectModal = () => {
        setModalOn(true);
    }

    console.log(modalOn);
    return (
        <AddProjectButton onClick={handleAddProjectModal}>
            + 프로젝트 추가
        </AddProjectButton>
    );
};


const AddProjectButton = styled.button`
width: 228px;
height: 50px;
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => props.theme.colors.Green};
font-size: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
cursor: pointer;
`

export default AddProject;
