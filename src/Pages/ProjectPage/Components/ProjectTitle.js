import styled from "styled-components";
import AddProject from "./AddProject";

const ProjectTitle = () => {
    return (
        <ProjectTitleDiv>
            <ProjectTitleText>
                OOO님이 해낸 프로젝트예요!
            </ProjectTitleText>
            <AddProject />
        </ProjectTitleDiv>
    );
};
const ProjectTitleDiv = styled.div`
width: 1056px;
height: 129px;
margin-top: 167px;
/* border: 1px solid black; */
justify-content: space-between;
`

const ProjectTitleText = styled.div`
width: 1056px;
height: 62px;
/* border: 1px solid black; */
font-style: ${(props) => props.theme.fontSizes.TitleL};
justify-content: center;
`

export default ProjectTitle;
