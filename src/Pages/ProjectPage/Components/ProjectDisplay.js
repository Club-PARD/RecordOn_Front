import styled from "styled-components";
import ProjectCardGrid from "./ProjectCardGrid";
import Pagination from "../../../Common/Pagination";

const ProjectDisplay = () => {
    return (
        <ProjectDisplayDiv>
            <ProjectCardGrid />
            <Pagination />
        </ProjectDisplayDiv>
    );
};

const ProjectDisplayDiv = styled.div`
/* height: 1000px; */
`



export default ProjectDisplay;
