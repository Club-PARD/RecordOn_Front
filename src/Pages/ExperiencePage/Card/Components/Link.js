import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getAllLink } from "../../../../Axios/ProjectDataApi";
import { recoilUserData, recoilUserExperienceFilter } from "../../../../Atom/UserDataAtom";
import Clip from "../../../../Assets/Clip.svg"
import Favicon from "../../../../Assets/faviconRO.svg"

const LinkPage = ({ isOpen, onClose }) => {

  const [metaData, setMetaData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultImageUrl = Favicon;
  const [userData] = useRecoilState(recoilUserData);
  const [projectID, setProjectID] = useRecoilState(recoilUserExperienceFilter);
  const [isMetaDataLoaded, isSetMetaDataLoaded] = useState(false);

  // useEffect(() => {
  //   const getAllLinks = async () => {
  //     const data = {
  //       user_id: "f245d2ac-d421-4cfb-99cf-c544071446ac",
  //       project_id: 1,
  //     };
  //     try {
  //       const response = await getAllLink(data);
  //       setMetaData(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getAllLinks();
  // }, []);
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const getAllLinks = async () => {
      if (!userData || !userData.user_id || !projectID) {
        return;
      }

      const data = {
        user_id: userData.user_id,
        project_id: projectID.project_id,
      };
      // console.log(data);
      try {
        const response = await getAllLink(data);
        // URL 디코딩 추가
        const decodedResponse = response.map(link => {
          const decodedUrl = decodeURIComponent(link.url);
          // console.log("Decoded URL:", decodedUrl);
          return {
            ...link,
            url: decodedUrl,
          };
        });
        setMetaData(decodedResponse);
        if (response.length === 0) {
          isSetMetaDataLoaded(true);
        }
      } catch (error) {
        // console.error(error);
      }
    };

    getAllLinks();
  }, [userData, projectID]);

  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => enableScroll();
  }, [isOpen]);


  //오버레이 영역 선택하면 모달 닫힘
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Body>
          <Title><img src={Clip} style={{ width: "30px", height: "30px", marginRight: "5px" }} />관련 자료 링크</Title>
          <LinkArea>
            {metaData && metaData.length > 0 ? (
              metaData.map((link, index) => (
                <StyledA
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={link.imageUrl || defaultImageUrl}
                    alt={link.title}
                    style={{ display: "flex" }}
                  />
                  <div>{link.title}</div>
                </StyledA>
              ))) : (
              <div></div>
            )}
            {isMetaDataLoaded && !metaData.length && <div>괸련 링크가 존재하지 않습니다.</div>}
          </LinkArea>
        </Body>
        {/* 그동안 각 경험 기록에 저장한 링크들을 한꺼번에 보여드리는 페이지입니다. */}
      </Modal>
      {/* {console.log(metaData)} */}
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
  overflow: hidden; /* 스크롤 방지 */
`;

const Modal = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 606px;
  /* width: 42%; */
  height: 100vh;
  z-index: 999999;
  right: 0;

  border-radius: 30px 0 0 30px;
  background-color: ${(props) => props.theme.colors.White};
  overflow-y: auto; /* 모달 내용 스크롤 가능 */
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  /* width: 80%; */
  width: 510px;

  margin-top: 82px;
`;

const LinkArea = styled.div`
  display: flex;
  gap: 20px;
`;
const Title = styled.div`
flex-direction: row;
  font-size: ${(props) => props.theme.fontSizes.TitleS};
  font-weight: ${(props) => props.theme.fontWeights.TitleS};
  margin-bottom: 30px;
`;

const StyledA = styled.a`
  box-sizing: border-box;
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 510px;
  height: 50px;

  background-color: ${(props) => props.theme.color.base2};
  border-radius: 10px;

  padding-left: 24px;

  img {
    width: 30px;
    height: 30px;
  }

  cursor: pointer;

  overflow-x: hidden;
`;

export default LinkPage;
