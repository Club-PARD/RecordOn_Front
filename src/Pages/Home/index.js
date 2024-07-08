import styled from "styled-components";
import Landing from "./Components/Landing";

const HomePage = () => {
  return (
    <Div>
      <Landing />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;


export default HomePage;
