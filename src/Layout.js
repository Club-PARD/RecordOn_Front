import { Outlet } from "react-router-dom";
import Header from "./Common/Header";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

const Content = styled.main`
  margin-top: 70px;
  /* border: 1px solid black; */
`;

export default Layout;
