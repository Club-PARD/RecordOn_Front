import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 100;
      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const writeHandler = () => {
    navigate("/WritingPage");
  };

  const myPageHandler = () => {
    navigate("/MyPage");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <Div $scrolled={isScrolled}>
      <LogoDiv>logo</LogoDiv>
      {isLoggedIn ? (
        <div onClick={myPageHandler}>프로필 이미지</div>
      ) : (
        <LogInButton onClick={loginHandler}>로그인</LogInButton>
      )}
    </Div>
  );
};

const Div = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  min-width: 80%;
  height: 70px;
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => (props.$scrolled ? "#7f8c8d" : "transparent")};
  transition: background-color 0.3s ease;
`;

const LogoDiv = styled.div`
  justify-content: center;
  width: 153px;
  height: 40px;
  border-radius: 7.5px;
  background-color: #d9d9d9;
`;

const LogInButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102px;
  height: 40px;
  border-radius: 25px;
  background-color: #0bc35f;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.02em;
  text-align: center;
  color: white;
  cursor: pointer;
`;

export default Header;
