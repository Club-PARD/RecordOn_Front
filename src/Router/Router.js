import { Routes, Route } from "react-router-dom";
import ThemeExample from "../Style/ThemeExample";
import HomePage from "../Pages/Home";
import RegisterPage from "../Pages/RegisterPage";
import ProjectPage from "../Pages/ProjectPage";
import ExperiencePage from "../Pages/ExperiencePage";
import WritingPage from "../Pages/WritingPage";
import Layout from "../Layout";
import DeleteModal from "../Common/DeleteModal";
import ViewPage from "../Pages/WritingPage/finishIndex";
import LinkPage from "../Pages/ExperiencePage/Link";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/writing" element={<WritingPage />}/>
        <Route path ="/modal" element={<DeleteModal />}/>
        <Route path ="/view" element={<ViewPage />} />
        <Route path = "/link" element={<LinkPage />} />
        {/* theme 사용 에시 페이지 */}
        <Route path="/theme" element={<ThemeExample />} />
      </Route>
    </Routes>
  );
}

export default Router;
