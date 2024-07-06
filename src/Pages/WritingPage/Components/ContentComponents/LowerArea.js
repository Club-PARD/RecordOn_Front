import { useState, useEffect } from "react";
import styled from "styled-components";
import getUrlMetaData from "../../../../Axios/ReferenceApi";
import Bookmark from "./Bookmark";
import TiptapEditor from "./TiptapEditor";
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
} from "../../../../Atom/ExpRecordAtom";

const LowerArea = () => {
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );

  const [freeContent, setFreeContent] = useState("");
  
  // 링크 입력 영역
  const [linkArea, setLinkArea] = useState([
    {
      id: 1,
      linkUrl: "",
    },
  ]);

  // 링크 입력 영역 추가
  const addLinkArea = () => {
    setLinkArea([
      ...linkArea,
      {
        id: linkArea.length + 1,
        linkUrl: "",
      },
    ]);
  };

  // 링크 입력 값 변경 핸들러
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...linkArea];
    updatedLinks[index].linkUrl = value;
    setLinkArea(updatedLinks);
    console.log(value, typeof value);
  };

  // 자유란 변경 상태 관리
  const handleFreeChange = (e) => {
    setFreeContent(e.target.value);
  };

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      const links = linkArea.map((link) => link.linkUrl).filter(Boolean);
      setExperience((prev) => ({
        ...prev,
        free_content: freeContent,
        reference_links: links,
      }));
    }
  }, [isExpRecordSubmitted, freeContent, linkArea]);

  return (
    <>
      {/* 하단 영역 : 자유란과 관련 자료 링크 */}
      <Lower>
        <FixArea>
          <FixAreaLabel>자유란</FixAreaLabel>
          <TextAreaWidth
            placeholder="질문을 통해 다 작성하지 못한 내용을 자유란에 작성해보세요. 자유란만 작성하는 것은 불가능해요."
            height="168px"
            value={freeContent}
            onChange={handleFreeChange}
          />
        </FixArea>

        <div>
          <FixArea>
            <FixAreaLabel>관련 자료 링크</FixAreaLabel>
            {linkArea.map((link, index) => (
              <div key={link.id}>
                <StyledUrlInput
                  type="url"
                  placeholder="해당 기록에 대한 참고자료 URL 링크를 임베드해보세요."
                  value={link.linkUrl}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                />
                {/* <Bookmark url={link.linkUrl} /> */}
              </div>
            ))}
          </FixArea>
          <AddButtonWrapper>
            <AddButton onClick={addLinkArea}>+ 관련 자료 추가</AddButton>
          </AddButtonWrapper>
        </div>
      </Lower>
    </>
  );
};

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  margin-top: 44px;
`;

const FixArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  width: 840px;
`;

const FixAreaLabel = styled.label`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const TextAreaWidth = styled.textarea`
  box-sizing: border-box;
  width: 840px;
  height: ${({ height }) => height};

  border: 1px solid;
  border-radius: 10px;

  padding: 22px 24px 31px 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;

  &::placeholder {
    color: ${(props) => props.theme.colors.Gray};
  }
`;

const AddButtonWrapper = styled.div`
  margin-top: 29px;
  margin-bottom: 49px;
`;

const AddButton = styled.button`
  justify-content: center;
  width: 840px;
  height: 50px;

  border: 1px solid;
  border-radius: 10px;

  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  cursor: pointer;
`;

const StyledUrlInput = styled.input`
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  width: 840px;
  height: 86px;

  border: 1px solid black;
  border-radius: 10px;

  padding: 22px 24px 31px 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;

  &::placeholder {
    color: ${(props) => props.theme.colors.Gray};
  }
`;

export default LowerArea;
export { FixArea, FixAreaLabel, TextAreaWidth };
