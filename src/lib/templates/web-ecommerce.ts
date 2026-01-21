import { ProjectTemplate } from '../types'

export const webEcommerceTemplate: ProjectTemplate = {
  id: 'web-ecommerce',
  name: '쇼핑몰',
  icon: '🛒',
  description: '결제 기능 포함 온라인 쇼핑몰',
  category: 'web',
  data: {
    ko: {
      project: {
        name: '',
        subtitle: '쇼핑몰 개발 제안서',
        description: '모든 기능을 갖춘 온라인 쇼핑 플랫폼',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: '상품 카탈로그 및 검색' },
          { id: '2', value: '장바구니 및 위시리스트' },
          { id: '3', value: '회원 인증 및 프로필' },
          { id: '4', value: 'PG(결제 게이트웨이) 연동' },
          { id: '5', value: '주문 관리 시스템' },
          { id: '6', value: '관리자 대시보드' },
          { id: '7', value: '재고 관리' },
        ],
        excludes: [
          { id: '1', value: '서버 호스팅 비용' },
          { id: '2', value: 'PG 수수료' },
          { id: '3', value: '상품 사진 촬영' },
          { id: '4', value: '상품 데이터 입력' },
        ],
      },
      techStack: [
        { id: '1', category: '프론트엔드', name: 'Next.js + TypeScript' },
        { id: '2', category: '백엔드', name: 'Node.js + Express' },
        { id: '3', category: '데이터베이스', name: 'PostgreSQL' },
        { id: '4', category: '결제', name: '토스페이먼츠 / Stripe' },
        { id: '5', category: '클라우드', name: 'AWS (EC2, S3, RDS)' },
        { id: '6', category: '검색', name: 'Elasticsearch' },
      ],
      phases: [
        {
          id: '1',
          name: '1단계: 기획 및 디자인',
          description: '요구사항 분석 및 UI/UX 디자인',
          amount: 300,
          items: [
            { id: '1', name: '요구사항 분석', detail: '기능 명세서', status: 'docs' },
            { id: '2', name: '데이터베이스 설계', detail: 'ERD, 스키마', status: 'docs' },
            { id: '3', name: 'UI/UX 디자인', detail: 'Figma 프로토타입', status: 'visual' },
          ],
        },
        {
          id: '2',
          name: '2단계: 백엔드 개발',
          description: 'API 및 데이터베이스 구현',
          amount: 500,
          items: [
            { id: '1', name: '회원 시스템', detail: '인증, 프로필', status: 'working' },
            { id: '2', name: '상품 관리', detail: 'CRUD, 카테고리', status: 'working' },
            { id: '3', name: '주문 시스템', detail: '장바구니, 결제', status: 'working' },
            { id: '4', name: '결제 연동', detail: 'PG 연동', status: 'working' },
          ],
        },
        {
          id: '3',
          name: '3단계: 프론트엔드 개발',
          description: '사용자용 쇼핑몰 화면',
          amount: 400,
          items: [
            { id: '1', name: '상품 페이지', detail: '목록, 상세, 검색', status: 'visual' },
            { id: '2', name: '결제 플로우', detail: '장바구니, 결제', status: 'working' },
            { id: '3', name: '회원 대시보드', detail: '주문내역, 프로필', status: 'visual' },
          ],
        },
        {
          id: '4',
          name: '4단계: 관리자 및 테스트',
          description: '관리자 패널 및 QA',
          amount: 300,
          items: [
            { id: '1', name: '관리자 대시보드', detail: '통계, 관리', status: 'working' },
            { id: '2', name: 'QA 테스트', detail: '전체 테스트 사이클', status: 'stabilization' },
            { id: '3', name: '배포', detail: '프로덕션 설정', status: 'infra' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: '계약금', condition: '계약 체결 시', amount: 450 },
        { id: '2', phase: '중도금', condition: '백엔드 완료 시', amount: 450 },
        { id: '3', phase: '잔금', condition: '프로젝트 런칭 시', amount: 600 },
      ],
      schedule: [
        { id: '1', phase: '1단계', duration: '2주', deliverable: '디자인, DB 스키마' },
        { id: '2', phase: '2단계', duration: '4주', deliverable: 'API 서버' },
        { id: '3', phase: '3단계', duration: '3주', deliverable: '쇼핑몰 화면' },
        { id: '4', phase: '4단계', duration: '2주', deliverable: '관리자, 런칭' },
      ],
      terms: [
        { id: '1', label: '하자보수', value: '런칭 후 3개월' },
        { id: '2', label: '소스코드', value: '전체 소유권 이전' },
        { id: '3', label: '교육', value: '관리자 교육 2시간 포함' },
      ],
      expansions: [
        { id: '1', feature: '리뷰 시스템', description: '상품 리뷰 및 평점', amount: 150 },
        { id: '2', feature: '쿠폰 시스템', description: '할인, 프로모션', amount: 120 },
        { id: '3', feature: '멀티벤더', description: '마켓플레이스 기능', amount: 400 },
      ],
    },
    en: {
      project: {
        name: '',
        subtitle: 'E-commerce Development Proposal',
        description: 'Full-featured online shopping platform',
        date: '',
        client: '',
      },
      scope: {
        includes: [
          { id: '1', value: 'Product catalog & search' },
          { id: '2', value: 'Shopping cart & wishlist' },
          { id: '3', value: 'User authentication & profiles' },
          { id: '4', value: 'Payment gateway integration (PG)' },
          { id: '5', value: 'Order management system' },
          { id: '6', value: 'Admin dashboard' },
          { id: '7', value: 'Inventory management' },
        ],
        excludes: [
          { id: '1', value: 'Server hosting costs' },
          { id: '2', value: 'PG transaction fees' },
          { id: '3', value: 'Product photography' },
          { id: '4', value: 'Product data entry' },
        ],
      },
      techStack: [
        { id: '1', category: 'Frontend', name: 'Next.js + TypeScript' },
        { id: '2', category: 'Backend', name: 'Node.js + Express' },
        { id: '3', category: 'Database', name: 'PostgreSQL' },
        { id: '4', category: 'Payment', name: 'Toss Payments / Stripe' },
        { id: '5', category: 'Cloud', name: 'AWS (EC2, S3, RDS)' },
        { id: '6', category: 'Search', name: 'Elasticsearch' },
      ],
      phases: [
        {
          id: '1',
          name: 'Phase 1: Planning & Design',
          description: 'Requirements and UI/UX design',
          amount: 300,
          items: [
            { id: '1', name: 'Requirements analysis', detail: 'Feature specifications', status: 'docs' },
            { id: '2', name: 'Database design', detail: 'ERD, schema', status: 'docs' },
            { id: '3', name: 'UI/UX design', detail: 'Figma prototype', status: 'visual' },
          ],
        },
        {
          id: '2',
          name: 'Phase 2: Backend Development',
          description: 'API and database implementation',
          amount: 500,
          items: [
            { id: '1', name: 'User system', detail: 'Auth, profiles', status: 'working' },
            { id: '2', name: 'Product management', detail: 'CRUD, categories', status: 'working' },
            { id: '3', name: 'Order system', detail: 'Cart, checkout', status: 'working' },
            { id: '4', name: 'Payment integration', detail: 'PG connection', status: 'working' },
          ],
        },
        {
          id: '3',
          name: 'Phase 3: Frontend Development',
          description: 'User-facing storefront',
          amount: 400,
          items: [
            { id: '1', name: 'Product pages', detail: 'List, detail, search', status: 'visual' },
            { id: '2', name: 'Checkout flow', detail: 'Cart, payment', status: 'working' },
            { id: '3', name: 'User dashboard', detail: 'Orders, profile', status: 'visual' },
          ],
        },
        {
          id: '4',
          name: 'Phase 4: Admin & Testing',
          description: 'Admin panel and QA',
          amount: 300,
          items: [
            { id: '1', name: 'Admin dashboard', detail: 'Analytics, management', status: 'working' },
            { id: '2', name: 'QA testing', detail: 'Full test cycle', status: 'stabilization' },
            { id: '3', name: 'Deployment', detail: 'Production setup', status: 'infra' },
          ],
        },
      ],
      paymentTerms: [
        { id: '1', phase: 'Contract', condition: 'Upon signing', amount: 450 },
        { id: '2', phase: 'Midterm', condition: 'Backend completion', amount: 450 },
        { id: '3', phase: 'Final', condition: 'Project launch', amount: 600 },
      ],
      schedule: [
        { id: '1', phase: 'Phase 1', duration: '2 weeks', deliverable: 'Design, DB schema' },
        { id: '2', phase: 'Phase 2', duration: '4 weeks', deliverable: 'API server' },
        { id: '3', phase: 'Phase 3', duration: '3 weeks', deliverable: 'Storefront' },
        { id: '4', phase: 'Phase 4', duration: '2 weeks', deliverable: 'Admin, launch' },
      ],
      terms: [
        { id: '1', label: 'Warranty', value: '3 months after launch' },
        { id: '2', label: 'Source code', value: 'Full ownership transfer' },
        { id: '3', label: 'Training', value: '2 hours admin training included' },
      ],
      expansions: [
        { id: '1', feature: 'Review system', description: 'Product reviews & ratings', amount: 150 },
        { id: '2', feature: 'Coupon system', description: 'Discounts, promotions', amount: 120 },
        { id: '3', feature: 'Multi-vendor', description: 'Marketplace features', amount: 400 },
      ],
    },
  },
}
