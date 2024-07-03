import { Outlet, NavLink } from "react-router-dom";
import Header from "./Common/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;