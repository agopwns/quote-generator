export type Language = 'ko' | 'en'

type TranslationKeys = {
  [key: string]: string
}

type Translations = {
  [lang in Language]: TranslationKeys
}

export const translations: Translations = {
  ko: {
    'app.title': '견적서 생성기',
    'app.preview': '미리보기',
    'app.pdf': 'PDF',

    'sidebar.quotes': '견적서',
    'sidebar.templates': '템플릿',
    'sidebar.newQuote': '새 견적서',
    'sidebar.save': '저장',
    'sidebar.draft': '임시 저장',
    'sidebar.saved': '저장됨',
    'sidebar.untitled': '(제목 없음)',
    'sidebar.autoSaved': '자동 저장됨',
    'sidebar.noSavedQuotes': '저장된 견적서 없음',
    'sidebar.selectTemplate': '템플릿을 선택하세요',
    'sidebar.deleteConfirm': '이 견적서를 삭제하시겠습니까?',
    'sidebar.newConfirm': '현재 작성 중인 내용이 삭제됩니다. 새로 시작하시겠습니까?',
    'sidebar.replaceConfirm': '현재 작성 중인 내용이 대체됩니다. 계속하시겠습니까?',

    'preview.title': '미리보기',
    'preview.style': '스타일:',
    'preview.html': 'HTML',
    'preview.print': '인쇄 / PDF',

    'section.overview': '프로젝트 개요',
    'section.scope': '개발 범위',
    'section.included': '포함 항목',
    'section.excluded': '제외 항목',
    'section.techStack': '기술 스택',
    'section.phases': '단계별 개발 계획',
    'section.costSummary': '비용 요약',
    'section.totalCost': '총 개발 비용',
    'section.paymentTerms': '결제 조건',
    'section.timeline': '개발 일정',
    'section.terms': '기타 조건',
    'section.expansions': '향후 확장 옵션',
    'section.footer1': '본 제안서의 유효기간은 발행일로부터 30일입니다.',
    'section.footer2': '문의사항이 있으시면 언제든 연락 주시기 바랍니다.',

    'table.project': '프로젝트명',
    'table.client': '클라이언트',
    'table.totalCost': '총 개발 비용',
    'table.phase': '단계',
    'table.description': '내용',
    'table.amount': '금액',
    'table.percent': '비율',
    'table.total': '총 합계',
    'table.timing': '시점',
    'table.condition': '조건',
    'table.duration': '기간',
    'table.deliverable': '산출물',
    'table.feature': '기능',
    'table.estCost': '예상 비용',

    'status.visual': '✓ 시각',
    'status.working': '✓ 동작',
    'status.infra': '✓ 인프라',
    'status.docs': '✓ 문서',
    'status.stabilization': '✓ QA',

    'unit.won': '만원',
    'unit.billion': '억원',
    'unit.vatExcluded': 'VAT 별도',

    'form.phase': '개발 단계 (Phase)',
    'form.totalSum': '총 합계',
    'form.addPhase': '페이즈 추가',
    'form.addItem': '항목 추가',
    'form.presetAdd': '프리셋 추가',
    'form.goalPlaceholder': '목표: 예) 앱 설치 → 로그인 → 홈 화면 진입 가능',
    'form.itemName': '항목명',
    'form.itemDetail': '상세 (선택)',
    'form.amount': '금액',

    'preset.backend': '🔧 백엔드',
    'preset.auth': '🔑 인증',
    'preset.payment': '💳 결제',
    'preset.frontend': '🎨 프론트엔드',
    'preset.infra': '☁️ 인프라',
    'preset.etc': '📦 기타',

    'design.default': '기본',
    'design.notion': '노션 스타일',
    'design.shadcn': '모던 카드',
    'design.minimal': '미니멀 다크',
    'design.formal': '공식 문서',
  },
  en: {
    'app.title': 'Quote Generator',
    'app.preview': 'Preview',
    'app.pdf': 'PDF',

    'sidebar.quotes': 'Quotes',
    'sidebar.templates': 'Templates',
    'sidebar.newQuote': 'New Quote',
    'sidebar.save': 'Save',
    'sidebar.draft': 'Draft',
    'sidebar.saved': 'Saved',
    'sidebar.untitled': '(Untitled)',
    'sidebar.autoSaved': 'Auto-saved',
    'sidebar.noSavedQuotes': 'No saved quotes',
    'sidebar.selectTemplate': 'Select a template',
    'sidebar.deleteConfirm': 'Delete this quote?',
    'sidebar.newConfirm': 'Current draft will be lost. Start new?',
    'sidebar.replaceConfirm': 'Current draft will be replaced. Continue?',

    'preview.title': 'Preview',
    'preview.style': 'Style:',
    'preview.html': 'HTML',
    'preview.print': 'Print / PDF',

    'section.overview': 'Project Overview',
    'section.scope': 'Scope',
    'section.included': 'Included',
    'section.excluded': 'Excluded',
    'section.techStack': 'Tech Stack',
    'section.phases': 'Development Plan',
    'section.costSummary': 'Cost Summary',
    'section.totalCost': 'Total Development Cost',
    'section.paymentTerms': 'Payment Terms',
    'section.timeline': 'Timeline',
    'section.terms': 'Terms & Conditions',
    'section.expansions': 'Future Options',
    'section.footer1': 'This proposal is valid for 30 days from the date of issue.',
    'section.footer2': 'Please feel free to contact us with any questions.',

    'table.project': 'Project',
    'table.client': 'Client',
    'table.totalCost': 'Total Cost',
    'table.phase': 'Phase',
    'table.description': 'Description',
    'table.amount': 'Amount',
    'table.percent': '%',
    'table.total': 'Total',
    'table.timing': 'Timing',
    'table.condition': 'Condition',
    'table.duration': 'Duration',
    'table.deliverable': 'Deliverables',
    'table.feature': 'Feature',
    'table.estCost': 'Est. Cost',

    'status.visual': '✓ Visual',
    'status.working': '✓ Logic',
    'status.infra': '✓ Infra',
    'status.docs': '✓ Docs',
    'status.stabilization': '✓ QA',

    'unit.won': 'M KRW',
    'unit.billion': 'B KRW',
    'unit.vatExcluded': 'VAT excluded',

    'form.phase': 'Development Phases',
    'form.totalSum': 'Total',
    'form.addPhase': 'Add Phase',
    'form.addItem': 'Add Item',
    'form.presetAdd': 'Add Preset',
    'form.goalPlaceholder': 'Goal: e.g., App install → Login → Home screen',
    'form.itemName': 'Item name',
    'form.itemDetail': 'Detail (optional)',
    'form.amount': 'Amount',

    'preset.backend': '🔧 Backend',
    'preset.auth': '🔑 Auth',
    'preset.payment': '💳 Payment',
    'preset.frontend': '🎨 Frontend',
    'preset.infra': '☁️ Infra',
    'preset.etc': '📦 Other',

    'design.default': 'Default',
    'design.notion': 'Notion Style',
    'design.shadcn': 'Modern Card',
    'design.minimal': 'Minimal Dark',
    'design.formal': 'Formal Document',
  },
}

export function getTranslation(language: Language) {
  return (key: string): string => {
    return translations[language][key] || key
  }
}
