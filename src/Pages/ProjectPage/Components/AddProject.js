import styled from "styled-components";

const AddProject = () => {
    return (
        <AddProjectButton>
            + 프로젝트 추가
        </AddProjectButton>
    );
};
const AddProjectButton = styled.div`
width: 228px;
height: 50px;
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => props.theme.colors.Green};
font-style: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
`

export default AddProject;
