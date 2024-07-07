import styled from "styled-components";
import ExperienceCardGrid from "./Components/ExperienceCardGrid";
import ExperienceFilter from "./Components/ExperienceFilter";
import ExperienceTitle from "./Components/ExperienceTitle";
import Pagination from "../../Common/Pagination";
import Dropdown from "../../Common/Dropdown";
import Calendar from "../../Common/Calendar";
import { useState } from "react";
import AddProjectModal from "./Components/DeleteProjectModal";
import { useRecoilState } from "recoil";
import { recoilProjectModal } from "../../Atom/UserDataAtom";

const ExperiencePage = () => {


  return (
    <Container>
      <ExperienceTitle />
      <ExperienceFilter />
      <ExperienceCardGrid />
      <Pagination />
    </Container>
  );
};

const Container = styled.div`
justify-content: center;
`


export default ExperiencePage;
