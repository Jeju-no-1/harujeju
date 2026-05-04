// ============================================
// 하루제주 - Main Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Header scroll behavior (transparent → solid) ----
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
      } else if (header.dataset.startTransparent !== 'false') {
        header.classList.remove('scrolled');
        header.classList.add('transparent');
      }
    };

    // If header doesn't have transparent class initially, mark it as not-transparent
    if (!header.classList.contains('transparent')) {
      header.dataset.startTransparent = 'false';
      header.classList.add('scrolled');
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // ---- Reveal on scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ---- Product tabs ----
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      productCards.forEach((c) => {
        const show = cat === 'all' || c.dataset.category === cat;
        c.style.display = show ? '' : 'none';
      });
    });
  });

  // ---- Product card → Smartstore ----
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      const url = card.dataset.smartstoreUrl;
      if (url) window.open(url, '_blank', 'noopener');
    });
  });

  // ---- Smooth scroll for top button ----
  const topBtn = document.querySelector('.fab.top');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Mobile menu toggle ----
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
  }

  // ---- FAQ accordion (if on order page) ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Hero scroll indicator click ----
  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    heroScroll.style.cursor = 'pointer';
    heroScroll.addEventListener('click', () => {
      const next = document.querySelector('.section-story, .section-products, section:nth-of-type(2)');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
