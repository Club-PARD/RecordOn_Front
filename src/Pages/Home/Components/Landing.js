import styled from "styled-components";
import LandingToggle from "../../../Assets/LandingToggle.svg";
import LandingFolder from "../../../Assets/LandingFolder.png";
import LandingProblem from "../../../Assets/LandingProblem.png";
import LandingGuide from "../../../Assets/LandingGuide.png";
import LandingSearch from "../../../Assets/LandingSearch.png";
import LandingArchive from "../../../Assets/LandingArchive.png";
import LandingComehere from "../../../Assets/LandingComehere.png";
import LandingFooterDivImage from "../../../Assets/LandingFooterDiv.png";
import LoginButton from "./LoginButton";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLogined } from "../../../Atom/UserDataAtom"
import { useNavigate } from "react-router-dom";

const Landing = () => {

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLogined);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/project");
        }
    }, [isLoggedIn])

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
            <img src={LandingFolder} style={{ marginTop: "79px" }} />
            <img src={LandingProblem} style={{ marginTop: "68px" }} />
            <img src={LandingGuide} />
            <img src={LandingSearch} />
            <img src={LandingArchive} />
            <LandingFooter>
                <img src={LandingComehere} style={{ marginTop: "100px" }} />
                <LoginButton />
                <img src={LandingFooterDivImage} />
            </LandingFooter>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: ${(props) => props.theme.color.base1};
  /* gap: 60px; */
`;

const LandingTitle = styled.div`
  width: 1056px;
  height: 365px;
  /* border: 1px solid black; */
  margin-top: 100px;
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

const LandingFooter = styled.div`
  width: 1440px;
  height: 765px;
  /* border: 1px solid black; */
  background-color: #F5F5F5;
  border-radius: 50px 50px 0 0;
  margin-top: -60px;
`;

const FooterDiv = styled.div`
  width: 1440px;
  height: 184px;
  /* border: 1px solid black; */
`;

export default Landing;