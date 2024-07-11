import styled from "styled-components";
import ProjectTitle from "./Components/ProjectTitle";
import ProjectBody from "./Components/ProjectBody";
import { useWindowSize } from "@workday/canvas-kit-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ProjectPage = () => {

  const { width } = useWindowSize();
  const { location } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
background-color: #FBFBFB;
`


export default ProjectPage;
