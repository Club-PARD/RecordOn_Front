import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUrlMetaData } from "../../../../Axios/ReferenceApi";
import { ReactComponent as CloseIcon } from "../../../../Assets/close.svg";

const Bookmark = ({ url }) => {
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const getMetaData = async (url) => {
      const data = await getUrlMetaData(url);
      setMetaData(data);
    };
    getMetaData(url);
  }, [url]);

  if (!metaData) return <div></div>;

  return (
    <StyledBookmark>
      <StyledA href={url} target="_blank" rel="noopener noreferrer">
        <img src={metaData.imageUrl} alt={metaData.title} />
        <div>{metaData.title}</div>
      </StyledA>
      <XWrapper>
        <CloseIcon />
      </XWrapper>
    </StyledBookmark>
  );
};

const StyledBookmark = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 24px 0 24px;
  width: 840px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.BoxGray};

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  cursor: pointer;
`;

const StyledA = styled.a`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const XWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  z-index: 2;
  cursor: default;
  /* background-color: black; */
`;
export default Bookmark;
