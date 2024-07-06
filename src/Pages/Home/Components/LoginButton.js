import styled from "styled-components"
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../../../Assets/GoogleLogo.svg"
import axios from 'axios'
import { useRecoilState } from "recoil";
import { recoilUserId } from "../../../Atom/UserDataAtom";
import { useState, useEffect } from "react";


const LoginButton = () => {

    const [userId, setUserId] = useRecoilState(recoilUserId);
    const [isNewUser, setIsNewUser] = useState(null);
    const navigate = useNavigate();


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
            //   setUserData({
            //     name: response.data.name,
            //     email: response.data.email,
            //     picture: response.data.picture,
            // //   });

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
            setUserId(response.data.user_id);

        } catch (error) {
            console.error("서버 요청 에러2:", error);
            alert("유저 정보 저장에 실패하였습니다.");
            // navigate("/");
        }
    };

    useEffect(() => {
        if (isNewUser == true) {
            console.log("New User");
        }
        else if (isNewUser == false) {
            navigate("/project")
        }
    }, [isNewUser])



    return (
        <Container>
            {/* 로그인 버튼 컴포넌트 */}
            <LoginButtonDiv onClick={googleLogin}>
                <GoogleLogo />
                <div>구글 계정으로 로그인</div>
            </LoginButtonDiv>
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

  background-color: ${(props) => props.theme.colors.Black};
  border-radius: 7.5px;
  color: white;

  font-size: ${(props) => props.theme.fontSizes.TextS};

  white-space: nowrap;
  cursor: pointer;
`;

export default LoginButton;