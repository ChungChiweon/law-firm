import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { LegalSection, LegalList, LegalParagraph, LegalSubTitle } from "@/components/legal/LegalSection";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: "성범죄 피해 상담센터 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <PublicLayout>
    <LegalPageLayout
      eyebrow="Terms of Service"
      title="이용약관"
      subtitle="본 사이트 이용 전 아래 약관을 확인해 주세요."
      breadcrumb="이용약관"
      lastUpdated="2026년 6월 19일"
    >
      <LegalSection title="제1조 (목적)">
        <LegalParagraph>
          이 약관은 {SITE_CONFIG.office.name}(이하 &ldquo;사무소&rdquo;)이 운영하는 {SITE_CONFIG.name}(이하 &ldquo;본 사이트&rdquo;)에서 제공하는 서비스를
          이용함에 있어 사무소와 이용자 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="제2조 (서비스의 내용)">
        <LegalParagraph>사무소는 다음과 같은 서비스를 제공합니다.</LegalParagraph>
        <LegalList items={[
          "온라인 상담 신청 접수: 이름, 연락처, 상담 내용을 입력하여 상담을 신청하는 기능",
          "AI 상담 내용 정리: 이용자가 입력한 정보를 AI가 요약하여 상담 접수 시 참고 자료를 생성하는 기능",
          "법률 정보 안내: 성범죄 피해 관련 일반적인 법률 정보 제공",
        ]} />
        <LegalParagraph>
          위 서비스는 상담 접수를 보조하는 목적이며, 법률 자문 또는 법적 효력이 있는 조언을 제공하지 않습니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="제3조 (AI 상담 서비스 안내)">
        <LegalParagraph>
          본 사이트의 AI 상담 기능은 이용자가 입력한 내용을 요약·정리하여 상담 접수를 보조하는 기능입니다.
        </LegalParagraph>
        <LegalSubTitle>이용자는 다음 사항을 충분히 이해하고 이용해야 합니다.</LegalSubTitle>
        <LegalList items={[
          "AI가 생성하는 요약 내용은 법률 자문, 법률 의견서 또는 법적 조언이 아닙니다.",
          "AI 요약 결과는 참고 목적으로만 활용되며, 법적 효력이 없습니다.",
          "AI의 분석 결과가 이용자의 상황에 적합하지 않을 수 있으며, 이에 대한 책임은 사무소에 없습니다.",
          "실제 법률 판단은 반드시 변호사와의 직접 상담을 통해 이루어져야 합니다.",
        ]} />
      </LegalSection>

      <LegalSection title="제4조 (이용자의 의무)">
        <LegalParagraph>이용자는 다음 행위를 해서는 안 됩니다.</LegalParagraph>
        <LegalList items={[
          "타인의 정보를 도용하거나 허위 정보를 입력하는 행위",
          "서비스 운영을 방해하거나 시스템에 부당한 부하를 주는 행위",
          "본 서비스를 통해 취득한 정보를 사무소의 동의 없이 상업적으로 이용하는 행위",
          "기타 관련 법령을 위반하는 행위",
        ]} />
      </LegalSection>

      <LegalSection title="제5조 (면책)">
        <LegalParagraph>
          사무소는 다음 사항에 대해 책임을 지지 않습니다.
        </LegalParagraph>
        <LegalList items={[
          "천재지변, 전쟁, 서비스 장애 등 불가항력으로 인한 서비스 중단",
          "이용자가 제공한 정보의 부정확·허위·누락으로 인해 발생한 문제",
          "AI 상담 요약 결과에 대한 신뢰 또는 의존으로 인한 손해",
          "이용자가 서비스 내 게시한 정보로 인해 발생한 법적 문제",
          "상담 신청 후 결과가 이용자의 기대에 미치지 못한 경우",
        ]} />
      </LegalSection>

      <LegalSection title="제6조 (서비스 변경 및 중단)">
        <LegalParagraph>
          사무소는 서비스의 내용 및 제공 방식을 변경하거나 일시적으로 중단할 수 있습니다.
          이 경우 사전에 공지합니다. 단, 불가피한 경우 사후에 공지할 수 있습니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="제7조 (준거법 및 관할)">
        <LegalParagraph>
          이 약관은 대한민국 법률에 따라 해석되며, 분쟁이 발생한 경우 사무소 소재지를 관할하는 법원을 합의 관할 법원으로 합니다.
        </LegalParagraph>
        <LegalParagraph>
          이 약관은 2026년 6월 19일부터 적용됩니다.
        </LegalParagraph>
      </LegalSection>
    </LegalPageLayout>
    </PublicLayout>
  );
}
