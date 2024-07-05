import styled from "styled-components";

const AddProjectModal = () => {
    return (
        <Container>
            Modal
        </Container>
    );
};

const Container = styled.div`
position: fixed;
width: 100%;
height: 100vh;
background-color: #000000;
z-index: 100000000000;
`

const AddProjectButton = styled.div`
width: 228px;
height: 50px;
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => props.theme.colors.Green};
font-size: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
`

export default AddProjectModal;
