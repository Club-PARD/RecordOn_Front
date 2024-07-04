import styled from "styled-components";
import ProjectCard from "./ProjectCard";

const ProjectCardGrid = () => {
    return (
        <ProjectCardDiv>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </ProjectCardDiv>
    );
};
const ProjectCardDiv = styled.div`
display: grid;
grid-template-columns: 3fr 3fr 3fr;
grid-template-rows: 4fr 4fr;
width: 1200px;
height: 508px;
/* border: 1px solid black; */
margin-top: 55px;
column-gap: 24px;
row-gap: 20px;
`

export default ProjectCardGrid;
