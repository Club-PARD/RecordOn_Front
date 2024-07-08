import styled from "styled-components";
import LandingToggle from "../../../Assets/LandingToggle.svg";
import LandingFolder from "../../../Assets/LandingFolder.png";
import LoginButton from "./LoginButton";

const Landing = () => {
    return (
        <Container>
            <LandingTitle >
                <img src={LandingToggle} />
                <CatchPhrase>
                    Remember Done,
                </CatchPhrase>
                <CatchPhrase2>
                    Record On!
                </CatchPhrase2>
                <LandingTitleText>
                    당신의 경험은 어디에 저장되고 있나요?<br />
                    기억이 아닌 기록으로 경험을 아카이빙하세요!
                </LandingTitleText>
                <LoginButton />
            </LandingTitle>
            <img src={LandingFolder} />
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: ${(props) => props.theme.color.base1};
  gap: 60px;
`;

const LandingTitle = styled.div`
  width: 1056px;
  height: 365px;
  border: 1px solid black;
`;

const CatchPhrase = styled.div`
  width: 1056px;
  height: 60px;
  /* border: 1px solid black; */
  margin-top: 25px;
  color: ${(props) => props.theme.color.base5};
  font-size: 60px;
  font-weight: 600;
  letter-spacing: -1.2px;
`;
const CatchPhrase2 = styled.div`
  width: 1056px;
  height: 60px;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.black};
  font-size: 60px;
  font-weight: 600;
  letter-spacing: -1.2px;
`;

const LandingTitleText = styled.div`
  width: 1056px;
  height: 62px;
  /* border: 1px solid black; */
  margin-top: 24px;
  margin-bottom: 40px;
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
  text-align: center;
  line-height: 130%; 
  letter-spacing: -0.48px;
`;

export default Landing;
