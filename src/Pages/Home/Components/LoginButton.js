import styled from "styled-components"
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../../../Assets/GoogleLogo.svg"
import axios from 'axios'
import { useRecoilState } from "recoil";
import { isLogined, recoilLoginData, recoilUserData, recoilUserExperienceFilter, recoilUserProjectFilter } from "../../../Atom/UserDataAtom";
import { experienceState } from "../../../Atom/ExpRecordAtom";
import { useState, useEffect } from "react";
import RegisterModal from "./RegisterModal";

const LoginButton = ({ buttonText, buttonWidth, buttonColor }) => {

    const [userData1, setUserData] = useRecoilState(recoilUserData);
    const [loginData, setLoginData] = useRecoilState(recoilLoginData);
    const [projectFilter, setProjectFilter] = useRecoilState(recoilUserProjectFilter);
    const [experienceFilter, setExperienceFilter] = useRecoilState(recoilUserExperienceFilter);
    const [experienceStateRecoil, setExperienceStateRecoil] = useRecoilState(experienceState);
    const [isNewUser, setIsNewUser] = useState(null);
    const navigate = useNavigate();
    console.log(userData1);
    console.log(loginData);

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLogined);

    const handleRegisterClick = () => {

        setShowRegisterModal(true);
    };

    const googleLogin = useGoogleLogin({
        // 구글 로그인 실행
        onSuccess: (res) => {
            console.log(res);
            console.log(res.access_token);
            // setAccessToken(res.access_token);
            handleLogin(res.access_token); //억세스 토큰을 로컬스토리지에 저장하고 악시오스로 구글에게 보냄.
        },
        onFailure: (err) => {
            console.log(err);
            alert("구글 로그인에 실패하였습니다.");
            // navigate("/");
        },

    })

    const handleLogin = (token) => {
        sendTokenToGoogle(token);
    }

    const sendTokenToGoogle = async (token) => {
        //구글에게 억세스토큰 보내서 사용자정보 받아옴
        try {
            const response = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("서버 응답:", response.data);

            // 빋은 데이터를 서버로 보내서 디비에 저장
            sendUserDataToServer({
                email: response.data.email,
                name: response.data.name,
                imageUrl: response.data.picture,
            });
        } catch (error) {
            // console.error("서버 요청 에러:", error);
            alert("사용자 정보 요청에 실패하였습니다.");
            // navigate("/");
        }
    };

    const sendUserDataToServer = async (userData) => {
        console.log(userData);

        //유저의 구글정보를 서버로 보내서 디비에 저장
        try {
            const jsonUserData = JSON.stringify(userData);
            console.log(`${process.env.REACT_APP_DEV_URL}auth/login`);
            console.log(jsonUserData);
            const response = await axios.post(
                `${process.env.REACT_APP_DEV_URL}auth/login`,
                jsonUserData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("서버 응답2:", response.data);
            setIsNewUser(response.data.is_new_user);
            // console.log(userData1);
            setLoginData(userData);
            // console.log(userData);
            setUserData({
                ...userData1,
                user_id: response.data.user_id
            });
            setProjectFilter({
                ...projectFilter,
                user_id: response.data.user_id
            })
            setExperienceFilter({
                ...experienceFilter,
                user_id: response.data.user_id,
            })
            setExperienceStateRecoil({
                ...experienceStateRecoil,
                user_id: response.data.user_id,
            })


        } catch (error) {
            console.error("서버 요청 에러2:", error);
            alert("유저 정보 저장에 실패하였습니다.");
            // navigate("/");
        }
    };

    useEffect(() => {
        if (isNewUser == true) {
            console.log("New User");
            handleRegisterClick();
        }
        else if (isNewUser == false) {
            console.log("Previous User");
            setIsLoggedIn(true);
            navigate("/project");
        }
    }, [isNewUser])

    console.log(buttonText);

    return (
        <Container>
            {/* 로그인 버튼 컴포넌트 */}
            {buttonText == undefined
                ?
                <LoginButtonDiv onClick={googleLogin} >
                    <div>지금 바로 기록 시작하기</div>
                </LoginButtonDiv>
                :
                <LoginButtonDiv onClick={googleLogin} style={{ width: `${buttonWidth}`, backgroundColor: `${buttonColor}` }}>
                    <div >{buttonText}</div>
                </LoginButtonDiv>
            }

            {/* <ModalButton1 onClick={handleRegisterClick}>로그인</ModalButton1> */}
            <RegisterModal show={showRegisterModal} onClose={() => setShowRegisterModal(false)} defaultName={loginData.name} />

        </Container>

    )


}

const Container = styled.div`
`

const LoginButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5.31px;

  width: 228px;
  height: 45px;

  background-color: ${(props) => props.theme.color.main};
  border-radius: 7.5px;
  color: white;

  font-size: ${(props) => props.theme.fontSizes.TextM};

  white-space: nowrap;
  cursor: pointer;
  user-select : none;
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

export default LoginButton;