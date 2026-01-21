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

function getStyles(): string {
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
    
    .scope-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
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

function renderContent(quote: Quote, language: Language): string {
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

  if (quote.techStack.some(t => t.name)) {
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

export function generateAnimatedHTML(quote: Quote, language: Language = 'ko'): string {
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${quote.project.name || (language === 'ko' ? '견적서' : 'Quote')} - ${language === 'ko' ? '개발 견적서' : 'Development Quote'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${getStyles()}</style>
</head>
<body>
  <div class="container">
    ${renderContent(quote, language)}
  </div>
</body>
</html>`
}

export function downloadHTML(quote: Quote, language: Language = 'ko') {
  const html = generateAnimatedHTML(quote, language)
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
