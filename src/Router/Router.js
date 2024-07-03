import { Routes, Route } from "react-router-dom";
import ThemeExample from "../Style/ThemeExample";
import HomePage from "../Pages/Home";
import RegisterPage from "../Pages/RegisterPage";
import Header from "../Common/Header";
import styled from "styled-components";
import ProjectPage from "../Pages/ProjectPage";
import ExperiencePage from "../Pages/ExperiencePage";
import Layout from "../Layout";

function Router() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          {/* theme 사용 에시 페이지 */}
          <Route path="/theme" element={<ThemeExample />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
