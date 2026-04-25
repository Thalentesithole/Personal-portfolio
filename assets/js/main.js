/* ============================================================
   THALENTE SITHOLE — Enhanced Portfolio JS
   ============================================================ */

/* 1. Floating neural background */
(function() {
  const bg = document.createElement('div');
  bg.className = 'neural-bg';
  document.body.prepend(bg);
  for (let i = 0; i < 18; i++) {
    const n = document.createElement('div');
    n.className = 'node';
    const s = Math.random() * 4 + 2;
    n.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${60+Math.random()*40}%;--dur:${6+Math.random()*8}s;--delay:${Math.random()*6}s;`;
    bg.appendChild(n);
  }
})();

/* 2. Inject logo */
(function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  nav.insertAdjacentHTML('afterbegin', `
    <a href="#home" class="nav__logo">
      <svg class="nav__logo-svg" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#3b9eff"/>
            <stop offset="55%" stop-color="#00e5ff"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
          <filter id="gl"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <polygon points="21,3 37,12 37,30 21,39 5,30 5,12" fill="none" stroke="url(#lg)" stroke-width="1.2" opacity="0.5"/>
        <line x1="21" y1="3"  x2="13" y2="16" stroke="#3b9eff" stroke-width="0.6" opacity="0.35"/>
        <line x1="21" y1="3"  x2="29" y2="16" stroke="#3b9eff" stroke-width="0.6" opacity="0.35"/>
        <line x1="13" y1="16" x2="29" y2="16" stroke="#3b9eff" stroke-width="0.6" opacity="0.25"/>
        <line x1="13" y1="16" x2="21" y2="30" stroke="#3b9eff" stroke-width="0.6" opacity="0.35"/>
        <line x1="29" y1="16" x2="21" y2="30" stroke="#3b9eff" stroke-width="0.6" opacity="0.35"/>
        <circle cx="21" cy="3"  r="2"   fill="url(#lg)" filter="url(#gl)"/>
        <circle cx="37" cy="12" r="1.5" fill="#3b9eff" opacity="0.5"/>
        <circle cx="37" cy="30" r="1.5" fill="#3b9eff" opacity="0.5"/>
        <circle cx="5"  cy="12" r="1.5" fill="#3b9eff" opacity="0.5"/>
        <circle cx="5"  cy="30" r="1.5" fill="#3b9eff" opacity="0.5"/>
        <circle cx="13" cy="16" r="1.8" fill="#00e5ff" filter="url(#gl)"/>
        <circle cx="29" cy="16" r="1.8" fill="#00e5ff" filter="url(#gl)"/>
        <text x="21" y="29" text-anchor="middle" font-family="Syne,sans-serif" font-weight="800" font-size="12.5" fill="url(#lg)" filter="url(#gl)" letter-spacing="-0.5">TS</text>
      </svg>
      <span class="nav__logo-text">Thalente<span>.dev</span></span>
    </a>
  `);

  // Favicon
  const svg = `<svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg"><rect width="42" height="42" rx="10" fill="#050810"/><polygon points="21,3 37,12 37,30 21,39 5,30 5,12" fill="none" stroke="#3b9eff" stroke-width="1.4" opacity="0.8"/><text x="21" y="26" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="13" fill="#3b9eff">TS</text></svg>`;
  let lnk = document.querySelector("link[rel*='icon']") || document.createElement('link');
  lnk.type = 'image/svg+xml'; lnk.rel = 'icon';
  lnk.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
  document.head.appendChild(lnk);
})();

/* 3. Skills section rebuild */
(function() {
  const skillData = [
    { cat:'ai',      icon:'ri-brain-line',       label:'AI & Machine Learning',    pills:['TensorFlow','OpenCV','NLP','Neural Networks','Computer Vision'] },
    { cat:'llm',     icon:'ri-sparkling-line',    label:'LLMs & Generative AI',     pills:['LangChain','OpenAI API','Hugging Face'] },
    { cat:'lang',    icon:'ri-code-s-slash-line', label:'Programming Languages',    pills:['Python','Java','JavaScript','C#','SQL'] },
    { cat:'data',    icon:'ri-database-2-line',   label:'Data Engineering',         pills:['MS SQL Server','MySQL','Pandas','NumPy','Power BI'] },
    { cat:'backend', icon:'ri-server-line',        label:'Backend & APIs',           pills:['Flask','REST APIs','Automation Anywhere','UiPath','Power Automate'] },
    { cat:'cloud',   icon:'ri-cloud-line',         label:'Cloud & MLOps',            pills:['Azure','AWS (basics)','Docker','GitHub Actions','Model Deployment'] },
    { cat:'front',   icon:'ri-layout-4-line',      label:'Frontend',                 pills:['HTML5','CSS3','JavaScript','React (basics)','Power Apps','UI/UX Design'] },
    { cat:'devops',  icon:'ri-tools-line',          label:'Dev Practices & Tools',    pills:['Git','GitHub','Agile/Scrum','Robot Framework','Selenium','Jupyter','VS Code'] },
  ];
  const container = document.querySelector('#skills .skills__container');
  if (!container) return;
  container.innerHTML = '';
  skillData.forEach(g => {
    const card = document.createElement('div');
    card.className = 'skills_content reveal';
    card.setAttribute('data-cat', g.cat);
    card.innerHTML = `
      <div class="skills__header">
        <i class="${g.icon} skills__icon"></i>
        <h3 class="skills__title">${g.label}</h3>
      </div>
      <div class="skills__pills">${g.pills.map(p=>`<span class="skill-pill">${p}</span>`).join('')}</div>
    `;
    container.appendChild(card);
  });
})();

/* 4. Sticky nav */
(function() {
  const h = document.getElementById('header');
  if (!h) return;
  window.addEventListener('scroll', () => h.classList.toggle('scrolled', scrollY > 60), { passive:true });
})();

/* 5. Mobile nav */
(function() {
  const t = document.getElementById('nav-toggle');
  const c = document.getElementById('nav-close');
  const m = document.getElementById('nav-menu');
  if (!t||!m) return;
  t.addEventListener('click', () => m.classList.add('open'));
  if(c) c.addEventListener('click', () => m.classList.remove('open'));
  m.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => m.classList.remove('open')));
})();

/* 6. Active nav on scroll */
(function() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__link');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active-link'));
        const a = document.querySelector(`.nav__link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active-link');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => obs.observe(s));
})();

/* 7. Scroll reveal */
(function() {
  const map = [
    ['.home__image',    'reveal-left'],
    ['.home__data',     'reveal-right'],
    ['.hello__details', 'reveal'],
    ['.button',         'reveal'],
    ['.resume__data',   'reveal'],
    ['.skills_content', 'reveal'],
    ['.project__item',  'reveal'],
    ['.contact__info',  'reveal-left'],
    ['.contact__form',  'reveal-right'],
    ['.section__title', 'reveal'],
  ];
  map.forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right'))
        el.classList.add(cls);
      if (i > 0 && i <= 5) el.classList.add(`delay-${i}`);
    });
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
})();

/* 8. Typing animation */
(function() {
  const el = document.querySelector('.home__work');
  if (!el) return;
  const texts = ['Junior AI Software Engineer','Junior RPA Developer','Aspiring AI Engineer','BSc Computer Science Graduate'];
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  const span = document.createElement('span');
  el.innerHTML = '';
  el.appendChild(span);
  el.appendChild(cursor);
  let ti = 0, ci = 0, del = false;
  function type() {
    const cur = texts[ti];
    if (!del) {
      span.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; return setTimeout(type, 2200); }
      setTimeout(type, 75);
    } else {
      span.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; ti = (ti+1)%texts.length; return setTimeout(type, 350); }
      setTimeout(type, 38);
    }
  }
  setTimeout(type, 900);
})();

/* 9. Hero SVG particles */
(function() {
  const home = document.querySelector('.home');
  if (!home) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.3;';
  const pts = Array.from({length:22},()=>({ x:Math.random()*100, y:Math.random()*100 }));
  pts.forEach((a,i) => {
    pts.slice(i+1).forEach(b => {
      const d = Math.hypot(a.x-b.x,a.y-b.y);
      if (d < 22) {
        const l = document.createElementNS('http://www.w3.org/2000/svg','line');
        l.setAttribute('x1',a.x+'%'); l.setAttribute('y1',a.y+'%');
        l.setAttribute('x2',b.x+'%'); l.setAttribute('y2',b.y+'%');
        l.setAttribute('stroke','#3b9eff'); l.setAttribute('stroke-width','0.5');
        l.setAttribute('opacity', String((1-d/22)*0.45));
        svg.appendChild(l);
      }
    });
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',a.x+'%'); c.setAttribute('cy',a.y+'%');
    c.setAttribute('r','1.5'); c.setAttribute('fill','#00e5ff'); c.setAttribute('opacity','0.45');
    svg.appendChild(c);
  });
  home.insertBefore(svg, home.firstChild);
})();

/* 10. Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

/* 11. Contact form */
(function () {
  // Clear placeholder message text
  const m = document.getElementById('contact-message');
  if (m && m.textContent.trim() === 'message') m.textContent = '';

  // Handle form submission
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // ← This stops the page from reloading

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('message').value.trim();
    const statusMsg = document.getElementById('contact-message');

    // Basic validation
    if (!name || !email || !message) {
      statusMsg.style.color = 'var(--accent-error, #f87171)';
      statusMsg.textContent = 'Please fill in all fields.';
      return;
    }

    // Show sending state
    const btn = form.querySelector('.contact__button');
    btn.disabled = true;
    btn.textContent = 'SENDING...';

    // ── Option A: EmailJS (recommended, free & no backend needed) ──────────
    // 1. Sign up at https://www.emailjs.com
    // 2. npm install @emailjs/browser  OR add their CDN script
    // 3. Replace the three IDs below with your own

    emailjs.sendForm('service_v5p6u3h', 'template_70m38kd', form, '_sEvzwV8RwYy7RX9V')
      .then(() => {
        statusMsg.style.color = 'var(--accent-emerald)';
        statusMsg.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        statusMsg.style.color = 'var(--accent-error, #f87171)';
        statusMsg.textContent = '✗ Something went wrong. Please try again.';
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = 'SEND';
      });

    // ── Option B: Formspree (even simpler — just change your form action) ──
    // Replace <form action="" ...> with:
    // <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
    // Then you DON'T need this JS submit handler at all — Formspree handles it.
  });
})();

/* 12. Cursor glow */
(function() {
  if (window.matchMedia('(hover: none)').matches) return;
  const g = document.createElement('div');
  g.style.cssText = 'position:fixed;pointer-events:none;z-index:9998;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(59,158,255,0.055) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left 0.12s ease,top 0.12s ease;left:0;top:0;';
  document.body.appendChild(g);
  window.addEventListener('mousemove', e => { g.style.left=e.clientX+'px'; g.style.top=e.clientY+'px'; }, { passive:true });
})();

/* 13. Filter fallback */
(function() {
  if (typeof mixitup !== 'undefined') return;
  const btns  = document.querySelectorAll('.category__btn');
  const items = document.querySelectorAll('.project__item');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active-work'));
      btn.classList.add('active-work');
      const f = btn.getAttribute('data-filter');
      items.forEach(item => {
        const show = f === 'all' || item.classList.contains(f.replace('.', ''));
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (show) {
          item.style.opacity = '1';
          item.style.transform = '';
          item.style.pointerEvents = '';
          item.style.display = '';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          item.style.pointerEvents = 'none';
          setTimeout(() => {
            if (!item.classList.contains(f.replace('.', '')) && f !== 'all') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
})();