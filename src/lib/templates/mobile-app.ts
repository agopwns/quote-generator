import { ProjectTemplate } from '../types'

export const mobileAppTemplate: ProjectTemplate = {
  id: 'mobile-app',
  name: '모바일 앱',
  icon: '📱',
  description: 'iOS/Android 크로스플랫폼 앱',
  category: 'mobile',
  data: {
    ko: {
      project: {
        name: '',
        subtitle: '모바일 앱 개발 제안서',
        description: 'iOS 및 Android용 크로스플랫폼 모바일 앱',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: 'iOS/Android 앱 (React Native)' },
          { id: '2', value: '백엔드 API 서버' },
          { id: '3', value: '관리자 웹 대시보드' },
          { id: '4', value: '푸시 알림 시스템' },
          { id: '5', value: 'App Store / Play Store 배포' },
        ],
        excludes: [
          { id: '1', value: '서버 호스팅 비용' },
          { id: '2', value: '앱스토어 개발자 계정 비용' },
          { id: '3', value: '유지보수 (별도 계약)' },
        ],
      },
      techStack: [
        { id: '1', category: '모바일', name: 'React Native' },
        { id: '2', category: '백엔드', name: 'Node.js + Express' },
        { id: '3', category: '데이터베이스', name: 'PostgreSQL' },
        { id: '4', category: '클라우드', name: 'AWS (EC2, S3, RDS)' },
        { id: '5', category: '푸시', name: 'Firebase Cloud Messaging' },
      ],
      phases: [
        {
          id: '1',
          name: '1단계: 기획 및 디자인',
          description: '요구사항 분석 및 UI/UX 디자인',
          amount: 300,
          items: [
            { id: '1', name: '요구사항 분석', detail: '기능 명세', status: 'docs' },
            { id: '2', name: 'UI/UX 디자인', detail: 'Figma 프로토타입', status: 'visual' },
            { id: '3', name: 'DB 설계', detail: 'ERD 문서화', status: 'docs' },
          ],
        },
        {
          id: '2',
          name: '2단계: 백엔드 개발',
          description: 'API 서버 및 데이터베이스 구축',
          amount: 500,
          items: [
            { id: '1', name: '인증 시스템', detail: 'JWT, 소셜 로그인', status: 'working' },
            { id: '2', name: 'API 개발', detail: 'REST API', status: 'working' },
            { id: '3', name: 'AWS 인프라', detail: 'EC2, RDS, S3', status: 'infra' },
          ],
        },
        {
          id: '3',
          name: '3단계: 앱 개발',
          description: '모바일 앱 UI 및 기능',
          amount: 800,
          items: [
            { id: '1', name: '메인 화면', detail: '홈, 네비게이션, 프로필', status: 'visual' },
            { id: '2', name: '핵심 기능', detail: '비즈니스 로직', status: 'working' },
            { id: '3', name: '푸시 알림', detail: 'FCM 연동', status: 'working' },
          ],
        },
        {
          id: '4',
          name: '4단계: 테스트 및 런칭',
          description: 'QA 및 앱스토어 배포',
          amount: 400,
          items: [
            { id: '1', name: 'QA 테스트', detail: '기능/UI 테스트', status: 'stabilization' },
            { id: '2', name: '앱스토어 심사', detail: 'iOS/Android 제출', status: 'docs' },
            { id: '3', name: '런칭', detail: '배포 및 모니터링', status: 'infra' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: '계약금', condition: '계약 체결 시', amount: 600 },
        { id: '2', phase: '중도금', condition: '2단계 완료 시', amount: 500 },
        { id: '3', phase: '잔금', condition: '앱 런칭 시', amount: 900 },
      ],
      schedule: [
        { id: '1', phase: '1단계', duration: '2주', deliverable: '디자인, 명세서' },
        { id: '2', phase: '2단계', duration: '4주', deliverable: 'API 서버, 관리자' },
        { id: '3', phase: '3단계', duration: '6주', deliverable: '베타 앱' },
        { id: '4', phase: '4단계', duration: '2주', deliverable: '정식 출시' },
      ],
      terms: [
        { id: '1', label: '하자보수', value: '런칭 후 3개월' },
        { id: '2', label: '소스코드', value: '완료 시 전체 전달' },
        { id: '3', label: '지원', value: '개발 기간 중 무제한' },
      ],
      expansions: [
        { id: '1', feature: '채팅 기능', description: '1:1 및 그룹 채팅', amount: 300 },
        { id: '2', feature: '결제 시스템', description: '인앱 결제', amount: 200 },
        { id: '3', feature: '다국어 지원', description: 'i18n 적용', amount: 100 },
      ],
    },
    en: {
      project: {
        name: '',
        subtitle: 'Mobile App Development Proposal',
        description: 'Cross-platform mobile application for iOS and Android',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: 'iOS/Android app (React Native)' },
          { id: '2', value: 'Backend API server' },
          { id: '3', value: 'Admin web dashboard' },
          { id: '4', value: 'Push notification system' },
          { id: '5', value: 'App Store / Play Store deployment' },
        ],
        excludes: [
          { id: '1', value: 'Server hosting costs' },
          { id: '2', value: 'App store developer account fees' },
          { id: '3', value: 'Maintenance (separate contract)' },
        ],
      },
      techStack: [
        { id: '1', category: 'Mobile', name: 'React Native' },
        { id: '2', category: 'Backend', name: 'Node.js + Express' },
        { id: '3', category: 'Database', name: 'PostgreSQL' },
        { id: '4', category: 'Cloud', name: 'AWS (EC2, S3, RDS)' },
        { id: '5', category: 'Push', name: 'Firebase Cloud Messaging' },
      ],
      phases: [
        {
          id: '1',
          name: 'Phase 1: Planning & Design',
          description: 'Requirements analysis and UI/UX design',
          amount: 300,
          items: [
            { id: '1', name: 'Requirements analysis', detail: 'Feature specs', status: 'docs' },
            { id: '2', name: 'UI/UX design', detail: 'Figma prototype', status: 'visual' },
            { id: '3', name: 'DB design', detail: 'ERD documentation', status: 'docs' },
          ],
        },
        {
          id: '2',
          name: 'Phase 2: Backend Development',
          description: 'API server and database setup',
          amount: 500,
          items: [
            { id: '1', name: 'Auth system', detail: 'JWT, social login', status: 'working' },
            { id: '2', name: 'API development', detail: 'REST API', status: 'working' },
            { id: '3', name: 'AWS infrastructure', detail: 'EC2, RDS, S3', status: 'infra' },
          ],
        },
        {
          id: '3',
          name: 'Phase 3: App Development',
          description: 'Mobile app UI and features',
          amount: 800,
          items: [
            { id: '1', name: 'Main screens', detail: 'Home, navigation, profile', status: 'visual' },
            { id: '2', name: 'Core features', detail: 'Business logic', status: 'working' },
            { id: '3', name: 'Push notifications', detail: 'FCM integration', status: 'working' },
          ],
        },
        {
          id: '4',
          name: 'Phase 4: Testing & Launch',
          description: 'QA and app store deployment',
          amount: 400,
          items: [
            { id: '1', name: 'QA testing', detail: 'Functional/UI tests', status: 'stabilization' },
            { id: '2', name: 'App store review', detail: 'iOS/Android submission', status: 'docs' },
            { id: '3', name: 'Launch', detail: 'Deployment & monitoring', status: 'infra' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: 'Contract', condition: 'Upon signing', amount: 600 },
        { id: '2', phase: 'Midterm', condition: 'Phase 2 completion', amount: 500 },
        { id: '3', phase: 'Final', condition: 'App launch', amount: 900 },
      ],
      schedule: [
        { id: '1', phase: 'Phase 1', duration: '2 weeks', deliverable: 'Design, specs' },
        { id: '2', phase: 'Phase 2', duration: '4 weeks', deliverable: 'API server, admin' },
        { id: '3', phase: 'Phase 3', duration: '6 weeks', deliverable: 'Beta app' },
        { id: '4', phase: 'Phase 4', duration: '2 weeks', deliverable: 'Production release' },
      ],
      terms: [
        { id: '1', label: 'Warranty', value: '3 months after launch' },
        { id: '2', label: 'Source code', value: 'Full delivery upon completion' },
        { id: '3', label: 'Support', value: 'Unlimited during development' },
      ],
      expansions: [
        { id: '1', feature: 'Chat feature', description: '1:1 and group chat', amount: 300 },
        { id: '2', feature: 'Payment system', description: 'In-app purchases', amount: 200 },
        { id: '3', feature: 'Multi-language', description: 'i18n support', amount: 100 },
      ],
    },
  },
}
