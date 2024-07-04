import styled from "styled-components";
import ProjectCardGrid from "./Components/ProjectCardGrid";
import ProjectFilter from "./Components/ProjectFilter";
import ProjectTitle from "./Components/ProjectTitle";
import Pagination from "../../Common/Pagination";
import ProjectDisplay from "./Components/ProjectDisplay";

const ProjectPage = () => {
  return (
    <>
      <ProjectTitle />
      <ProjectFilter />
      <ProjectCardGrid />
      <Pagination />

    </>
  );
};


export default ProjectPage;
