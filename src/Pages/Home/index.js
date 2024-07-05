import styled from "styled-components";
import { ReactComponent as MainEx } from "../../Assets/MainEx.svg";
import LoginButton from "./Components/LoginButton";

const HomePage = () => {
  return (
    <Div>
      {/* 랜딩 페이지 예시 이미지 */}
      <StyledMainEx />

      {/* 로그인 버튼 컴포넌트 */}
      <LoginButton />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const StyledMainEx = styled(MainEx)`
  width: 680px;
  height: 254px;
`;

export default HomePage;
