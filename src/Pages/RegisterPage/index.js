import styled from "styled-components"
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

    // const navigate = useNavigate();

    const login = useGoogleLogin({
        // 구글 로그인 실행
        scope: "email profile",
        onSuccess: (res) => {
            console.log(res);
            console.log(res.access_token);
            // setAccessToken(res.access_token);
            // handleLogin(res.access_token); //억세스 토큰을 로컬스토리지에 저장하고 악시오스로 구글에게 보냄.
        },
        onFailure: (err) => {
            console.log(err);
            alert("구글 로그인에 실패하였습니다.");
            // navigate("/");
        },
        flow: "auth-code",

    })


    return (
        <Container>
            안녕하세요
            <LoginButton onClick={login}>로그인</LoginButton>
        </Container>

    )


}

const Container = styled.div`
width: ${(props) => props.width || ''};
height: ${(props) => props.height || ''};
display: ${(props) => props.display || ''};
flex-direction: ${(props) => props.flexDirection || ''};
justify-content: ${(props) => props.justifyContent || ''};
align-items: ${(props) => props.alignItems || ''};
align-content: ${(props) => props.alignContent || ''};
background-color: ${(props) => props.backgroundColor || ''};
/* border: ${(props) => props.border || '1px solid black'}; */
color: ${(props) => props.theme.colors.primary_normal};
font-size: ${(props) => props.theme.fontSizes.title1};
/* font-weight: ; */
margin: ${(props) => props.margin || ""};
padding: ${(props) => props.padding || ""};
box-sizing: border-box;
position: ${(props) => props.position || ''};
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
  color: ${(props) => props.theme.colors.primary_normal};
  font-size: ${(props) => props.theme.fontSizes.title1};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

export default RegisterPage;