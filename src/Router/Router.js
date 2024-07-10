import { Routes, Route } from "react-router-dom";
import ThemeExample from "../Style/ThemeExample";
import HomePage from "../Pages/Home";
import ProjectPage from "../Pages/ProjectPage";
import ExperiencePage from "../Pages/ExperiencePage/Card/index";
import WritingPage from "../Pages/ExperiencePage/Writing/index";
import Layout from "../Layout";
import DeleteModal from "../Common/DeleteModal";
import ViewPage from "../Pages/ExperiencePage/Viewing";
import EditPage from "../Pages/ExperiencePage/Editing";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/modal" element={<DeleteModal />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/edit" element={<EditPage />} />
        {/* <Route path="/link" element={<link />} */}
        {/* theme 사용 에시 페이지 */}
        {/* <Route path="/theme" element={<ThemeExample />} /> */}
      </Route>
    </Routes>
  );
}

export default Router;
