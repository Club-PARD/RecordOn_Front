import styled from "styled-components";
import ProjectTitle from "./Components/ProjectTitle";
import ProjectBody from "./Components/ProjectBody";
import { useWindowSize } from "@workday/canvas-kit-react";

const ProjectPage = () => {

  const { width } = useWindowSize();

  return (
    <Container width={width}>
      <ProjectTitle />
      <ProjectBody />
    </Container>
  );
};

const Container = styled.div`
width: ${props => props.width}px;
justify-content: center;
`


export default ProjectPage;
