import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../Assets/Logo.svg"
import { useRecoilState } from "recoil";
import { isLogined, recoilLoginData } from "../Atom/UserDataAtom";
import LoginButton from "../Pages/Home/Components/LoginButton";
import Logout from "../Assets/Logout.svg"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLogined);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginData, setLoginData] = useRecoilState(recoilLoginData);
  const [profileClicked, setProfileClicked] = useState(false);


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



  const profileClickHandler = () => {
    setProfileClicked((prev) => !prev);
  }

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  // 로그인인 안되어 있을시 홈페이지로 강제 이동
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn])

  return (
    <HeaderContainer $scrolled={isScrolled}>
      <Div>
        <LogoDiv>logo</LogoDiv>
        {isLoggedIn ? (
          // 구글 로그인 구현시 프로필 사진 삽입 가능한 원형으로 수정
          <UserProfileDiv>
            <img src={loginData.imageUrl} style={{ width: "50px", height: "50px", borderRadius: "25px" }} onClick={profileClickHandler} />
            {profileClicked &&
              <UserLogout onClick={logoutHandler}>
                <img src={Logout} style={{ marginLeft: "15px", marginRight: "10px" }} />
                로그아웃
              </UserLogout>
            }

          </UserProfileDiv>

        ) : (
          <LoginButton buttonText="기록 시작하기" buttonWidth="132px" buttonColor="#303030" />
          // <LogInButton onClick={loginHandler}>기록 시작하기</LogInButton>
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

  /* border: 1px solid black; */

  background-color: #ffffff;
  z-index: 99999;
  /* box-shadow: ${(props) =>
    props.$scrolled ? "0px 1px 3px 0px #00000033" : "transparent"}; */
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.20);

  transition: box-shadow 0.3s ease;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid black; */

  width: 1200px;
  height: 70px;

  background-color: #ffffff;
`;

const UserProfileDiv = styled.div`
flex-direction: row;
justify-content: end;
align-items: center;
/* border: 1px solid black; */
width: 50px;
height: 50px;
`;

const UserLogout = styled.div`
flex-direction: row;
position: fixed;
justify-content: start;
align-items: center;
/* border: 1px solid black; */
border-radius: 5px;
margin-top: 130px;
width: 126px;
height: 40px;
color: ${(props) => props.theme.color.black};
background-color: ${(props) => props.theme.color.base3};
`;

const LogoDiv = styled(Logo)`
  justify-content: center;
  width: 166.64px;
  height: 40px;
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
