import { useEffect } from "react";
import styled, { keyframes } from "styled-components";



export default function Toast({
  message,
  setToast,
  height,
}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <Container height={height}>
      <p>{message}</p>
    </Container>
  );
}


const slideTop = keyframes` 
  0% {
    opacity: 0%;
    -webkit-transform: translate(-50%, -50%) translateY(0);
            transform: translate(-50%, -50%) translateY(0);
  }
  100% {
    opacity: 90%;
    -webkit-transform: translate(-50%, -50%) translateY(-80px);
            transform: translate(-50%, -50%) translateY(-80px);
  }
`;


const disappear = keyframes` 
  0% {
    opacity: 90%;
  }
  100% {
    opacity: 0%;
  }
`;


const Container = styled.div`
width: 300px;
height: 50px;
border: 1px solid black;
border-radius: 30px;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.base7};
position: absolute;
left: 50%;
top: ${(props) => props.height};
transform:translate(-50%,-50%);
justify-content: center;
align-items: center;
animation: ${slideTop} 0.3s forwards, ${disappear} 0.3s forwards 2s;
`
