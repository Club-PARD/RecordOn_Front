import styled from "styled-components";
import ExperienceTitle from "./Components/ExperienceTitle";
import ExperienceBody from "./Components/ExperienceBody";
import { useWindowSize } from "@workday/canvas-kit-react";

const ExperiencePage = () => {

  const { width } = useWindowSize();

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
