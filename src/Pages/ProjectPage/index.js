import styled from "styled-components";
import ProjectCardGrid from "./Components/ProjectCardGrid";
import ProjectFilter from "./Components/ProjectFilter";
import ProjectTitle from "./Components/ProjectTitle";
import Pagination from "../../Common/Pagination";
import Dropdown from "../../Common/Dropdown";
import Calendar from "../../Common/Calendar";
import { useState } from "react";
import AddProjectModal from "./Components/AddProjectModal";
import { useRecoilState } from "recoil";
import { recoilProjectModal } from "../../Atom/UserDataAtom";

const ProjectPage = () => {


  return (
    <Container>
      <ProjectTitle />
      <ProjectFilter />
      <ProjectCardGrid />
      <Pagination backgroundColor="#FBFBFB" />
    </Container>
  );
};

const Container = styled.div`
justify-content: center;
`


export default ProjectPage;
