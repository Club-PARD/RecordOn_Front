import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUrlMetaData } from "../../../../Axios/ReferenceApi";

const Bookmark = ({ url }) => {
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    // URL을 인코딩합니다.
    // const encodedUrl = encodeURIComponent(url);
    // console.log(encodedUrl);
    {
      console.log(url);
    }
    const getMetaData = async (url) => {
      const data = await getUrlMetaData(url);
      setMetaData(data);
    };
    getMetaData(url);
  }, [url]);

  if (!metaData) return <div>Loading...</div>;

  return (
    <StyledBookmark>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={metaData.imageUrl} alt={metaData.title} />
        <div>{metaData.title}</div>
      </a>
    </StyledBookmark>
  );
};

const StyledBookmark = styled.div`
width: 840px;
height: 50px;
border-radius: 10px;
`;

export default Bookmark;
