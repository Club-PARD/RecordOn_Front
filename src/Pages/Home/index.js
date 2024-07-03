import styled from "styled-components";
import { ReactComponent as MainEx } from "../../Assets/MainEx.svg";
import { ReactComponent as GoogleLogo } from "../../Assets/GoogleLogo.svg";

const HomePage = () => {
  return (
    <Div>
      <MainEx />
      <LoginButton>
        <GoogleLogo />
        <div>구글 계정으로 로그인</div>
      </LoginButton>
    </Div>
  );
};

const Div = styled.div`
display: flex;
flex-direction: column;
gap: 60px;
background-color: aliceblue;
`;

const LoginButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5.31px;

  width: 228px;
  height: 45px;

  background-color: ${(props) => props.theme.colors.Black};
  border-radius: 7.5px;
  color: white;

  font-style: ${(props) => props.theme.fontStyles.TextS};

  white-space: nowrap;
  cursor: pointer;
`;
export default HomePage;
