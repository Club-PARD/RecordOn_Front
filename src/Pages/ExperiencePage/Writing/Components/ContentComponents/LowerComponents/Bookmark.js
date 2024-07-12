import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUrlMetaData } from "../../../../../../Axios/ReferenceApi";
import Favicon from "../../../../../../Assets/faviconRO.svg"

const Bookmark = ({ url }) => {
  const [metaData, setMetaData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultImageUrl = Favicon;
 
  // 서버로부터 데이터 받아오는 로직
 useEffect(() => {
  const getMetaData = async (url) => {
    const data = await getUrlMetaData(url);
    setMetaData(data);
  };
  getMetaData(url);
}, [url]);
  

  
  useEffect(() => {
    if (metaData) {
      const img = new Image();
      img.src = metaData.imageUrl || defaultImageUrl;
      img.onload = () => setImageLoaded(true);
      return () => {
        img.onload = null;
      };
    }
  }, [metaData]);

  if (!metaData) return <MariginDiv></MariginDiv>;

   // title 디코딩
   const decodedTitle = decodeURIComponent(metaData.title);

  return (
    <StyledA href={url} target="_blank" rel="noopener noreferrer">
      <img src={metaData.imageUrl || defaultImageUrl} alt={metaData.title} style={{ display: imageLoaded ? "block" : "none" }} />
      {!imageLoaded && <MariginDiv></MariginDiv>}
      {/* <div>{metaData.title}</div> */}
      <div>{decodedTitle}</div>
    </StyledA>
  );
};
const MariginDiv = styled.div`
  height: 50px;
`;

const StyledA = styled.a`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  overflow-x: hidden;
  width: 750px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export default Bookmark;
