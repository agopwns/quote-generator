import { Quote, DesignTemplate } from './types'
import { Language, getTranslation } from './i18n'

function formatAmount(amount: number, language: Language): string {
  if (language === 'en') {
    if (amount >= 10000) {
      return `${(amount / 10000).toLocaleString()}B KRW`
    }
    return `${amount.toLocaleString()}M KRW`
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString()}억원`
  }
  return `${amount.toLocaleString()}만원`
}

const getStatusLabels = (language: Language): Record<string, string> => ({
  visual: language === 'ko' ? '✓ 시각' : '✓ Visual',
  working: language === 'ko' ? '✓ 동작' : '✓ Logic',
  infra: language === 'ko' ? '✓ 인프라' : '✓ Infra',
  docs: language === 'ko' ? '✓ 문서' : '✓ Docs',
  stabilization: language === 'ko' ? '✓ QA' : '✓ QA',
})

// ============================================
// DEFAULT TEMPLATE STYLES
// ============================================
function getDefaultStyles(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif; 
      background: #f8fafc; 
      color: #1e293b;
      line-height: 1.6;
    }
    .container { max-width: 900px; margin: 0 auto; padding: 48px 24px; }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate { opacity: 0; animation: fadeInUp 0.6s ease-out forwards; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }
    .delay-6 { animation-delay: 0.6s; }
    .delay-7 { animation-delay: 0.7s; }
    .delay-8 { animation-delay: 0.8s; }
    .delay-9 { animation-delay: 0.9s; }
    
    .header { text-align: center; padding: 60px 0; border-bottom: 2px solid #e2e8f0; margin-bottom: 48px; }
    .header h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 12px; }
    .header .subtitle { font-size: 1.25rem; color: #64748b; margin-bottom: 24px; }
    .header .description { color: #94a3b8; margin-bottom: 24px; }
    .header .date { color: #cbd5e1; font-size: 0.875rem; }
    
    .section { margin-bottom: 48px; }
    .section-title { 
      font-size: 1.25rem; font-weight: 700; 
      border-bottom: 3px solid #3b82f6; 
      padding-bottom: 8px; margin-bottom: 24px;
      display: flex; align-items: center; gap: 8px;
    }
    .section-number { color: #3b82f6; }
    
    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    .table th { background: #f8fafc; font-weight: 600; }
    .table .amount { text-align: right; font-weight: 600; color: #3b82f6; }
    
    .scope-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .scope-box { padding: 20px; border-radius: 12px; }
    .scope-box.included { background: #f0fdf4; border: 2px solid #22c55e; }
    .scope-box.excluded { background: #fef2f2; border: 2px solid #ef4444; }
    .scope-box h4 { font-weight: 700; margin-bottom: 12px; }
    .scope-box.included h4 { color: #16a34a; }
    .scope-box.excluded h4 { color: #dc2626; }
    .scope-box ul { list-style: none; }
    .scope-box li { padding: 4px 0; font-size: 0.875rem; }
    
    .tech-stack { display: flex; flex-wrap: wrap; gap: 8px; }
    .tech-badge { background: #f1f5f9; padding: 8px 16px; border-radius: 8px; font-size: 0.875rem; }
    .tech-badge .category { color: #3b82f6; font-weight: 500; }
    
    .phase-card { background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 16px; border-left: 4px solid #3b82f6; }
    .phase-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .phase-name { font-size: 1.125rem; font-weight: 700; }
    .phase-amount { font-size: 1.5rem; font-weight: 700; color: #3b82f6; }
    .phase-goal { background: white; padding: 8px 12px; border-radius: 6px; font-size: 0.875rem; color: #64748b; margin-bottom: 16px; }
    .phase-items { list-style: none; }
    .phase-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .phase-item:last-child { border-bottom: none; }
    .phase-item .status { color: #22c55e; font-size: 0.875rem; }
    
    .total-box { 
      background: linear-gradient(135deg, #1e293b 0%, #475569 100%); 
      color: white; padding: 48px; border-radius: 16px; text-align: center; margin-bottom: 24px;
    }
    .total-label { font-size: 0.875rem; opacity: 0.8; margin-bottom: 8px; }
    .total-amount { font-size: 3rem; font-weight: 700; }
    .total-note { font-size: 0.75rem; opacity: 0.6; margin-top: 8px; }
    
    .timeline { position: relative; padding-left: 32px; }
    .timeline::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: #3b82f6; }
    .timeline-item { position: relative; padding-bottom: 24px; }
    .timeline-item::before { 
      content: ''; position: absolute; left: -28px; top: 4px; 
      width: 16px; height: 16px; background: #3b82f6; border-radius: 50%; 
      border: 3px solid white; box-shadow: 0 0 0 2px #3b82f6;
    }
    .timeline-phase { font-weight: 700; }
    .timeline-duration { color: #64748b; font-size: 0.875rem; }
    .timeline-deliverable { color: #94a3b8; font-size: 0.875rem; }
    
    .footer { text-align: center; padding-top: 48px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.875rem; }
  `
}

// ============================================
// NOTION TEMPLATE STYLES
// ============================================
function getNotionStyles(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif; 
      background: #ffffff; 
      color: #37352f;
      line-height: 1.6;
    }
    .container { max-width: 900px; margin: 0 auto; padding: 48px 32px; }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate { opacity: 0; animation: fadeInUp 0.5s ease-out forwards; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.15s; }
    .delay-3 { animation-delay: 0.2s; }
    .delay-4 { animation-delay: 0.25s; }
    .delay-5 { animation-delay: 0.3s; }
    .delay-6 { animation-delay: 0.35s; }
    .delay-7 { animation-delay: 0.4s; }
    .delay-8 { animation-delay: 0.45s; }
    .delay-9 { animation-delay: 0.5s; }
    
    .header { margin-bottom: 40px; }
    .header .icon { font-size: 4rem; margin-bottom: 16px; }
    .header h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 8px; }
    .header .subtitle { font-size: 1.125rem; color: #6b7280; }
    
    .info-box { background: #f7f6f3; border-radius: 8px; padding: 20px; margin-bottom: 40px; }
    .info-row { display: flex; align-items: center; padding: 8px 0; }
    .info-label { width: 140px; color: #6b7280; font-size: 0.875rem; }
    .info-value { font-size: 0.875rem; }
    .info-value.bold { font-weight: 600; }
    
    .callout { padding: 16px 20px; border-radius: 4px; margin-bottom: 16px; border-left: 4px solid; }
    .callout.green { background: #f0fdf4; border-color: #22c55e; }
    .callout.red { background: #fef2f2; border-color: #ef4444; }
    .callout h4 { font-weight: 700; margin-bottom: 12px; }
    .callout.green h4 { color: #16a34a; }
    .callout.red h4 { color: #dc2626; }
    .callout ul { list-style: none; }
    .callout li { padding: 4px 0; font-size: 0.875rem; display: flex; align-items: flex-start; gap: 8px; }
    
    .section { margin-bottom: 40px; }
    .section-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    
    .badge-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .badge { background: #f3f4f6; padding: 6px 12px; border-radius: 4px; font-size: 0.875rem; }
    
    .phase-box { border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px; overflow: hidden; }
    .phase-header { background: #f9fafb; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; }
    .phase-name { font-weight: 600; }
    .phase-amount { color: #3b82f6; font-weight: 700; }
    .phase-goal { background: #fef3c7; padding: 8px 16px; font-size: 0.875rem; color: #92400e; }
    .phase-items { padding: 16px; }
    .phase-item { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 0.875rem; }
    .phase-item .check { width: 16px; height: 16px; background: #dcfce7; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #16a34a; }
    .phase-item .detail { color: #9ca3af; }
    
    .total-box { background: #1f2937; color: white; padding: 32px; border-radius: 8px; text-align: center; margin-bottom: 24px; }
    .total-label { font-size: 0.875rem; color: #9ca3af; margin-bottom: 4px; }
    .total-amount { font-size: 2rem; font-weight: 700; }
    .total-note { font-size: 0.75rem; color: #6b7280; margin-top: 4px; }
    
    .payment-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px; }
    .payment-info { display: flex; align-items: center; gap: 12px; }
    .payment-num { width: 24px; height: 24px; background: #dbeafe; color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; }
    .payment-phase { font-weight: 500; }
    .payment-condition { color: #6b7280; font-size: 0.875rem; margin-left: 8px; }
    .payment-amount { color: #3b82f6; font-weight: 700; }
    
    .timeline-item { display: flex; align-items: flex-start; gap: 16px; padding: 12px 16px; border-left: 2px solid #3b82f6; background: #eff6ff; border-radius: 0 8px 8px 0; margin-bottom: 12px; }
    .timeline-content { flex: 1; }
    .timeline-phase { font-weight: 500; }
    .timeline-deliverable { font-size: 0.875rem; color: #6b7280; }
    .timeline-duration { font-size: 0.875rem; font-family: monospace; background: white; padding: 4px 8px; border-radius: 4px; }
    
    .terms-box { background: #f9fafb; border-radius: 8px; padding: 16px; }
    .terms-row { display: flex; padding: 8px 0; }
    .terms-label { width: 140px; color: #6b7280; font-size: 0.875rem; flex-shrink: 0; }
    .terms-value { font-size: 0.875rem; }
    
    .expansion-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border: 1px dashed #d1d5db; border-radius: 8px; margin-bottom: 8px; }
    .expansion-info .name { font-weight: 500; }
    .expansion-info .desc { color: #6b7280; font-size: 0.875rem; margin-left: 8px; }
    .expansion-amount { color: #6b7280; }
    
    .footer { text-align: center; padding-top: 32px; border-top: 1px solid #f3f4f6; color: #9ca3af; font-size: 0.875rem; }
  `
}

// ============================================
// SHADCN TEMPLATE STYLES
// ============================================
function getShadcnStyles(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif; 
      background: #f1f5f9; 
      color: #0f172a;
      line-height: 1.6;
    }
    .container { max-width: 900px; margin: 0 auto; padding: 32px 24px; }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate { opacity: 0; animation: fadeInUp 0.5s ease-out forwards; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.15s; }
    .delay-3 { animation-delay: 0.2s; }
    .delay-4 { animation-delay: 0.25s; }
    .delay-5 { animation-delay: 0.3s; }
    .delay-6 { animation-delay: 0.35s; }
    .delay-7 { animation-delay: 0.4s; }
    .delay-8 { animation-delay: 0.45s; }
    .delay-9 { animation-delay: 0.5s; }
    
    .card { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px; overflow: hidden; }
    .card-header { padding: 24px 24px 12px; }
    .card-content { padding: 12px 24px 24px; }
    .card-title { font-size: 1.125rem; font-weight: 600; }
    
    .header-card { text-align: center; }
    .header-card h1 { font-size: 1.875rem; font-weight: 700; letter-spacing: -0.025em; margin-bottom: 8px; }
    .header-card .subtitle { color: #64748b; }
    .header-card .meta { margin-top: 16px; display: flex; justify-content: center; gap: 12px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; }
    .badge-outline { border: 1px solid #e2e8f0; color: #64748b; }
    .badge-secondary { background: #f1f5f9; color: #475569; }
    .badge-primary { background: #0f172a; color: white; }
    
    .scope-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .scope-card { border-radius: 12px; padding: 20px; }
    .scope-card.included { background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.2); }
    .scope-card.excluded { background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); }
    .scope-card h4 { font-size: 0.875rem; font-weight: 600; margin-bottom: 12px; }
    .scope-card.included h4 { color: #15803d; }
    .scope-card.excluded h4 { color: #b91c1c; }
    .scope-card ul { list-style: none; }
    .scope-card li { padding: 6px 0; font-size: 0.875rem; display: flex; align-items: flex-start; gap: 8px; }
    .scope-card.included li::before { content: '•'; color: #22c55e; }
    .scope-card.excluded li::before { content: '•'; color: #ef4444; }
    
    .tech-badges { display: flex; flex-wrap: wrap; gap: 8px; }
    
    .phase-section { padding: 20px 0; border-bottom: 1px solid #e2e8f0; }
    .phase-section:last-child { border-bottom: none; }
    .phase-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .phase-name { font-weight: 600; }
    .phase-desc { font-size: 0.875rem; color: #64748b; }
    .phase-items { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .phase-item { display: flex; align-items: center; gap: 8px; padding: 8px; background: #f8fafc; border-radius: 6px; font-size: 0.875rem; }
    .phase-item .dot { width: 8px; height: 8px; background: #0f172a; border-radius: 50%; }
    .phase-item .detail { color: #64748b; font-size: 0.75rem; }
    
    .total-card { background: #0f172a; color: white; }
    .total-card .card-content { padding: 32px; text-align: center; }
    .total-label { font-size: 0.875rem; color: #94a3b8; margin-bottom: 8px; }
    .total-amount { font-size: 2.5rem; font-weight: 700; margin-bottom: 8px; }
    .total-note { font-size: 0.875rem; color: #64748b; }
    
    .payment-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px; }
    .payment-info .phase { font-weight: 500; }
    .payment-info .condition { color: #64748b; font-size: 0.875rem; margin-left: 8px; }
    
    .timeline { position: relative; padding-left: 24px; }
    .timeline::before { content: ''; position: absolute; left: 8px; top: 8px; bottom: 8px; width: 2px; background: rgba(15, 23, 42, 0.1); }
    .timeline-item { position: relative; padding: 12px 0; }
    .timeline-item::before { content: ''; position: absolute; left: -20px; top: 18px; width: 12px; height: 12px; background: #0f172a; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px #0f172a; }
    .timeline-header { display: flex; align-items: center; gap: 8px; }
    .timeline-phase { font-weight: 500; }
    .timeline-deliverable { font-size: 0.875rem; color: #64748b; }
    
    .terms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .terms-item { padding: 12px; background: #f8fafc; border-radius: 8px; }
    .terms-label { font-size: 0.75rem; color: #64748b; margin-bottom: 4px; }
    .terms-value { font-size: 0.875rem; font-weight: 500; }
    
    .expansion-card { border: 1px dashed #e2e8f0; }
    .expansion-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px dashed #e2e8f0; border-radius: 8px; margin-bottom: 8px; }
    .expansion-info .name { font-weight: 500; }
    .expansion-info .desc { color: #64748b; font-size: 0.875rem; margin-left: 8px; }
    .expansion-amount { color: #64748b; }
    
    .footer { text-align: center; padding: 16px 0; color: #64748b; font-size: 0.875rem; }
  `
}

// ============================================
// MINIMAL DARK TEMPLATE STYLES
// ============================================
function getMinimalStyles(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif; 
      background: #09090b; 
      color: #fafafa;
      line-height: 1.6;
    }
    .container { max-width: 900px; margin: 0 auto; padding: 48px 24px; }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate { opacity: 0; animation: fadeInUp 0.6s ease-out forwards; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }
    .delay-6 { animation-delay: 0.6s; }
    .delay-7 { animation-delay: 0.7s; }
    .delay-8 { animation-delay: 0.8s; }
    .delay-9 { animation-delay: 0.9s; }
    
    .header { margin-bottom: 64px; padding-bottom: 32px; border-bottom: 1px solid #27272a; }
    .header h1 { font-size: 3rem; font-weight: 300; letter-spacing: -0.025em; margin-bottom: 16px; }
    .header .subtitle { font-size: 1.125rem; color: #71717a; }
    .header .meta { margin-top: 24px; font-size: 0.875rem; color: #52525b; display: flex; gap: 24px; }
    
    .section { margin-bottom: 48px; }
    .section-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #52525b; margin-bottom: 24px; }
    
    .scope-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 48px; }
    .scope-col h4 { font-size: 0.875rem; margin-bottom: 16px; }
    .scope-col.included h4 { color: #10b981; }
    .scope-col.excluded h4 { color: #ef4444; }
    .scope-col ul { list-style: none; }
    .scope-col li { padding: 8px 0; font-size: 0.875rem; color: #a1a1aa; display: flex; align-items: flex-start; gap: 8px; }
    .scope-col.included li::before { content: '+'; color: #10b981; }
    .scope-col.excluded li::before { content: '−'; color: #ef4444; }
    
    .tech-list { display: flex; flex-wrap: wrap; gap: 12px; }
    .tech-item { font-size: 0.875rem; padding: 4px 12px; background: #18181b; color: #a1a1aa; border-radius: 4px; }
    
    .phase-item { border-left: 1px solid #27272a; padding-left: 24px; margin-bottom: 24px; }
    .phase-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
    .phase-name { font-size: 1.125rem; font-weight: 300; }
    .phase-amount { font-size: 1.25rem; font-weight: 300; }
    .phase-desc { font-size: 0.875rem; color: #52525b; margin-bottom: 12px; }
    .phase-tasks { list-style: none; }
    .phase-tasks li { font-size: 0.875rem; color: #71717a; padding: 4px 0; }
    .phase-tasks li .detail { color: #3f3f46; }
    
    .total-section { padding: 48px 0; border-top: 1px solid #27272a; border-bottom: 1px solid #27272a; margin: 48px 0; text-align: center; }
    .total-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #52525b; margin-bottom: 16px; }
    .total-amount { font-size: 3rem; font-weight: 300; }
    .total-note { font-size: 0.75rem; color: #3f3f46; margin-top: 8px; }
    
    .payment-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #18181b; }
    .payment-info .phase { color: #d4d4d8; }
    .payment-info .condition { color: #52525b; font-size: 0.875rem; margin-left: 12px; }
    .payment-amount { color: #a1a1aa; }
    
    .timeline-item { display: flex; align-items: baseline; gap: 24px; padding: 16px 0; }
    .timeline-duration { font-size: 0.875rem; color: #52525b; width: 80px; flex-shrink: 0; }
    .timeline-content .phase { color: #d4d4d8; }
    .timeline-content .deliverable { color: #52525b; font-size: 0.875rem; margin-left: 12px; }
    
    .terms-item { display: flex; gap: 24px; padding: 8px 0; font-size: 0.875rem; }
    .terms-label { width: 120px; color: #52525b; flex-shrink: 0; }
    .terms-value { color: #a1a1aa; }
    
    .expansion-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; font-size: 0.875rem; }
    .expansion-info .name { color: #a1a1aa; }
    .expansion-info .desc { color: #3f3f46; margin-left: 12px; }
    .expansion-amount { color: #52525b; }
    
    .footer { text-align: center; padding-top: 32px; border-top: 1px solid #18181b; font-size: 0.75rem; color: #3f3f46; }
  `
}

// ============================================
// FORMAL TEMPLATE STYLES
// ============================================
function getFormalStyles(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Noto Serif KR', Georgia, 'Times New Roman', serif; 
      background: #ffffff; 
      color: #1f2937;
      line-height: 1.8;
    }
    .container { max-width: 900px; margin: 0 auto; padding: 64px 48px; }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate { opacity: 0; animation: fadeInUp 0.6s ease-out forwards; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }
    .delay-6 { animation-delay: 0.6s; }
    .delay-7 { animation-delay: 0.7s; }
    .delay-8 { animation-delay: 0.8s; }
    .delay-9 { animation-delay: 0.9s; }
    
    .header { text-align: center; margin-bottom: 64px; padding-bottom: 32px; border-bottom: 2px solid #1f2937; }
    .header .doc-type { font-size: 0.75rem; letter-spacing: 0.3em; color: #6b7280; margin-bottom: 16px; }
    .header h1 { font-size: 1.875rem; font-weight: 700; margin-bottom: 8px; }
    .header .subtitle { color: #4b5563; }
    .header .meta { margin-top: 24px; font-size: 0.875rem; color: #6b7280; }
    
    .section { margin-bottom: 40px; }
    .section-title { font-size: 1.125rem; font-weight: 700; padding-bottom: 8px; margin-bottom: 16px; border-bottom: 1px solid #d1d5db; }
    .subsection-title { font-size: 0.875rem; font-weight: 700; margin: 16px 0 8px; }
    
    .overview-text { color: #4b5563; }
    
    .scope-list { list-style: none; margin-left: 16px; }
    .scope-list li { font-size: 0.875rem; color: #4b5563; padding: 4px 0; }
    
    .table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    .table th, .table td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    .table th { background: #f9fafb; font-weight: 600; }
    .table td.right { text-align: right; }
    .table tr.total { background: #1f2937; color: white; }
    .table tr.total td { font-weight: 700; }
    
    .phase-section { margin-bottom: 24px; }
    .phase-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
    .phase-title { font-size: 0.875rem; font-weight: 700; }
    .phase-amount { font-weight: 700; }
    .phase-desc { font-size: 0.875rem; color: #6b7280; font-style: italic; margin-bottom: 8px; }
    .phase-table { width: 100%; margin-left: 16px; font-size: 0.875rem; }
    .phase-table td { padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
    .phase-table td.num { width: 32px; color: #9ca3af; }
    .phase-table td.detail { color: #6b7280; }
    
    .expansion-note { font-size: 0.875rem; color: #6b7280; font-style: italic; margin-bottom: 16px; }
    
    .footer { text-align: center; margin-top: 64px; padding-top: 32px; border-top: 2px solid #1f2937; }
    .footer p { font-size: 0.875rem; color: #6b7280; margin-bottom: 8px; }
    .signature { display: inline-block; margin-top: 48px; text-align: left; }
    .signature-line { border-top: 1px solid #9ca3af; padding-top: 8px; width: 192px; }
    .signature-label { font-size: 0.875rem; font-weight: 500; }
    .signature-date { font-size: 0.75rem; color: #6b7280; }
  `
}

// ============================================
// GET STYLES BY TEMPLATE
// ============================================
function getStyles(template: DesignTemplate): string {
  switch (template) {
    case 'notion':
      return getNotionStyles()
    case 'shadcn':
      return getShadcnStyles()
    case 'minimal':
      return getMinimalStyles()
    case 'formal':
      return getFormalStyles()
    default:
      return getDefaultStyles()
  }
}

// ============================================
// RENDER CONTENT BY TEMPLATE
// ============================================
function renderDefaultContent(quote: Quote, language: Language): string {
  const t = getTranslation(language)
  const STATUS_LABELS = getStatusLabels(language)
  const totalAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)
  let sectionNum = 1
  let delayIndex = 1
  const getDelay = () => `delay-${Math.min(delayIndex++, 9)}`

  let html = `
    <div class="header animate">
      <h1>${quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}</h1>
      <p class="subtitle">${quote.project.subtitle}</p>
      ${quote.project.description ? `<p class="description">${quote.project.description}</p>` : ''}
      <p class="date">${quote.project.date}</p>
    </div>

    <section class="section animate ${getDelay()}">
      <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.overview')}</h2>
      <table class="table">
        <tr><td style="width:150px;background:#f8fafc;font-weight:600;">${t('table.project')}</td><td>${quote.project.name}</td></tr>
        ${quote.project.client ? `<tr><td style="background:#f8fafc;font-weight:600;">${t('table.client')}</td><td>${quote.project.client}</td></tr>` : ''}
        <tr><td style="background:#f8fafc;font-weight:600;">${t('table.totalCost')}</td><td class="amount">${formatAmount(totalAmount, language)} (${t('unit.vatExcluded')})</td></tr>
      </table>
    </section>

    <section class="section animate ${getDelay()}">
      <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.scope')}</h2>
      <div class="scope-grid">
        <div class="scope-box included">
          <h4>✓ ${t('section.included')}</h4>
          <ul>${quote.scope.includes.filter(i => i.value).map(i => `<li>• ${i.value}</li>`).join('')}</ul>
        </div>
        <div class="scope-box excluded">
          <h4>✗ ${t('section.excluded')}</h4>
          <ul>${quote.scope.excludes.filter(i => i.value).map(i => `<li>• ${i.value}</li>`).join('')}</ul>
        </div>
      </div>
    </section>
  `

  if (quote.techStack.some(tech => tech.name)) {
    html += `
      <section class="section animate ${getDelay()}">
        <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.techStack')}</h2>
        <div class="tech-stack">
          ${quote.techStack.filter(tech => tech.name).map(tech => `<div class="tech-badge"><span class="category">${tech.category}</span> ${tech.name}</div>`).join('')}
        </div>
      </section>
    `
  }

  html += `
    <section class="section animate ${getDelay()}">
      <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.phases')}</h2>
      ${quote.phases.map(phase => `
        <div class="phase-card">
          <div class="phase-header">
            <span class="phase-name">${phase.name}</span>
            <span class="phase-amount">${formatAmount(phase.amount, language)}</span>
          </div>
          ${phase.description ? `<div class="phase-goal">🎯 ${language === 'ko' ? '목표' : 'Goal'}: ${phase.description}</div>` : ''}
          <ul class="phase-items">
            ${phase.items.filter(i => i.name).map(i => `
              <li class="phase-item">
                <span>${i.name}${i.detail ? ` <span style="color:#94a3b8">- ${i.detail}</span>` : ''}</span>
                <span class="status">${STATUS_LABELS[i.status]}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </section>

    <section class="section animate ${getDelay()}">
      <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.costSummary')}</h2>
      <div class="total-box">
        <p class="total-label">${t('section.totalCost')}</p>
        <p class="total-amount">${formatAmount(totalAmount, language)}</p>
        <p class="total-note">${t('unit.vatExcluded')}</p>
      </div>
      <table class="table">
        <thead><tr><th>${t('table.phase')}</th><th>${t('table.description')}</th><th style="text-align:right">${t('table.amount')}</th><th style="text-align:right">${t('table.percent')}</th></tr></thead>
        <tbody>
          ${quote.phases.map(p => `
            <tr>
              <td>${p.name}</td>
              <td>${p.description || '-'}</td>
              <td class="amount">${formatAmount(p.amount, language)}</td>
              <td style="text-align:right">${totalAmount > 0 ? Math.round((p.amount / totalAmount) * 100) : 0}%</td>
            </tr>
          `).join('')}
          <tr style="background:#1e293b;color:white;font-weight:700;">
            <td colspan="2">${t('table.total')}</td>
            <td style="text-align:right">${formatAmount(totalAmount, language)}</td>
            <td style="text-align:right">100%</td>
          </tr>
        </tbody>
      </table>
    </section>
  `

  if (quote.paymentTerms.some(term => term.condition)) {
    html += `
      <section class="section animate ${getDelay()}">
        <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.paymentTerms')}</h2>
        <table class="table">
          <thead><tr><th>${t('table.timing')}</th><th>${t('table.condition')}</th><th style="text-align:right">${t('table.amount')}</th></tr></thead>
          <tbody>
            ${quote.paymentTerms.filter(term => term.condition).map(term => `
              <tr><td>${term.phase}</td><td>${term.condition}</td><td class="amount">${formatAmount(term.amount, language)}</td></tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    `
  }

  if (quote.schedule.some(s => s.phase)) {
    html += `
      <section class="section animate ${getDelay()}">
        <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.timeline')}</h2>
        <div class="timeline">
          ${quote.schedule.filter(s => s.phase).map(s => `
            <div class="timeline-item">
              <div class="timeline-phase">${s.phase} <span class="timeline-duration">(${s.duration})</span></div>
              <div class="timeline-deliverable">${s.deliverable}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `
  }

  if (quote.terms.some(term => term.label)) {
    html += `
      <section class="section animate ${getDelay()}">
        <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.terms')}</h2>
        <table class="table">
          ${quote.terms.filter(term => term.label).map(term => `
            <tr><td style="width:150px;background:#f8fafc;font-weight:600;">${term.label}</td><td>${term.value}</td></tr>
          `).join('')}
        </table>
      </section>
    `
  }

  if (quote.expansions.some(e => e.feature)) {
    html += `
      <section class="section animate ${getDelay()}">
        <h2 class="section-title"><span class="section-number">0${sectionNum++}</span> ${t('section.expansions')}</h2>
        <table class="table">
          <thead><tr><th>${t('table.feature')}</th><th>${t('table.description')}</th><th style="text-align:right">${t('table.estCost')}</th></tr></thead>
          <tbody>
            ${quote.expansions.filter(e => e.feature).map(e => `
              <tr><td>${e.feature}</td><td>${e.description}</td><td class="amount">${formatAmount(e.amount, language)}</td></tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    `
  }

  html += `
    <div class="footer animate ${getDelay()}">
      <p>${t('section.footer1')}</p>
      <p>${t('section.footer2')}</p>
    </div>
  `

  return html
}

function renderNotionContent(quote: Quote, language: Language): string {
  const t = getTranslation(language)
  const totalAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)
  let delayIndex = 1
  const getDelay = () => `delay-${Math.min(delayIndex++, 9)}`

  let html = `
    <div class="header animate">
      <div class="icon">📋</div>
      <h1>${quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}</h1>
      <p class="subtitle">${quote.project.subtitle}</p>
    </div>

    <div class="info-box animate ${getDelay()}">
      <div class="info-row">
        <span class="info-label">📅 ${language === 'ko' ? '날짜' : 'Date'}</span>
        <span class="info-value">${quote.project.date}</span>
      </div>
      ${quote.project.client ? `
        <div class="info-row">
          <span class="info-label">👤 ${t('table.client')}</span>
          <span class="info-value">${quote.project.client}</span>
        </div>
      ` : ''}
      <div class="info-row">
        <span class="info-label">💰 ${t('table.total')}</span>
        <span class="info-value bold">${formatAmount(totalAmount, language)}</span>
      </div>
      ${quote.project.description ? `
        <div class="info-row">
          <span class="info-label">📝 ${language === 'ko' ? '설명' : 'Description'}</span>
          <span class="info-value">${quote.project.description}</span>
        </div>
      ` : ''}
    </div>

    <div class="callout green animate ${getDelay()}">
      <h4>✅ ${t('section.included')}</h4>
      <ul>${quote.scope.includes.filter(i => i.value).map(i => `<li><span>•</span> ${i.value}</li>`).join('')}</ul>
    </div>

    <div class="callout red animate ${getDelay()}">
      <h4>❌ ${t('section.excluded')}</h4>
      <ul>${quote.scope.excludes.filter(i => i.value).map(i => `<li><span>•</span> ${i.value}</li>`).join('')}</ul>
    </div>
  `

  if (quote.techStack.some(tech => tech.name)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title"><span>🛠️</span> ${t('section.techStack')}</h2>
        <div class="badge-list">
          ${quote.techStack.filter(tech => tech.name).map(tech => `<span class="badge">${tech.category}: ${tech.name}</span>`).join('')}
        </div>
      </div>
    `
  }

  html += `
    <div class="section animate ${getDelay()}">
      <h2 class="section-title"><span>📦</span> ${t('section.phases')}</h2>
      ${quote.phases.map(phase => `
        <div class="phase-box">
          <div class="phase-header">
            <span class="phase-name">${phase.name}</span>
            <span class="phase-amount">${formatAmount(phase.amount, language)}</span>
          </div>
          ${phase.description ? `<div class="phase-goal">🎯 ${phase.description}</div>` : ''}
          <div class="phase-items">
            ${phase.items.filter(i => i.name).map(i => `
              <div class="phase-item">
                <span class="check">✓</span>
                <span>${i.name}</span>
                ${i.detail ? `<span class="detail">— ${i.detail}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="total-box animate ${getDelay()}">
      <p class="total-label">${t('section.totalCost')}</p>
      <p class="total-amount">${formatAmount(totalAmount, language)}</p>
      <p class="total-note">${t('unit.vatExcluded')}</p>
    </div>
  `

  if (quote.paymentTerms.some(term => term.condition)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title"><span>💳</span> ${t('section.paymentTerms')}</h2>
        ${quote.paymentTerms.filter(term => term.condition).map((term, idx) => `
          <div class="payment-item">
            <div class="payment-info">
              <span class="payment-num">${idx + 1}</span>
              <span class="payment-phase">${term.phase}</span>
              <span class="payment-condition">— ${term.condition}</span>
            </div>
            <span class="payment-amount">${formatAmount(term.amount, language)}</span>
          </div>
        `).join('')}
      </div>
    `
  }

  if (quote.schedule.some(s => s.phase)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title"><span>📅</span> ${t('section.timeline')}</h2>
        ${quote.schedule.filter(s => s.phase).map(s => `
          <div class="timeline-item">
            <div class="timeline-content">
              <span class="timeline-phase">${s.phase}</span>
              <span class="timeline-deliverable">${s.deliverable}</span>
            </div>
            <span class="timeline-duration">${s.duration}</span>
          </div>
        `).join('')}
      </div>
    `
  }

  if (quote.terms.some(term => term.label)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title"><span>📜</span> ${t('section.terms')}</h2>
        <div class="terms-box">
          ${quote.terms.filter(term => term.label).map(term => `
            <div class="terms-row">
              <span class="terms-label">${term.label}</span>
              <span class="terms-value">${term.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `
  }

  if (quote.expansions.some(e => e.feature)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title"><span>🚀</span> ${t('section.expansions')}</h2>
        ${quote.expansions.filter(e => e.feature).map(e => `
          <div class="expansion-item">
            <div class="expansion-info">
              <span class="name">${e.feature}</span>
              <span class="desc">— ${e.description}</span>
            </div>
            <span class="expansion-amount">${formatAmount(e.amount, language)}</span>
          </div>
        `).join('')}
      </div>
    `
  }

  html += `
    <div class="footer animate ${getDelay()}">
      <p>${t('section.footer1')}</p>
    </div>
  `

  return html
}

function renderShadcnContent(quote: Quote, language: Language): string {
  const t = getTranslation(language)
  const totalAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)
  let delayIndex = 1
  const getDelay = () => `delay-${Math.min(delayIndex++, 9)}`

  let html = `
    <div class="card header-card animate">
      <div class="card-header">
        <h1>${quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}</h1>
        <p class="subtitle">${quote.project.subtitle}</p>
      </div>
      <div class="card-content">
        ${quote.project.description ? `<p style="font-size:0.875rem;color:#64748b;margin-bottom:16px;">${quote.project.description}</p>` : ''}
        <div class="meta">
          <span class="badge badge-outline">${quote.project.date}</span>
          ${quote.project.client ? `<span class="badge badge-secondary">${quote.project.client}</span>` : ''}
        </div>
      </div>
    </div>

    <div class="scope-grid animate ${getDelay()}">
      <div class="scope-card included">
        <h4>✓ ${t('section.included')}</h4>
        <ul>${quote.scope.includes.filter(i => i.value).map(i => `<li>${i.value}</li>`).join('')}</ul>
      </div>
      <div class="scope-card excluded">
        <h4>✗ ${t('section.excluded')}</h4>
        <ul>${quote.scope.excludes.filter(i => i.value).map(i => `<li>${i.value}</li>`).join('')}</ul>
      </div>
    </div>
  `

  if (quote.techStack.some(tech => tech.name)) {
    html += `
      <div class="card animate ${getDelay()}">
        <div class="card-header">
          <h3 class="card-title">${t('section.techStack')}</h3>
        </div>
        <div class="card-content">
          <div class="tech-badges">
            ${quote.techStack.filter(tech => tech.name).map(tech => `<span class="badge badge-secondary">${tech.category}: ${tech.name}</span>`).join('')}
          </div>
        </div>
      </div>
    `
  }

  html += `
    <div class="card animate ${getDelay()}">
      <div class="card-header">
        <h3 class="card-title">${t('section.phases')}</h3>
      </div>
      <div class="card-content">
        ${quote.phases.map((phase, idx) => `
          <div class="phase-section" ${idx > 0 ? 'style="border-top:1px solid #e2e8f0;padding-top:20px;"' : ''}>
            <div class="phase-header">
              <div>
                <span class="phase-name">${phase.name}</span>
                ${phase.description ? `<p class="phase-desc">${phase.description}</p>` : ''}
              </div>
              <span class="badge badge-primary" style="font-size:1rem;padding:8px 16px;">${formatAmount(phase.amount, language)}</span>
            </div>
            <div class="phase-items">
              ${phase.items.filter(i => i.name).map(i => `
                <div class="phase-item">
                  <span class="dot"></span>
                  <span>${i.name}</span>
                  ${i.detail ? `<span class="detail">(${i.detail})</span>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card total-card animate ${getDelay()}">
      <div class="card-content">
        <p class="total-label">${t('section.totalCost')}</p>
        <p class="total-amount">${formatAmount(totalAmount, language)}</p>
        <p class="total-note">${t('unit.vatExcluded')}</p>
      </div>
    </div>
  `

  if (quote.paymentTerms.some(term => term.condition)) {
    html += `
      <div class="card animate ${getDelay()}">
        <div class="card-header">
          <h3 class="card-title">${t('section.paymentTerms')}</h3>
        </div>
        <div class="card-content">
          ${quote.paymentTerms.filter(term => term.condition).map(term => `
            <div class="payment-item">
              <div class="payment-info">
                <span class="phase">${term.phase}</span>
                <span class="condition">${term.condition}</span>
              </div>
              <span class="badge badge-outline" style="font-weight:700;">${formatAmount(term.amount, language)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `
  }

  if (quote.schedule.some(s => s.phase)) {
    html += `
      <div class="card animate ${getDelay()}">
        <div class="card-header">
          <h3 class="card-title">${t('section.timeline')}</h3>
        </div>
        <div class="card-content">
          <div class="timeline">
            ${quote.schedule.filter(s => s.phase).map(s => `
              <div class="timeline-item">
                <div class="timeline-header">
                  <span class="timeline-phase">${s.phase}</span>
                  <span class="badge badge-outline">${s.duration}</span>
                </div>
                <p class="timeline-deliverable">${s.deliverable}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `
  }

  if (quote.terms.some(term => term.label)) {
    html += `
      <div class="card animate ${getDelay()}">
        <div class="card-header">
          <h3 class="card-title">${t('section.terms')}</h3>
        </div>
        <div class="card-content">
          <div class="terms-grid">
            ${quote.terms.filter(term => term.label).map(term => `
              <div class="terms-item">
                <p class="terms-label">${term.label}</p>
                <p class="terms-value">${term.value}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `
  }

  if (quote.expansions.some(e => e.feature)) {
    html += `
      <div class="card expansion-card animate ${getDelay()}">
        <div class="card-header">
          <h3 class="card-title">${t('section.expansions')}</h3>
        </div>
        <div class="card-content">
          ${quote.expansions.filter(e => e.feature).map(e => `
            <div class="expansion-item">
              <div class="expansion-info">
                <span class="name">${e.feature}</span>
                <span class="desc">${e.description}</span>
              </div>
              <span class="expansion-amount">${formatAmount(e.amount, language)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `
  }

  html += `
    <div class="footer animate ${getDelay()}">
      <p>${t('section.footer1')}</p>
    </div>
  `

  return html
}

function renderMinimalContent(quote: Quote, language: Language): string {
  const t = getTranslation(language)
  const totalAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)
  let delayIndex = 1
  const getDelay = () => `delay-${Math.min(delayIndex++, 9)}`

  let html = `
    <div class="header animate">
      <h1>${quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}</h1>
      <p class="subtitle">${quote.project.subtitle}</p>
      <div class="meta">
        <span>${quote.project.date}</span>
        ${quote.project.client ? `<span>→ ${quote.project.client}</span>` : ''}
      </div>
    </div>

    ${quote.project.description ? `
      <div class="section animate ${getDelay()}">
        <p style="color:#a1a1aa;">${quote.project.description}</p>
      </div>
    ` : ''}

    <div class="section animate ${getDelay()}">
      <h2 class="section-title">${t('section.scope')}</h2>
      <div class="scope-grid">
        <div class="scope-col included">
          <h4>${t('section.included')}</h4>
          <ul>${quote.scope.includes.filter(i => i.value).map(i => `<li>${i.value}</li>`).join('')}</ul>
        </div>
        <div class="scope-col excluded">
          <h4>${t('section.excluded')}</h4>
          <ul>${quote.scope.excludes.filter(i => i.value).map(i => `<li>${i.value}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  `

  if (quote.techStack.some(tech => tech.name)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${t('section.techStack')}</h2>
        <div class="tech-list">
          ${quote.techStack.filter(tech => tech.name).map(tech => `<span class="tech-item">${tech.name}</span>`).join('')}
        </div>
      </div>
    `
  }

  html += `
    <div class="section animate ${getDelay()}">
      <h2 class="section-title">${t('section.phases')}</h2>
      ${quote.phases.map(phase => `
        <div class="phase-item">
          <div class="phase-header">
            <span class="phase-name">${phase.name}</span>
            <span class="phase-amount">${formatAmount(phase.amount, language)}</span>
          </div>
          ${phase.description ? `<p class="phase-desc">${phase.description}</p>` : ''}
          <ul class="phase-tasks">
            ${phase.items.filter(i => i.name).map(i => `
              <li>${i.name}${i.detail ? `<span class="detail"> — ${i.detail}</span>` : ''}</li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>

    <div class="total-section animate ${getDelay()}">
      <p class="total-label">${t('table.total')}</p>
      <p class="total-amount">${formatAmount(totalAmount, language)}</p>
      <p class="total-note">${t('unit.vatExcluded')}</p>
    </div>
  `

  if (quote.paymentTerms.some(term => term.condition)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${t('section.paymentTerms')}</h2>
        ${quote.paymentTerms.filter(term => term.condition).map(term => `
          <div class="payment-item">
            <div class="payment-info">
              <span class="phase">${term.phase}</span>
              <span class="condition">${term.condition}</span>
            </div>
            <span class="payment-amount">${formatAmount(term.amount, language)}</span>
          </div>
        `).join('')}
      </div>
    `
  }

  if (quote.schedule.some(s => s.phase)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${t('section.timeline')}</h2>
        ${quote.schedule.filter(s => s.phase).map(s => `
          <div class="timeline-item">
            <span class="timeline-duration">${s.duration}</span>
            <div class="timeline-content">
              <span class="phase">${s.phase}</span>
              <span class="deliverable">${s.deliverable}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `
  }

  if (quote.terms.some(term => term.label)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${t('section.terms')}</h2>
        ${quote.terms.filter(term => term.label).map(term => `
          <div class="terms-item">
            <span class="terms-label">${term.label}</span>
            <span class="terms-value">${term.value}</span>
          </div>
        `).join('')}
      </div>
    `
  }

  if (quote.expansions.some(e => e.feature)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${t('section.expansions')}</h2>
        ${quote.expansions.filter(e => e.feature).map(e => `
          <div class="expansion-item">
            <div class="expansion-info">
              <span class="name">${e.feature}</span>
              <span class="desc">${e.description}</span>
            </div>
            <span class="expansion-amount">${formatAmount(e.amount, language)}</span>
          </div>
        `).join('')}
      </div>
    `
  }

  html += `
    <div class="footer animate ${getDelay()}">
      <p>${t('section.footer1')}</p>
    </div>
  `

  return html
}

function renderFormalContent(quote: Quote, language: Language): string {
  const t = getTranslation(language)
  const totalAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)
  let sectionNum = 1
  let delayIndex = 1
  const getDelay = () => `delay-${Math.min(delayIndex++, 9)}`

  let html = `
    <div class="header animate">
      <p class="doc-type">${language === 'ko' ? '개발 제안서' : 'DEVELOPMENT PROPOSAL'}</p>
      <h1>${quote.project.name || (language === 'ko' ? '프로젝트명' : 'PROJECT NAME')}</h1>
      <p class="subtitle">${quote.project.subtitle}</p>
      <p class="meta">
        ${language === 'ko' ? '날짜' : 'Date'}: ${quote.project.date}
        ${quote.project.client ? ` &nbsp;|&nbsp; ${t('table.client')}: ${quote.project.client}` : ''}
      </p>
    </div>
  `

  if (quote.project.description) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${sectionNum++}. ${t('section.overview')}</h2>
        <p class="overview-text">${quote.project.description}</p>
      </div>
    `
  }

  html += `
    <div class="section animate ${getDelay()}">
      <h2 class="section-title">${sectionNum++}. ${t('section.scope')}</h2>
      <h3 class="subsection-title">${sectionNum - 1}.1 ${t('section.included')}</h3>
      <ol class="scope-list">
        ${quote.scope.includes.filter(i => i.value).map((i, idx) => `<li>${idx + 1}. ${i.value}</li>`).join('')}
      </ol>
      <h3 class="subsection-title">${sectionNum - 1}.2 ${t('section.excluded')}</h3>
      <ol class="scope-list">
        ${quote.scope.excludes.filter(i => i.value).map((i, idx) => `<li>${idx + 1}. ${i.value}</li>`).join('')}
      </ol>
    </div>
  `

  if (quote.techStack.some(tech => tech.name)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${sectionNum++}. ${t('section.techStack')}</h2>
        <table class="table">
          <thead>
            <tr>
              <th>${language === 'ko' ? '분류' : 'Category'}</th>
              <th>${language === 'ko' ? '기술' : 'Technology'}</th>
            </tr>
          </thead>
          <tbody>
            ${quote.techStack.filter(tech => tech.name).map(tech => `
              <tr>
                <td>${tech.category}</td>
                <td>${tech.name}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  html += `
    <div class="section animate ${getDelay()}">
      <h2 class="section-title">${sectionNum++}. ${t('section.phases')}</h2>
      ${quote.phases.map((phase, phaseIdx) => `
        <div class="phase-section">
          <div class="phase-header">
            <span class="phase-title">${sectionNum - 1}.${phaseIdx + 1} ${phase.name}</span>
            <span class="phase-amount">${formatAmount(phase.amount, language)}</span>
          </div>
          ${phase.description ? `<p class="phase-desc">${phase.description}</p>` : ''}
          <table class="phase-table">
            <tbody>
              ${phase.items.filter(i => i.name).map((i, idx) => `
                <tr>
                  <td class="num">${idx + 1})</td>
                  <td>${i.name}</td>
                  <td class="detail">${i.detail || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
    </div>

    <div class="section animate ${getDelay()}">
      <h2 class="section-title">${sectionNum++}. ${t('section.costSummary')}</h2>
      <table class="table">
        <thead>
          <tr>
            <th>${t('table.phase')}</th>
            <th>${t('table.description')}</th>
            <th class="right">${t('table.amount')}</th>
          </tr>
        </thead>
        <tbody>
          ${quote.phases.map(p => `
            <tr>
              <td>${p.name}</td>
              <td>${p.description || '-'}</td>
              <td class="right">${formatAmount(p.amount, language)}</td>
            </tr>
          `).join('')}
          <tr class="total">
            <td colspan="2">${t('table.total')} (${t('unit.vatExcluded')})</td>
            <td class="right">${formatAmount(totalAmount, language)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `

  if (quote.paymentTerms.some(term => term.condition)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${sectionNum++}. ${t('section.paymentTerms')}</h2>
        <table class="table">
          <thead>
            <tr>
              <th>${t('table.timing')}</th>
              <th>${t('table.condition')}</th>
              <th class="right">${t('table.amount')}</th>
            </tr>
          </thead>
          <tbody>
            ${quote.paymentTerms.filter(term => term.condition).map(term => `
              <tr>
                <td>${term.phase}</td>
                <td>${term.condition}</td>
                <td class="right">${formatAmount(term.amount, language)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  if (quote.schedule.some(s => s.phase)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${sectionNum++}. ${t('section.timeline')}</h2>
        <table class="table">
          <thead>
            <tr>
              <th>${t('table.phase')}</th>
              <th>${t('table.duration')}</th>
              <th>${t('table.deliverable')}</th>
            </tr>
          </thead>
          <tbody>
            ${quote.schedule.filter(s => s.phase).map(s => `
              <tr>
                <td>${s.phase}</td>
                <td>${s.duration}</td>
                <td>${s.deliverable}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  if (quote.terms.some(term => term.label)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${sectionNum++}. ${t('section.terms')}</h2>
        <table class="table">
          <tbody>
            ${quote.terms.filter(term => term.label).map(term => `
              <tr>
                <td style="width:160px;font-weight:500;">${term.label}</td>
                <td>${term.value}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  if (quote.expansions.some(e => e.feature)) {
    html += `
      <div class="section animate ${getDelay()}">
        <h2 class="section-title">${sectionNum++}. ${t('section.expansions')}</h2>
        <p class="expansion-note">${language === 'ko' ? '다음 기능은 향후 확장 옵션으로 제공됩니다:' : 'The following features are available as future enhancements:'}</p>
        <table class="table">
          <thead>
            <tr>
              <th>${t('table.feature')}</th>
              <th>${t('table.description')}</th>
              <th class="right">${t('table.estCost')}</th>
            </tr>
          </thead>
          <tbody>
            ${quote.expansions.filter(e => e.feature).map(e => `
              <tr>
                <td>${e.feature}</td>
                <td>${e.description}</td>
                <td class="right">${formatAmount(e.amount, language)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  html += `
    <div class="footer animate ${getDelay()}">
      <p>${t('section.footer1')}</p>
      <p>${t('section.footer2')}</p>
      <div class="signature">
        <div class="signature-line">
          <p class="signature-label">${language === 'ko' ? '서명' : 'Authorized Signature'}</p>
          <p class="signature-date">${language === 'ko' ? '날짜' : 'Date'}: _______________</p>
        </div>
      </div>
    </div>
  `

  return html
}

// ============================================
// RENDER CONTENT BY TEMPLATE
// ============================================
function renderContent(quote: Quote, language: Language, template: DesignTemplate): string {
  switch (template) {
    case 'notion':
      return renderNotionContent(quote, language)
    case 'shadcn':
      return renderShadcnContent(quote, language)
    case 'minimal':
      return renderMinimalContent(quote, language)
    case 'formal':
      return renderFormalContent(quote, language)
    default:
      return renderDefaultContent(quote, language)
  }
}

// ============================================
// GENERATE & DOWNLOAD HTML
// ============================================
export function generateAnimatedHTML(quote: Quote, language: Language = 'ko', template: DesignTemplate = 'default'): string {
  const fontFamily = template === 'formal' 
    ? 'Noto+Serif+KR:wght@400;500;600;700' 
    : 'Noto+Sans+KR:wght@400;500;600;700'
  
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${quote.project.name || (language === 'ko' ? '견적서' : 'Quote')} - ${language === 'ko' ? '개발 견적서' : 'Development Quote'}</title>
  <link href="https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap" rel="stylesheet">
  <style>${getStyles(template)}</style>
</head>
<body>
  <div class="container">
    ${renderContent(quote, language, template)}
  </div>
</body>
</html>`
}

export function downloadHTML(quote: Quote, language: Language = 'ko', template: DesignTemplate = 'default') {
  const html = generateAnimatedHTML(quote, language, template)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${quote.project.name || 'quote'}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
