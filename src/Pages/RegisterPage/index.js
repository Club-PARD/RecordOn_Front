import styled from "styled-components"
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

    // const navigate = useNavigate();


    return (
        <Container>
            안녕하세요
            {/* <LoginButton onClick={login}>로그인</LoginButton> */}
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
