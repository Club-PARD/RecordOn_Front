import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllLink } from "../../Axios/ProjectDataApi";

const LinkPage = ({ onClose }) => {
  const [linkData, setLinkData] = useState([]);

  useEffect(() => {
    const getAllLinks = async () => {
      const data = {
        user_id: "f245d2ac-d421-4cfb-99cf-c544071446ac",
        project_id: 1,
      };
      try {
        const response = await getAllLink(data);
        setLinkData(response);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLinks();
  }, []);

  //오버레이 영역 선택하면 모달 닫힘
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Body>
          <Title>📎 관련 자료 링크</Title>
          {console.log(typeof linkData)}
          <div>dd</div>
          {/* 
          <StyledA href={url} target="_blank" rel="noopener noreferrer">
            <img
              src={metaData.imageUrl || defaultImageUrl}
              alt={metaData.title}
              style={{ display: imageLoaded ? "block" : "none" }}
            />
            {!imageLoaded && <MariginDiv></MariginDiv>}
            <div>{metaData.title}</div>
          </StyledA> */}
        </Body>
      </Modal>
      {console.log(linkData)}
    </Overlay>
  );
};

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999998; /* Modal보다 뒤에 배치 */

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: fixed;

  width: 42%;
  height: 100vh;
  z-index: 999999;

  right: 0;

  border-radius: 30px 0 0 30px;
  background-color: ${(props) => props.theme.colors.White};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 23px;

  width: 80%;

  margin-top: 82px;

  background-color: aliceblue;
`;
const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.TitleS};
  font-weight: ${(props) => props.theme.fontWeights.TitleS};
`;

const MariginDiv = styled.div`
  height: 50px;
`;

const StyledA = styled.a`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 750px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export default LinkPage;
