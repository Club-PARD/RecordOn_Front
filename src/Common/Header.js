import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();

  const writeHandler = () => {
    navigator("/WritingPage");
  };

  const myPageHandler = () => {
    navigator("/MyPage");
  };

  return (
    <Div>
      {/* 로고 들어가는 자리. img 임포트 해서 변경 */}
      <LogoDiv>logo</LogoDiv>
      {/* 로그인 버튼. 로그인 한 경우 프로필 이미지로 변경 */}
      {isLoggedIn ? (
        <div>프로필 이미지</div>
      ) : (
        <LogInButton>로그인</LogInButton>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 1200px;
  height: 70px;
  position: fixed;
  top: 0;
  z-index: 1000;

  background-color: #ffffff;
`;

const LogoDiv = styled.div`
  justify-content: center;
  width: 153px;
  height: 40px;

  border-radius: 7.5px;
  background-color: #d9d9d9;
`;

const LogInButton = styled.div`
  justify-content: center;
  width: 102px;
  height: 40px;

  border-radius: 25px;

  // 나중에 props로 대체
  background-color: #0bc35f;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.02em;
  text-align: center;
  color: white;

  cursor: pointer;
`;

export default Header;
