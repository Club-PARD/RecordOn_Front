// Loading.js
import React from "react";
import styled from "styled-components";
import Spinner from '../Assets/spinner.svg';

export const Loading = () => {
  return (
    <Background>
      <img src={Spinner} alt="로딩중" width="5%" />
      <LoadingText>쫌만 기다리라고</LoadingText>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #111111;
  opacity: 0.4;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  text-align: center;
`;
export default Loading;
