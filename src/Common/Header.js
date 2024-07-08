import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../Assets/Logo.svg"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  // 스크롤시 box shadow 나타나게 함
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
    <HeaderContainer $scrolled={isScrolled}>
      <Div>
        <LogoDiv>logo</LogoDiv>
        {isLoggedIn ? (
          // 구글 로그인 구현시 프로필 사진 삽입 가능한 원형으로 수정

          <div onClick={myPageHandler}>프로필 이미지</div>
        ) : (
          <LogInButton onClick={loginHandler}>기록 시작하기</LogInButton>
        )}
      </Div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  position: fixed;
  top: 0;

  border: 1px solid black;

  background-color: #ffffff;
  z-index: 99999;
  box-shadow: ${(props) =>
    props.$scrolled ? "0px 1px 3px 0px #00000033" : "transparent"};
  transition: box-shadow 0.3s ease;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;

  width: 1200px;
  height: 70px;

  background-color: #ffffff;
`;

const LogoDiv = styled(Logo)`
  justify-content: center;
  width: 166.64px;
  height: 50px;
`;

const LogInButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 132px;
  height: 40px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.color.base7};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  text-align: center;
  color: white;
  cursor: pointer;
`;

export default Header;
