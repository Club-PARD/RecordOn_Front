import { useState, useEffect } from "react";
import styled from "styled-components";
import Bookmark from "./Bookmark";
import { useRecoilState } from "recoil";
import {
  answerState,
  handleExpRecordEditSubmit,
} from "../../../../../../Atom/ExpRecordAtom";
import { ReactComponent as CloseIcon } from "../../../../../../Assets/close.svg";

const LowerArea = () => {
  const [answer, setAnswer] = useRecoilState(answerState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordEditSubmit
  );

  const [freeContent, setFreeContent] = useState("");
  const [linkArea, setLinkArea] = useState([
    {
      id: 1,
      linkUrl: "",
      isSubmitted: false,
    },
  ]);

  useEffect(() => {
    if (answer) {
      setFreeContent(answer.free_content || "");

      if (answer.reference_link && answer.reference_link.length > 0) {
        const initialLinks = answer.reference_link.map((link, index) => ({
          id: index + 1,
          linkUrl: link,
          isSubmitted: true,
        }));
        setLinkArea(initialLinks);
      } else {
        setLinkArea([{ id: 1, linkUrl: "", isSubmitted: false }]);
      }
    }
  }, [answer]);

  // 자유란 변경 상태 관리
  const handleFreeChange = (e) => {
    setFreeContent(e.target.value);
  };

  // 링크 입력 값 변경 핸들러
  const handleLinkChange = (index, value) => {
    setLinkArea((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks[index].linkUrl = value;
      return updatedLinks;
    });
  };
  // 링크 입력 영역 추가
  const addLinkArea = () => {
    setLinkArea((prevLinks) => [
      ...prevLinks,
      {
        id: prevLinks.length + 1,
        linkUrl: "",
        isSubmitted: false,
      },
    ]);
  };
  // 링크 삭제 핸들러
  const handleDeleteLink = (index) => {
    setLinkArea((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
  };

  // 붙여넣기 이벤트 핸들러
  const handlePaste = (event, index) => {
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    if (paste) {
      handleLinkChange(index, paste);
      handlePasteComplete(index);
    }
  };

  // 붙여넣기가 완료되면 호출될 함수
  const handlePasteComplete = (index) => {
    setLinkArea((prevLinks) => {
      const updatedLinks = [...prevLinks];
      if (updatedLinks[index].linkUrl) {
        updatedLinks[index].isSubmitted = true;
      }
      return updatedLinks;
    });
  };

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      const links = linkArea.map((link) => link.linkUrl).filter(Boolean);
      setAnswer((prev) => ({
        ...prev,
        free_content: freeContent,
        reference_links: links,
      }));
    }
  }, [isExpRecordSubmitted, freeContent, linkArea, setAnswer]);

  return (
    <>
      {/* 하단 영역 : 자유란과 관련 자료 링크 */}
      <Lower>
        <StyledHr />

        <FixArea>
          <FixAreaLabel>자유 작성란</FixAreaLabel>
          <TextAreaWidth
            height="150px"
            value={freeContent}
            onChange={handleFreeChange}
          />
          <DivForMargin height={"60px"} />
        </FixArea>

        <StyledHr />

        <div>
          <FixArea>
            <FixAreaLabel>관련 자료 링크</FixAreaLabel>
            {linkArea.map((link, index) => (
              <div key={link.id}>
                {link.isSubmitted ? (
                  <BookmarkComponent>
                    <Bookmark url={link.linkUrl} />

                    <XWrapper onClick={() => handleDeleteLink(index)}>
                      <CloseIcon alt="링크 삭제" />
                    </XWrapper>
                  </BookmarkComponent>
                ) : (
                  <StyledUrlInput
                    type="url"
                    placeholder="해당 기록에 대한 참고자료 URL 링크를 복사 - 붙여넣기 해보세요."
                    value={link.linkUrl}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    onPaste={(e) => handlePaste(e, index)}
                  />
                )}
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

const XWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  z-index: 2;
  cursor: default;
`;
const Lower = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 50px;
`;

const StyledHr = styled.hr`
  border: 0;
  width: 840px;
  height: 1px;
  background-color: ${(props) => props.theme.color.base4};

  margin-bottom: 46px;
`;
const FixArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  width: 840px;
`;

const FixAreaLabel = styled.label`
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
  color: ${(props) => props.theme.color.black};
  line-height: 31.2px;
  word-break: keep-all;
  flex-direction: row;
`;

const BookmarkComponent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 24px 0 24px;
  width: 840px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.color.base2};

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  margin-bottom: -10px;

  cursor: pointer;
`;

const DivForMargin = styled.div`
  height: ${({ height }) => height};
`;
const TextAreaWidth = styled.textarea`
  box-sizing: border-box;
  width: 840px;
  height: ${({ height }) => height};

  border-radius: 10px;

  padding: 22px 24px 31px 24px;

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  background-color: ${(props) => props.theme.color.base2};

  resize: none;
  overflow-y: auto;

  line-height: 1.5;

  &::placeholder {
    color: ${(props) => props.theme.color.base6};
  }
`;

const AddButtonWrapper = styled.div`
  margin-top: 19px;
  margin-bottom: 105px;
`;

const AddButton = styled.button`
  justify-content: center;
  width: 840px;
  height: 50px;

  border-radius: 10px;

  background-color: ${(props) => props.theme.color.base2};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  cursor: pointer;
`;

const StyledUrlInput = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 24px 0 24px;
  width: 840px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.color.base2};

  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};

  &::placeholder {
    color: ${(props) => props.theme.color.base6};
  }

  margin-bottom: -10px;
`;

export default LowerArea;
export { FixArea, FixAreaLabel, TextAreaWidth, StyledHr, BookmarkComponent };
