
(() => {
  'use strict';

  /* =========================================
     CUSTOM CURSOR
     ========================================= */
  function initCursor() {
    const cursor     = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursor.className     = 'cursor';
    cursorRing.className = 'cursor-ring';
    document.body.append(cursor, cursorRing);

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    // Trailing ring
    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Scale on hover
    document.querySelectorAll('a, button, .feature-block').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform     = 'translate(-50%,-50%) scale(2.2)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
        cursorRing.style.borderColor = 'rgba(99,210,255,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform     = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(99,210,255,0.45)';
      });
    });

    // Hide on leave
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  /* =========================================
     SCROLL PROGRESS BAR
     ========================================= */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      const pct   = total > 0 ? (scrollY / total) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* =========================================
     AMBIENT ORBS
     ========================================= */
  function initOrbs() {
    [1,2,3].forEach(n => {
      const orb = document.createElement('div');
      orb.className = `orb orb-${n}`;
      document.body.prepend(orb);
    });
  }

  /* =========================================
     STICKY HEADER
     ========================================= */
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =========================================
     MOBILE NAV
     ========================================= */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const close  = document.getElementById('nav-close');
    const menu   = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => menu.classList.add('show-menu'));
    close?.addEventListener('click', () => menu.classList.remove('show-menu'));

    // Close on link click
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('show-menu'));
    });
  }

  /* =========================================
     FEATURE CARD WRAPPING
     Wraps each subtitle+paragraph pair in a
     .feature-block div for visual styling.
     ========================================= */
  function wrapFeatureBlocks() {
    const container = document.querySelector('.project__data');
    if (!container) return;

    const subtitles = container.querySelectorAll('.project__info-subtitle');
    subtitles.forEach((subtitle, i) => {
      const para = subtitle.nextElementSibling;
      if (!para || !para.classList.contains('project__info')) return;

      const block = document.createElement('div');
      block.className = 'feature-block';
      block.dataset.delay = i * 100;

      subtitle.parentNode.insertBefore(block, subtitle);
      block.appendChild(subtitle);
      block.appendChild(para);
    });
  }

  /* =========================================
     SCROLL REVEAL — IntersectionObserver
     ========================================= */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.feature-block, figure, .button, .section__title, ' +
      '.contact__info, .contact__form, .project__info-title'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseInt(el.dataset.delay || 0, 10);
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
  }

  /* =========================================
     TYPING TITLE EFFECT
     ========================================= */
  function initTypingTitle() {
    const title = document.querySelector('.project__info-title');
    if (!title) return;

    const text = title.textContent.trim();
    title.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    title.appendChild(cursor);

    // Wait briefly then type
    let i = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        title.insertBefore(document.createTextNode(text[i++]), cursor);
        if (i >= text.length) {
          clearInterval(interval);
          // Remove cursor after pause
          setTimeout(() => cursor.remove(), 2000);
        }
      }, 38);
    }, 400);
  }

  /* =========================================
     SMOOTH SCROLL — anchor links
     ========================================= */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* =========================================
     BUTTON RIPPLE
     ========================================= */
  function initRipple() {
    document.querySelectorAll('.button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect   = this.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
          position:absolute;
          width:${size}px;height:${size}px;
          left:${e.clientX - rect.left - size/2}px;
          top:${e.clientY - rect.top - size/2}px;
          background:rgba(255,255,255,0.15);
          border-radius:50%;
          transform:scale(0);
          animation:ripple-anim 0.55s ease-out forwards;
          pointer-events:none;
        `;
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });

    // Inject keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple-anim {
        to { transform: scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }


  /* =========================================
     PROJECT HEADER PARALLAX
     ========================================= */
  function initParallax() {
    const hero = document.querySelector('.project__header');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const y = scrollY * 0.3;
      hero.style.backgroundPositionY = `${y}px`;
    }, { passive: true });
  }

  /* =========================================
     INIT ALL
     ========================================= */
  function init() {
    initOrbs();
    initCursor();
    initScrollProgress();
    initHeader();
    initMobileNav();
    wrapFeatureBlocks();   // Must run before ScrollReveal
    initScrollReveal();
    initTypingTitle();
    initSmoothScroll();
    initRipple();
    initContactForm();
    initParallax();

    // Trigger initial visible check
    window.dispatchEvent(new Event('scroll'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
