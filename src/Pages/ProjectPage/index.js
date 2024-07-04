import styled from "styled-components";
import ProjectCardGrid from "./Components/ProjectCardGrid";
import ProjectFilter from "./Components/ProjectFilter";
import ProjectTitle from "./Components/ProjectTitle";
import Pagination from "../../Common/Pagination";
import Dropdown from "../../Common/Dropdown";
import Calendar from "../../Common/Calendar";

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
