export interface DevItemPreset {
  id: string
  name: string
  detail: string
  status: 'visual' | 'working' | 'infra' | 'docs' | 'stabilization'
  suggestedAmount: number
  category: 'backend' | 'frontend' | 'infra' | 'auth' | 'payment' | 'etc'
}

export const PRESET_CATEGORIES: Record<string, string> = {
  backend: '🔧 백엔드',
  auth: '🔑 인증',
  payment: '💳 결제',
  frontend: '🎨 프론트엔드',
  infra: '☁️ 인프라',
  etc: '📦 기타',
}

export const DEV_ITEM_PRESETS: DevItemPreset[] = [
  { id: 'supabase', name: 'Supabase 백엔드', detail: 'Auth, DB, Storage', status: 'infra', suggestedAmount: 200, category: 'backend' },
  { id: 'firebase', name: 'Firebase 백엔드', detail: 'Auth, Firestore, FCM', status: 'infra', suggestedAmount: 200, category: 'backend' },
  { id: 'custom-api', name: 'REST API 서버', detail: 'Node.js/Express', status: 'working', suggestedAmount: 300, category: 'backend' },
  { id: 'graphql', name: 'GraphQL API', detail: 'Apollo Server', status: 'working', suggestedAmount: 350, category: 'backend' },
  { id: 'db-design', name: 'DB 설계', detail: 'ERD, 스키마 설계', status: 'docs', suggestedAmount: 100, category: 'backend' },

  { id: 'social-login', name: '소셜 로그인', detail: 'Google, Kakao, Apple', status: 'working', suggestedAmount: 100, category: 'auth' },
  { id: 'jwt-auth', name: 'JWT 인증', detail: '토큰 기반 인증', status: 'working', suggestedAmount: 80, category: 'auth' },
  { id: 'oauth2', name: 'OAuth 2.0', detail: '외부 서비스 연동', status: 'working', suggestedAmount: 120, category: 'auth' },
  { id: 'rbac', name: '권한 관리', detail: '역할 기반 접근 제어', status: 'working', suggestedAmount: 150, category: 'auth' },

  { id: 'toss-payment', name: '토스페이먼츠', detail: 'PG 연동', status: 'working', suggestedAmount: 150, category: 'payment' },
  { id: 'stripe', name: 'Stripe 결제', detail: '해외 결제', status: 'working', suggestedAmount: 150, category: 'payment' },
  { id: 'iap', name: '인앱 결제', detail: 'iOS/Android IAP', status: 'working', suggestedAmount: 200, category: 'payment' },
  { id: 'subscription', name: '구독 결제', detail: '정기 결제 시스템', status: 'working', suggestedAmount: 200, category: 'payment' },

  { id: 'responsive', name: '반응형 디자인', detail: 'PC/태블릿/모바일', status: 'visual', suggestedAmount: 100, category: 'frontend' },
  { id: 'admin-dashboard', name: '관리자 대시보드', detail: 'CRUD, 통계', status: 'working', suggestedAmount: 300, category: 'frontend' },
  { id: 'chart', name: '차트/그래프', detail: 'Recharts/Chart.js', status: 'visual', suggestedAmount: 80, category: 'frontend' },
  { id: 'file-upload', name: '파일 업로드', detail: '이미지, 문서 업로드', status: 'working', suggestedAmount: 80, category: 'frontend' },
  { id: 'editor', name: '리치 텍스트 에디터', detail: 'TipTap/Quill', status: 'working', suggestedAmount: 120, category: 'frontend' },

  { id: 'aws-deploy', name: 'AWS 배포', detail: 'EC2, RDS, S3', status: 'infra', suggestedAmount: 150, category: 'infra' },
  { id: 'vercel', name: 'Vercel 배포', detail: '프론트엔드 호스팅', status: 'infra', suggestedAmount: 50, category: 'infra' },
  { id: 'cicd', name: 'CI/CD 구축', detail: 'GitHub Actions', status: 'infra', suggestedAmount: 100, category: 'infra' },
  { id: 'docker', name: 'Docker 컨테이너', detail: '컨테이너화', status: 'infra', suggestedAmount: 100, category: 'infra' },

  { id: 'push', name: '푸시 알림', detail: 'FCM/APNs', status: 'working', suggestedAmount: 100, category: 'etc' },
  { id: 'i18n', name: '다국어 지원', detail: 'i18n 설정', status: 'working', suggestedAmount: 100, category: 'etc' },
  { id: 'seo', name: 'SEO 최적화', detail: '메타태그, 사이트맵', status: 'docs', suggestedAmount: 50, category: 'etc' },
  { id: 'analytics', name: '분석 도구', detail: 'GA, Mixpanel', status: 'infra', suggestedAmount: 50, category: 'etc' },
  { id: 'email', name: '이메일 발송', detail: 'SendGrid/SES', status: 'working', suggestedAmount: 80, category: 'etc' },
]
