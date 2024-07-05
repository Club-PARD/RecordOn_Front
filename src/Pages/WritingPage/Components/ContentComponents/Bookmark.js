import React, { useState, useEffect } from 'react';
import { getUrlMetaData } from '../../../../Axios/ReferenceApi';

const Bookmark = ({ url }) => {
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const getMetaData = async () => {
      const data = await getUrlMetaData(url);
      setMetaData(data);
      console.log (url);
    };
    getMetaData();
  }, [url]);

  if (!metaData) return <div>Loading...</div>;

  return (
    <div className="bookmark">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={metaData.imageUrl} alt={metaData.title} />
        <div>{metaData.title}</div>
      </a>
    </div>
  );
};

export default Bookmark;
