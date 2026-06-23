/* ══════════════════════════════════════════════
   main.js — Fateh Digital Services
   ══════════════════════════════════════════════ */

/* ─── Service data (uses i18n keys) ─────────── */
const SERVICES = [
  { icon: '🏛️', titleKey: 'svc_csc_title',    descKey: 'svc_csc_desc',    tagKey: 'svc_csc_tag'    },
  { icon: '💻', titleKey: 'svc_coding_title', descKey: 'svc_coding_desc', tagKey: 'svc_coding_tag' },
  { icon: '🤖', titleKey: 'svc_ai_title',     descKey: 'svc_ai_desc',     tagKey: 'svc_ai_tag'     },
  { icon: '📱', titleKey: 'svc_apps_title',   descKey: 'svc_apps_desc',   tagKey: 'svc_apps_tag'   },
  { icon: '📈', titleKey: 'svc_market_title', descKey: 'svc_market_desc', tagKey: 'svc_market_tag' },
  { icon: '🏦', titleKey: 'svc_demat_title',  descKey: 'svc_demat_desc',  tagKey: 'svc_demat_tag'  },
  { icon: '🧾', titleKey: 'svc_itr_title',    descKey: 'svc_itr_desc',    tagKey: 'svc_itr_tag'    },
  { icon: '📡', titleKey: 'svc_recharge_title',descKey:'svc_recharge_desc',tagKey:'svc_recharge_tag'},
  { icon: '🚆', titleKey: 'svc_travel_title', descKey: 'svc_travel_desc', tagKey: 'svc_travel_tag' },
  { icon: '🖨️', titleKey: 'svc_docs_title',   descKey: 'svc_docs_desc',   tagKey: 'svc_docs_tag'   },
];

const WHY_POINTS = ['why_point_1','why_point_2','why_point_3','why_point_4'];
const PILLS = ['pill_csc','pill_govt','pill_ai','pill_coding','pill_itr','pill_demat','pill_travel','pill_docs'];

/* ─── Render services grid ───────────────────── */
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map((s, i) => `
    <div class="service-card reveal" style="transition-delay:${i * 50}ms">
      <span class="card-icon">${s.icon}</span>
      <h3 class="card-title">${t(s.titleKey)}</h3>
      <p class="card-desc">${t(s.descKey)}</p>
      <span class="card-tag">${t(s.tagKey)}</span>
    </div>
  `).join('');
  observeReveal();
}

/* ─── Render Why Us ──────────────────────────── */
function renderWhyUs() {
  const list = document.getElementById('why-list');
  if (list) {
    list.innerHTML = WHY_POINTS.map(k => `<li>${t(k)}</li>`).join('');
  }
  const pills = document.getElementById('feature-pills');
  if (pills) {
    pills.innerHTML = PILLS.map(k => `<span class="feature-pill">${t(k)}</span>`).join('');
  }
}

/* ─── Language switcher ──────────────────────── */
function initLangSwitcher() {
  const btn      = document.getElementById('lang-btn');
  const dropdown = document.getElementById('lang-dropdown');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  dropdown.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      applyLanguage(li.dataset.lang);
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });
}

/* ─── Hamburger menu ────────────────────────── */
function initHamburger() {
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    links.classList.toggle('open');
  });
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ─── Sticky header shadow ───────────────────── */
function initScrollHeader() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ─── Scroll reveal ──────────────────────────── */
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ─── Mark static elements for reveal ────────── */
function markRevealElements() {
  const staticSelectors = [
    '.hero-content', '.hero-visual',
    '.service-card',
    '.why-text', '.why-visual',
    '.info-item', '.contact-map-placeholder',
  ];
  staticSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });
}

/* ─── Init ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderWhyUs();
  applyLanguage(currentLang);  // apply saved or default language
  initLangSwitcher();
  initHamburger();
  initScrollHeader();
  markRevealElements();
  observeReveal();
});
