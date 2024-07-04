import styled from "styled-components"
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import RegisterModal from "./Components/RegisterModal";


const RegisterPage = () => {

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
            <RegisterModal />
        </Container>

    )


}

const Container = styled.div`
`

const LoginButton = styled.button`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 300px;
  background: var(--White, #fff);
  width: 82px;
  height: 35px;
  border: none;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

export default RegisterPage;
