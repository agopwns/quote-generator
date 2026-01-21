import { ProjectTemplate } from '../types'

export const mvpTemplate: ProjectTemplate = {
  id: 'mvp',
  name: 'MVP / 프로토타입',
  icon: '🔧',
  description: '빠른 검증용 최소 기능 제품',
  category: 'mvp',
  data: {
    ko: {
      project: {
        name: '',
        subtitle: 'MVP 개발 제안서',
        description: '시장 검증을 위한 빠른 프로토타입',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: '핵심 기능 구현 (3-5개 기능)' },
          { id: '2', value: '기본 사용자 인증' },
          { id: '3', value: '간단한 반응형 UI' },
          { id: '4', value: '기본 데이터베이스 설정' },
          { id: '5', value: '빠른 배포' },
        ],
        excludes: [
          { id: '1', value: '고급 보안 기능' },
          { id: '2', value: '성능 최적화' },
          { id: '3', value: '확장성 고려' },
          { id: '4', value: '포괄적인 테스트' },
          { id: '5', value: '문서화' },
        ],
      },
      techStack: [
        { id: '1', category: '프론트엔드', name: 'Next.js' },
        { id: '2', category: '백엔드', name: 'Supabase / Firebase' },
        { id: '3', category: '스타일링', name: 'Tailwind CSS' },
        { id: '4', category: '호스팅', name: 'Vercel' },
      ],
      phases: [
        {
          id: '1',
          name: '1단계: 빠른 디자인',
          description: '빠른 와이어프레이밍 및 기획',
          amount: 100,
          items: [
            { id: '1', name: '기능 우선순위화', detail: '핵심 vs 부가 기능', status: 'docs' },
            { id: '2', name: '와이어프레임', detail: '빠른 스케치', status: 'visual' },
          ],
        },
        {
          id: '2',
          name: '2단계: 핵심 개발',
          description: '필수 기능 구축',
          amount: 300,
          items: [
            { id: '1', name: '인증 설정', detail: '기본 로그인/회원가입', status: 'working' },
            { id: '2', name: '핵심 기능', detail: '메인 기능', status: 'working' },
            { id: '3', name: '기본 UI', detail: '기능적 인터페이스', status: 'visual' },
          ],
        },
        {
          id: '3',
          name: '3단계: 마무리 및 배포',
          description: '최종 수정 및 런칭',
          amount: 100,
          items: [
            { id: '1', name: '버그 수정', detail: '치명적 이슈만', status: 'stabilization' },
            { id: '2', name: '배포', detail: '빠른 런칭', status: 'infra' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: '계약금', condition: '계약 체결 시', amount: 250 },
        { id: '2', phase: '잔금', condition: 'MVP 런칭 시', amount: 250 },
      ],
      schedule: [
        { id: '1', phase: '1단계', duration: '3일', deliverable: '와이어프레임' },
        { id: '2', phase: '2단계', duration: '2주', deliverable: '작동하는 MVP' },
        { id: '3', phase: '3단계', duration: '3일', deliverable: '라이브 제품' },
      ],
      terms: [
        { id: '1', label: '하자보수', value: '2주 버그 수정' },
        { id: '2', label: '수정횟수', value: '1회 소규모 수정' },
        { id: '3', label: '일정', value: '빠른 배송' },
      ],
      expansions: [
        { id: '1', feature: '정식 제품', description: '전체 개발', amount: 1000 },
        { id: '2', feature: '모바일 앱', description: 'React Native 버전', amount: 800 },
        { id: '3', feature: '분석', description: '사용자 트래킹 설정', amount: 100 },
      ],
    },
    en: {
      project: {
        name: '',
        subtitle: 'MVP Development Proposal',
        description: 'Rapid prototype for market validation',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: 'Core feature implementation (3-5 features)' },
          { id: '2', value: 'Basic user authentication' },
          { id: '3', value: 'Simple responsive UI' },
          { id: '4', value: 'Basic database setup' },
          { id: '5', value: 'Quick deployment' },
        ],
        excludes: [
          { id: '1', value: 'Advanced security features' },
          { id: '2', value: 'Performance optimization' },
          { id: '3', value: 'Scalability considerations' },
          { id: '4', value: 'Comprehensive testing' },
          { id: '5', value: 'Documentation' },
        ],
      },
      techStack: [
        { id: '1', category: 'Frontend', name: 'Next.js' },
        { id: '2', category: 'Backend', name: 'Supabase / Firebase' },
        { id: '3', category: 'Styling', name: 'Tailwind CSS' },
        { id: '4', category: 'Hosting', name: 'Vercel' },
      ],
      phases: [
        {
          id: '1',
          name: 'Phase 1: Rapid Design',
          description: 'Quick wireframing and planning',
          amount: 100,
          items: [
            { id: '1', name: 'Feature prioritization', detail: 'Core vs nice-to-have', status: 'docs' },
            { id: '2', name: 'Wireframes', detail: 'Quick sketches', status: 'visual' },
          ],
        },
        {
          id: '2',
          name: 'Phase 2: Core Development',
          description: 'Build essential features',
          amount: 300,
          items: [
            { id: '1', name: 'Auth setup', detail: 'Basic login/signup', status: 'working' },
            { id: '2', name: 'Core features', detail: 'Main functionality', status: 'working' },
            { id: '3', name: 'Basic UI', detail: 'Functional interface', status: 'visual' },
          ],
        },
        {
          id: '3',
          name: 'Phase 3: Polish & Deploy',
          description: 'Final touches and launch',
          amount: 100,
          items: [
            { id: '1', name: 'Bug fixes', detail: 'Critical issues only', status: 'stabilization' },
            { id: '2', name: 'Deployment', detail: 'Quick launch', status: 'infra' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: 'Contract', condition: 'Upon signing', amount: 250 },
        { id: '2', phase: 'Final', condition: 'MVP launch', amount: 250 },
      ],
      schedule: [
        { id: '1', phase: 'Phase 1', duration: '3 days', deliverable: 'Wireframes' },
        { id: '2', phase: 'Phase 2', duration: '2 weeks', deliverable: 'Working MVP' },
        { id: '3', phase: 'Phase 3', duration: '3 days', deliverable: 'Live product' },
      ],
      terms: [
        { id: '1', label: 'Warranty', value: '2 weeks bug fixes' },
        { id: '2', label: 'Iterations', value: '1 round of minor changes' },
        { id: '3', label: 'Timeline', value: 'Fast-track delivery' },
      ],
      expansions: [
        { id: '1', feature: 'Full product', description: 'Complete development', amount: 1000 },
        { id: '2', feature: 'Mobile app', description: 'React Native version', amount: 800 },
        { id: '3', feature: 'Analytics', description: 'User tracking setup', amount: 100 },
      ],
    },
  },
}
