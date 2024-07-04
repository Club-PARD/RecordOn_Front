import styled from "styled-components";
import ProjectCardGrid from "./Components/ProjectCardGrid";
import ProjectFilter from "./Components/ProjectFilter";
import ProjectTitle from "./Components/ProjectTitle";

const ProjectPage = () => {
  return (
    <>
      <ProjectTitle />
      <ProjectFilter />
      <ProjectCardGrid />

    </>
  );
};


export default ProjectPage;
