import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { LegalSection, LegalList, LegalParagraph } from "@/components/legal/LegalSection";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "면책사항",
  description: "성범죄 피해 상담센터 면책사항 안내입니다.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal Disclaimer"
      title="면책사항"
      subtitle="본 사이트를 이용하기 전 반드시 확인해 주세요."
      breadcrumb="면책사항"
      lastUpdated="2026년 6월 19일"
    >
      <LegalSection title="법률 자문이 아닙니다">
        <LegalParagraph>
          {SITE_CONFIG.name}에서 제공하는 모든 정보는 일반적인 법률 정보를 안내하는 목적으로 작성되었으며,
          법률 자문 또는 법률 의견서가 아닙니다.
        </LegalParagraph>
        <LegalParagraph>
          본 사이트의 정보는 특정 법적 상황에 대한 개인별 판단을 대체할 수 없습니다.
          구체적인 법률 문제에 대해서는 반드시 변호사와 직접 상담하시기 바랍니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="AI 상담 기능의 제한">
        <LegalParagraph>
          본 사이트의 AI 상담 기능은 이용자가 입력한 정보를 요약하여 상담 접수를 보조하는 도구입니다.
          AI가 생성한 요약 및 분석 내용은 다음과 같은 한계를 가집니다.
        </LegalParagraph>
        <LegalList items={[
          "법률적 효력이 없으며, 법적 조언으로 갈음할 수 없습니다.",
          "AI의 판단이 이용자의 실제 상황에 정확하지 않을 수 있습니다.",
          "AI 분석 결과를 근거로 독립적인 법적 결정을 내리는 것은 권장되지 않습니다.",
          "AI 서비스의 기술적 오류나 오분석으로 인한 손해에 대해 사무소는 책임을 지지 않습니다.",
        ]} />
      </LegalSection>

      <LegalSection title="결과 보장 없음">
        <LegalParagraph>
          {SITE_CONFIG.office.name}은 상담 신청 이후의 법적 결과를 보장하지 않습니다.
        </LegalParagraph>
        <LegalList items={[
          "수임 여부는 상담 내용 검토 후 별도로 결정됩니다.",
          "수임을 거절할 권리가 있으며, 상담 신청이 수임을 의미하지 않습니다.",
          "소송 또는 법적 절차의 결과는 다양한 요인에 따라 달라질 수 있으며, 특정 결과를 보장하지 않습니다.",
          "형사 고소 결과, 합의 여부, 손해배상액 등에 대해 예측 또는 보장 발언을 하지 않습니다.",
        ]} />
      </LegalSection>

      <LegalSection title="정보의 정확성">
        <LegalParagraph>
          본 사이트에 게시된 법률 정보는 작성 시점 기준으로 정확하도록 노력하였으나,
          법령 개정, 판례 변경 등에 의해 내용이 달라질 수 있습니다.
        </LegalParagraph>
        <LegalParagraph>
          최신 법령 정보는 법제처(www.law.go.kr) 또는 대한법률구조공단(www.klac.or.kr)에서 확인하시기 바랍니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="외부 링크">
        <LegalParagraph>
          본 사이트에서 연결되는 외부 사이트의 내용에 대해 {SITE_CONFIG.name}은 책임을 지지 않습니다.
          외부 링크는 참고 목적으로만 제공됩니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="문의">
        <LegalParagraph>
          이 면책사항에 대한 문의는 아래로 연락해 주세요.
        </LegalParagraph>
        <LegalList items={[
          `이메일: ${SITE_CONFIG.contact.email}`,
          `전화: ${SITE_CONFIG.contact.phone}`,
          `상담 시간: ${SITE_CONFIG.businessHours}`,
        ]} />
      </LegalSection>
    </LegalPageLayout>
  );
}
