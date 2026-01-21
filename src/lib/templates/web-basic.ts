import { ProjectTemplate } from '../types'

export const webBasicTemplate: ProjectTemplate = {
  id: 'web-basic',
  name: '웹사이트 (기본)',
  icon: '🌐',
  description: '랜딩페이지, 회사 소개 사이트',
  category: 'web',
  data: {
    ko: {
      project: {
        name: '',
        subtitle: '웹사이트 개발 제안서',
        description: '모던한 디자인의 반응형 웹사이트',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: '반응형 웹 디자인 (PC/모바일)' },
          { id: '2', value: '메인 페이지 + 서브 페이지 5개' },
          { id: '3', value: '문의 폼' },
          { id: '4', value: 'SEO 최적화' },
          { id: '5', value: 'Google Analytics 연동' },
        ],
        excludes: [
          { id: '1', value: '서버 호스팅 비용' },
          { id: '2', value: '도메인 등록' },
          { id: '3', value: '콘텐츠 작성' },
          { id: '4', value: '사진/영상 촬영' },
        ],
      },
      techStack: [
        { id: '1', category: '프론트엔드', name: 'Next.js' },
        { id: '2', category: '스타일링', name: 'Tailwind CSS' },
        { id: '3', category: '호스팅', name: 'Vercel' },
        { id: '4', category: '분석', name: 'Google Analytics' },
      ],
      phases: [
        {
          id: '1',
          name: '1단계: 디자인',
          description: 'UI/UX 디자인 및 프로토타입',
          amount: 150,
          items: [
            { id: '1', name: '요구사항 분석', detail: '미팅 및 문서화', status: 'docs' },
            { id: '2', name: 'UI 디자인', detail: 'Figma 목업', status: 'visual' },
            { id: '3', name: '디자인 리뷰', detail: '피드백 및 수정', status: 'visual' },
          ],
        },
        {
          id: '2',
          name: '2단계: 개발',
          description: '프론트엔드 구현',
          amount: 250,
          items: [
            { id: '1', name: '페이지 개발', detail: '전체 페이지 코딩', status: 'working' },
            { id: '2', name: '반응형 디자인', detail: '모바일 최적화', status: 'visual' },
            { id: '3', name: '폼 및 인터랙션', detail: '문의 폼, 애니메이션', status: 'working' },
          ],
        },
        {
          id: '3',
          name: '3단계: 런칭',
          description: '배포 및 최적화',
          amount: 100,
          items: [
            { id: '1', name: 'SEO 설정', detail: '메타 태그, 사이트맵', status: 'docs' },
            { id: '2', name: '배포', detail: '프로덕션 런칭', status: 'infra' },
            { id: '3', name: 'QA 테스트', detail: '크로스 브라우저 테스트', status: 'stabilization' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: '계약금', condition: '계약 체결 시', amount: 200 },
        { id: '2', phase: '잔금', condition: '프로젝트 완료 시', amount: 300 },
      ],
      schedule: [
        { id: '1', phase: '1단계', duration: '1주', deliverable: '디자인 목업' },
        { id: '2', phase: '2단계', duration: '2주', deliverable: '개발된 웹사이트' },
        { id: '3', phase: '3단계', duration: '1주', deliverable: '라이브 웹사이트' },
      ],
      terms: [
        { id: '1', label: '하자보수', value: '런칭 후 1개월' },
        { id: '2', label: '수정횟수', value: '2회 포함' },
        { id: '3', label: '소스코드', value: '최종 결제 후 제공' },
      ],
      expansions: [
        { id: '1', feature: '블로그 시스템', description: 'CMS 연동', amount: 100 },
        { id: '2', feature: '다국어 지원', description: 'i18n 적용', amount: 80 },
        { id: '3', feature: '뉴스레터', description: '이메일 구독', amount: 50 },
      ],
    },
    en: {
      project: {
        name: '',
        subtitle: 'Website Development Proposal',
        description: 'Responsive website with modern design',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: 'Responsive web design (PC/Mobile)' },
          { id: '2', value: 'Main page + 5 sub pages' },
          { id: '3', value: 'Contact form' },
          { id: '4', value: 'SEO optimization' },
          { id: '5', value: 'Google Analytics integration' },
        ],
        excludes: [
          { id: '1', value: 'Server hosting costs' },
          { id: '2', value: 'Domain registration' },
          { id: '3', value: 'Content writing' },
          { id: '4', value: 'Photography/video production' },
        ],
      },
      techStack: [
        { id: '1', category: 'Frontend', name: 'Next.js' },
        { id: '2', category: 'Styling', name: 'Tailwind CSS' },
        { id: '3', category: 'Hosting', name: 'Vercel' },
        { id: '4', category: 'Analytics', name: 'Google Analytics' },
      ],
      phases: [
        {
          id: '1',
          name: 'Phase 1: Design',
          description: 'UI/UX design and prototype',
          amount: 150,
          items: [
            { id: '1', name: 'Requirements analysis', detail: 'Meeting & documentation', status: 'docs' },
            { id: '2', name: 'UI design', detail: 'Figma mockup', status: 'visual' },
            { id: '3', name: 'Design review', detail: 'Feedback & revisions', status: 'visual' },
          ],
        },
        {
          id: '2',
          name: 'Phase 2: Development',
          description: 'Frontend implementation',
          amount: 250,
          items: [
            { id: '1', name: 'Page development', detail: 'All pages coding', status: 'working' },
            { id: '2', name: 'Responsive design', detail: 'Mobile optimization', status: 'visual' },
            { id: '3', name: 'Forms & interactions', detail: 'Contact form, animations', status: 'working' },
          ],
        },
        {
          id: '3',
          name: 'Phase 3: Launch',
          description: 'Deployment and optimization',
          amount: 100,
          items: [
            { id: '1', name: 'SEO setup', detail: 'Meta tags, sitemap', status: 'docs' },
            { id: '2', name: 'Deployment', detail: 'Production launch', status: 'infra' },
            { id: '3', name: 'QA testing', detail: 'Cross-browser testing', status: 'stabilization' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: 'Contract', condition: 'Upon contract signing', amount: 200 },
        { id: '2', phase: 'Final', condition: 'Upon project completion', amount: 300 },
      ],
      schedule: [
        { id: '1', phase: 'Phase 1', duration: '1 week', deliverable: 'Design mockup' },
        { id: '2', phase: 'Phase 2', duration: '2 weeks', deliverable: 'Developed website' },
        { id: '3', phase: 'Phase 3', duration: '1 week', deliverable: 'Live website' },
      ],
      terms: [
        { id: '1', label: 'Warranty', value: '1 month after launch' },
        { id: '2', label: 'Revisions', value: 'Up to 2 rounds included' },
        { id: '3', label: 'Source code', value: 'Provided upon final payment' },
      ],
      expansions: [
        { id: '1', feature: 'Blog system', description: 'CMS integration', amount: 100 },
        { id: '2', feature: 'Multi-language', description: 'i18n support', amount: 80 },
        { id: '3', feature: 'Newsletter', description: 'Email subscription', amount: 50 },
      ],
    },
  },
}
