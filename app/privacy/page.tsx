import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { LegalSection, LegalList, LegalParagraph, LegalSubTitle } from "@/components/legal/LegalSection";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "성범죄 피해 상담센터 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
    <LegalPageLayout
      eyebrow="Privacy Policy"
      title="개인정보처리방침"
      subtitle="상담 접수 및 연락을 위해 수집하는 개인정보의 처리 방침을 안내합니다."
      breadcrumb="개인정보처리방침"
      lastUpdated="2026년 6월 19일"
    >
      <LegalSection title="1. 수집하는 개인정보 항목">
        <LegalSubTitle>필수 수집 항목</LegalSubTitle>
        <LegalList items={["이름", "연락처 (전화번호)", "상담 내용"]} />
        <LegalSubTitle>선택 수집 항목</LegalSubTitle>
        <LegalList items={["사건 발생 지역", "상담 구분 (피해 당사자 / 가족·지인 / 기타)", "선호 연락 시간"]} />
        <LegalParagraph>
          AI 상담(상담 내용 정리) 이용 시에는 피해 유형, 걱정 사항, 진행 단계, 증거 보유 여부, 상황 설명이 추가로 수집됩니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. 개인정보 수집 및 이용 목적">
        <LegalList items={[
          "상담 신청 접수 및 확인 연락",
          "상담 내용 검토 및 법률 지원 방향 안내",
          "AI 상담 결과 요약 및 상담 접수 연계",
          "문의 응대 및 서비스 품질 개선",
        ]} />
        <LegalParagraph>
          수집된 개인정보는 위 목적 이외의 용도로 이용하지 않습니다. 이용 목적이 변경될 경우 별도 동의를 받겠습니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. 개인정보 보유 및 이용 기간">
        <LegalParagraph>
          개인정보는 상담 완료 후 1년간 보유한 후 파기합니다. 단, 법령에 따라 보존이 필요한 경우에는 해당 기간 동안 보유합니다.
        </LegalParagraph>
        <LegalSubTitle>관련 법령에 따른 보존 기간</LegalSubTitle>
        <LegalList items={[
          "소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)",
          "통신비밀보호법에 따른 통신 기록: 3개월",
        ]} />
      </LegalSection>

      <LegalSection title="4. 개인정보의 제3자 제공">
        <LegalParagraph>
          {SITE_CONFIG.name}은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우는 예외로 합니다.
        </LegalParagraph>
        <LegalList items={[
          "이용자가 사전에 동의한 경우",
          "법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우",
        ]} />
      </LegalSection>

      <LegalSection title="5. 개인정보처리 위탁">
        <LegalParagraph>
          현재 상담 접수 시스템 운영을 위해 아래 업체에 개인정보 처리를 위탁하고 있습니다.
        </LegalParagraph>
        <LegalList items={[
          "Supabase Inc. — 상담 데이터 저장 및 관리 (미국 소재, 실제 운영 전 처리 위탁 계약 검토 필요)",
          "OpenAI, Inc. — AI 상담 요약 처리 (미국 소재, 미사용 시 해당 없음)",
        ]} />
        <LegalParagraph>
          위탁 업체는 위탁 목적 범위 내에서만 개인정보를 처리하며, 개인정보보호 관련 법령을 준수합니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. 정보주체의 권리·의무">
        <LegalParagraph>
          이용자는 언제든지 아래 권리를 행사할 수 있습니다.
        </LegalParagraph>
        <LegalList items={[
          "개인정보 열람 요청",
          "오류 등이 있을 경우 정정 요청",
          "삭제 요청",
          "처리 정지 요청",
        ]} />
        <LegalParagraph>
          권리 행사는 이메일({SITE_CONFIG.contact.email}) 또는 전화({SITE_CONFIG.contact.phone})로 문의하시면 됩니다.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. 개인정보 보호책임자">
        <LegalList items={[
          `성명: ${SITE_CONFIG.legalNotice.privacyOfficer} (실제 운영 전 교체 필요)`,
          `소속: ${SITE_CONFIG.office.name}`,
          `이메일: ${SITE_CONFIG.contact.email}`,
          `전화: ${SITE_CONFIG.contact.phone}`,
        ]} />
      </LegalSection>

      <LegalSection title="8. 개인정보처리방침 변경">
        <LegalParagraph>
          이 개인정보처리방침은 법령 또는 운영 방침의 변경에 따라 내용이 추가·삭제·수정될 수 있습니다.
          변경 시 최소 7일 전에 사이트 공지사항을 통해 안내합니다.
        </LegalParagraph>
        <LegalParagraph>
          이 방침은 2026년 6월 19일부터 적용됩니다.
        </LegalParagraph>
      </LegalSection>
    </LegalPageLayout>
    </PublicLayout>
  );
}
