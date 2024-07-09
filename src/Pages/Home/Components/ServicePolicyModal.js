import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Close } from "../../../Assets/close.svg";

const ServicePolicyModal = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  //오버레이 영역 선택하면 모달 닫힘
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
      <StyledClose onClick={onClose} />
{/* 
      <TextContainer> */}
      <TitleDiv> 레코드온 서비스 이용약관 </TitleDiv>
      <ContentDiv>
      제 1장 총칙<br />
      <br />
제1조 (목적)<br />
본 약관은 “레코드온”(이하 “회사”라 함)이 제공하는 “RECORD ON”(이하 ‘서비스’)을 회사와 이용계약을 체결한 ‘고객’이 이용함에 있어 필요한 회사와 고객의 권리 및 의무, 기타 제반 사항을 정함을 목적으로 합니다.<br />
RECORD ON 서비스라 함은 회사가 제공하는 “레코드온” 
브랜드를 사용하는 서비스를 말합니다. <br />
회원으로서 RECORD ON 서비스를 이용하시는 여러분은 
본 약관 및 관련 운영정책을 확인 또는 동의하게 되므로, 
조금만 시간을 내서 주의 깊게 살펴봐 주시기 바랍니다.<br />
<br />
제2조(약관 외 준칙)<br />
이 약관에 명시되지 않은 사항에 대해서는 위치 정보의 보호 및 이용 등에 관한 법률, 전기통신사업법, 정보통신망 이용 촉진 및 보호 등에 관한 법률 등 관계법령 및 회사가 정한 서비스의 세부이용지침 등의 규정에 따릅니다.<br />
<br />
<br />
<br />
제 2장 서비스의 이용<br />
<br />
제3조(가입자격)<br />
서비스에 가입할 수 있는 모든사람입니다.<br />
<br />
제4조(서비스의 수준)<br />
서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사의 업무상이나 기술상의 이유로 서비스가 일시 중지될 수 있으며, 운영상의 목적으로 회사가 정한 기간에는 서비스가 일시 중지될 수 있습니다.<br />
이러한 경우 회사는 사전, 또는 사후에 이를 공지합니다.<br />
<br />
제5조(서비스 이용의 제한 및 정지)<br />
회사는 고객이 다음 각 호에 해당하는 경우 사전 통지 없이 고객의 서비스 이용을 제한 또는 정지하거나 직권 해지를 할 수 있습니다.<br />
1. 타인의 서비스 이용을 방해하거나 타인의 개인정보를 도용한 경우<br />
2. 서비스를 이용하여 법령, 공공질서, 미풍양속 등에 반하는 행위를 한 경우<br />
<br />
제6조(서비스의 변경 및 중지)<br />
- 회사는 다음 각 호의 1에 해당하는 경우 고객에게 서비스의 전부 또는 일부를 제한, 변경하거나 중지할 수 있습니다.<br />
1. 서비스용 설비의 보수 등 공사로 인한 부득이한 경우<br />
2. 정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우<br />
3. 서비스 제휴업체와의 계약 종료 등과 같은 회사의 제반 사정 또는 법률상의 장애 등으로 서비스를 유지할 수 없는 경우<br />
4. 기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우<br />
- 제1항에 의한 서비스 중단의 경우에는 회사는 인터넷 등에 공지하거나 고객에게 통지합니다. 다만, 회사가 통제할 수 없는 사유로 인한 서비스의 중단(운영자의 고의, 과실이 없는 디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 사후에 통지합니다.<br />
<br />
제7조<br />
회사의 상호는 다음과 같습니다.<br />
- 상호: “레코드온(RECORD ON)”<br />
<br />
제8조(양도금지)<br />
고객 및 회사는 고객의 서비스 가입에 따른 본 약관상의 지위 또는 권리, 의무의 전부 또는 일부를 제3자에게 양도, 위임하거나 담보제공 등의 목적으로 처분할 수 없습니다.<br />
<br />
제9조(손해배상)<br />
1. 고객의 고의나 과실에 의해 이 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 이 약관을 위반한 고객은 회사에 발생하는 모든 손해를 배상하여야 합니다.<br />
2. 고객이 서비스를 이용함에 있어 행한 불법행위나 고객의 고의나 과실에 의해 이 약관 위반행위로 인하여 회사가 당해 고객 이외의 제3자로부터 손해배상청구 또는 소송을 비롯한 각종 이의제기를 받는 경우 당해 고객은 그로 인하여 회사에 발생한 손해를 배상하여야 합니다.<br />
3. 회사가 제공하는 서비스로 인하여 고객에게 손해가 발생한 경우, 회사가 책임지지 않습니다.<br />
<br />
제10조 (면책사항)<br />
1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br />
2. 회사는 고객의 귀책사유로 인한 서비스의 이용장애에 대하여 책임을 지지 않습니다.<br />
3. 회사는 고객이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖에 서비스를 통하여 얻은 자료로 인한 손해 등에 대하여도 책임을 지지 않습니다.<br />
4. 회사에서 제공하는 서비스 및 서비스를 이용하여 얻은 정보에 대한 최종판단은 고객이 직접 하여야 하고, 그에 따른 책임은 전적으로 고객 자신에게 있으며, 회사는 그로 인하여 발생하는 손해에 대해서 책임을 부담하지 않습니다<br />
5. 회사의 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우 회사는 인터넷 홈페이지 등에 이를 공지하거나 E-mail 등의 방법으로 고객에게 통지합니다. 단, 회사가 통제할 수 없는 사유로 인하여 사전 공지가 불가능한 경우에는 사후에 공지합니다.<br />
<br />
제 11조 (분쟁의 해결 및 관할법원)<br />
1. 서비스 이용과 관련하여 회사와 고객 사이에 분쟁이 발생한 경우, 회사와 고객은 분쟁의 해결을 위해 성실히 협의합니다.<br />
2. 제1항의 협의에서도 분쟁이 해결되지 않을 경우 양 당사자는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제33조의 규정에 의한 개인정보분쟁조정위원회에 분쟁조정을 신청할 수 있습니다.<br />
      </ContentDiv>
      {/* </TextContainer> */}
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: rgba(18, 18, 18, 0.40); */
  z-index: 100000;
`;

const Modal = styled.div`
   justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 중앙으로 배치하기 위해
  overflow-y: auto;

  width: 432px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.White};
`;

const StyledClose = styled(Close)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 25px;
  left: 386px;
  flex-shrink: 0;
  cursor: pointer;
`;

// const TextContainer = styled.div`

// `;
const TitleDiv = styled.div`
  position: absolute;
  flex-direction: row;
  width: 332px;
  height: 23px;
  top: 50px;
  left: 50px;
  text-align: start;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

const  ContentDiv = styled.div`
  position: absolute;
  width: 332px;
  height: 360px;
  top: 90px;
  left: 50px;
  font-size: ${(props) => props.theme.fontSizes.TextS};
  font-weight: ${(props) => props.theme.fontWeights.TextS};
  line-height: 18.2px;
  letter-spacing: -0.28px;
  overflow-y: auto;
`;
export default ServicePolicyModal;
