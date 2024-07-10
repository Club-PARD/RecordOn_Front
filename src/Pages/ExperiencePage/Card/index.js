import styled from "styled-components";
import ExperienceTitle from "./Components/ExperienceTitle";
import ExperienceBody from "./Components/ExperienceBody";
import { useWindowSize } from "@workday/canvas-kit-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ExperiencePage = () => {

  const { width } = useWindowSize();
  const { location } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Container width={width} >
      <ExperienceTitle />
      <ExperienceBody />
    </Container>
  );
};

const Container = styled.div`
width: ${props => props.width}px;
justify-content: center;
/* border: 1px solid black; */
`


export default ExperiencePage;
