import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

const ProjectCardGrid = () => {

    const [projectCardNum, setProjectCardNum] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    const [visibleCardStart, setVisibleCardStart] = useState(0);
    const [visibleCardEnd, setVisibleCardEnd] = useState(6);

    const gotoProject = () => {

    }

    return (
        <ProjectCardDiv>
            {projectCardNum.slice(visibleCardStart, visibleCardEnd).map(cardNum => (
                <ProjectCard onClick={gotoProject(cardNum)} key={cardNum}>
                </ProjectCard>
            ))}

        </ProjectCardDiv>
    );
};
const ProjectCardDiv = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
width: 1200px;
height: 508px;
/* border: 1px solid black; */
margin-top: 55px;
column-gap: 24px;
row-gap: 20px;
`

export default ProjectCardGrid;
