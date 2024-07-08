import styled from "styled-components"
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RegisterModal from "./Components/RegisterModal";
import ProjectEndModal from "./Components/ProjectEndModal";


const RegisterPage = () => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleRegisterClick = () => {
        setIsLoggedIn(true);
        setShowRegisterModal(true);
      };

      const handleProjectClick = () => {
        setIsLoggedIn(true);
        setShowProjectModal(true);
      };

    // const navigate = useNavigate();

    const login = async () => {
        window.location.href = "https://api-recordon.shop/api/login";

        // try {
        //     const response = await axios.get(`https://api-recordon.shop/api/login`);

        //     console.log(response);
        // }
        // catch (error) {
        //     console.log(error);
        // }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://api-recordon.shop/api/oauth2/success', { withCredentials: true });
            console.log(response);
            // setUserData({
            //     email: response.data.user.email,
            //     name: response.data.user.name,
            //     picture: response.data.user.picture,
            //     isNewUser: response.data.isNewUser
            // });
        } catch (error) {
            console.error("Error fetching user data:", error);
            // navigate('/');
        }
    };



    return (
        <Container>
            <ModalButton1 onClick={handleRegisterClick}>로그인</ModalButton1>
            <RegisterModal  show={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
            <MarginBetween />
            <LoginButton onClick={handleProjectClick}>프로젝트</LoginButton>
            <ProjectEndModal  show={showProjectModal} onClose={() => setShowProjectModal(false)} />
        </Container>

    )


}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const LoginButton = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5.31px;

  width: 228px;
  height: 45px;

  background-color: ${(props) => props.theme.colors.Black};
  border-radius: 7.5px;
  color: white;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};

  white-space: nowrap;
  cursor: pointer;
`;

const ModalButton1 = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5.31px;

  width: 228px;
  height: 45px;

  background-color: ${(props) => props.theme.colors.Black};
  border-radius: 7.5px;
  color: white;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};

  white-space: nowrap;
  cursor: pointer;
`;

const MarginBetween = styled.div`
width: 1200px;
height: 50px;

background-color: ${(props) => props.theme.colors.White};
`;
export default RegisterPage;
