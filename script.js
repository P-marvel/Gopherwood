
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Mobile nav toggle
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // ── NEW: Dropdown menu handling ──────────────────────────────────────────
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdown && dropdownContent) {
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
      });
    }

    // ── NEW: Close nav + dropdown when clicking outside ──────────────────────
    document.addEventListener('click', (e) => {
      if (navLinks && toggle &&
          !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        if (dropdownContent) dropdownContent.classList.remove('show');
      }
    });

    // ── NEW: Active page link highlighting ───────────────────────────────────
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach((link) => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active-page');
      }
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // ── Social media bar: mouse + NEW touch support for mobile ───────────────
    document.querySelectorAll('#social-media-bar .social-icon').forEach(icon => {
      // Mouse events
      icon.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.13) rotate(-6deg)';
        this.style.boxShadow = '0 4px 18px rgba(20,83,45,0.18)';
      });
      icon.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
      icon.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.97)';
      });
      icon.addEventListener('mouseup', function () {
        this.style.transform = 'scale(1.13) rotate(-6deg)';
      });

      // Touch events (mobile)
      icon.addEventListener('touchstart', function (e) {
        this.style.transform = 'scale(1.13) rotate(-6deg)';
        this.style.boxShadow = '0 4px 18px rgba(20,83,45,0.18)';
      }, { passive: true });
      icon.addEventListener('touchend', function () {
        // Small delay so the effect is visible before snapping back
        setTimeout(() => {
          this.style.transform = '';
          this.style.boxShadow = '';
        }, 250);
      });
    });

    // Counter animation
    const counters = document.querySelectorAll('[data-target]');
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const suffix = target > 10 ? '+' : '';
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 30);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));

    // Awards carousel
    let awardIdx = 0;
    const awardSlides = document.querySelectorAll('.award-slide');
    const dots = document.querySelectorAll('.awards-dots span');

    function showAward(i) {
      awardSlides.forEach((s, j) => s.classList.toggle('active', j === i));
      dots.forEach((d, j) => d.classList.toggle('active', j === i));
      awardIdx = i;
    }

    document.getElementById('awards-prev').onclick = () => showAward((awardIdx - 1 + awardSlides.length) % awardSlides.length);
    document.getElementById('awards-next').onclick = () => showAward((awardIdx + 1) % awardSlides.length);
    dots.forEach(d => d.addEventListener('click', () => showAward(+d.dataset.i)));
    setInterval(() => showAward((awardIdx + 1) % awardSlides.length), 5000);

    // ── NEW: Hero background slideshow ───────────────────────────────────────
    const heroBackgrounds = [
      { img: 'images/headerimg1.JPG',  text: 'An environment where every child thrives.' },
      { img: 'images/headerimg2.jpeg', text: 'World-class facilities for world-class learning.' },
      { img: 'images/headerimg3.JPG',  text: 'Building character, creativity, and confidence.' }
    ];
    let heroIdx = 0;
    const heroSection = document.querySelector('.hero');
    const popupText = document.getElementById('hero-popup-text');

    function updateHero() {
      if (heroSection) {
        heroSection.style.background =
          `url('${heroBackgrounds[heroIdx].img}') center/cover no-repeat`;
      }
      if (popupText) {
        popupText.style.opacity = 0;
        setTimeout(() => {
          popupText.textContent = heroBackgrounds[heroIdx].text;
          popupText.style.opacity = 1;
        }, 400);
      }
      heroIdx = (heroIdx + 1) % heroBackgrounds.length;
    }

    // ── NEW: Countdown timer ─────────────────────────────────────────────────
    function getNextTarget() {
      const now = new Date();
      let year = now.getFullYear();
      const target = new Date(year, 10, 1, 0, 0, 0); // November 1
      if (now > target) target.setFullYear(year + 1);
      return target;
    }

   /* function updateCountdown() {
      const target = getNextTarget();
      let diff = Math.max(target - new Date(), 0);
      document.getElementById('days').textContent    = String(Math.floor(diff / 86400000)).padStart(2, '0');
      document.getElementById('hours').textContent   = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
      document.getElementById('minutes').textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
      document.getElementById('seconds').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    }*/

    // ── NEW: Gallery modal with prev/next + keyboard ─────────────────────────
    function initGalleryModal() {
      const galleryImgs = Array.from(document.querySelectorAll('.gallery-img'));
      const modal       = document.getElementById('gallery-modal');
      const modalImg    = document.getElementById('gallery-modal-img');
      const prevBtn     = document.getElementById('gallery-prev');
      const nextBtn     = document.getElementById('gallery-next');
      const closeBtn    = document.getElementById('gallery-close');
      if (!modal) return;
      let currentIdx = 0;

      function showModal(idx) {
        currentIdx = idx;
        modalImg.src = galleryImgs[idx].src;
        modalImg.alt = galleryImgs[idx].alt;
        modal.classList.add('show');
        modal.style.display = 'flex';
      }

      galleryImgs.forEach((img, idx) => {
        img.addEventListener('click', () => showModal(idx));
        img.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') showModal(idx);
        });
      });

      prevBtn.onclick  = e => { e.stopPropagation(); currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length; showModal(currentIdx); };
      nextBtn.onclick  = e => { e.stopPropagation(); currentIdx = (currentIdx + 1) % galleryImgs.length; showModal(currentIdx); };
      closeBtn.onclick = () => { modal.classList.remove('show'); modal.style.display = 'none'; modalImg.src = ''; };

      modal.addEventListener('click', e => {
        if (e.target === modal) closeBtn.click();
      });

      document.addEventListener('keydown', e => {
        if (!modal.classList.contains('show')) return;
        if (e.key === 'Escape')      closeBtn.click();
        if (e.key === 'ArrowLeft')   prevBtn.click();
        if (e.key === 'ArrowRight')  nextBtn.click();
      });
    }

    // ── NEW: Award image enlarge modal ───────────────────────────────────────
    function initAwardModal() {
      const modal    = document.getElementById('award-modal');
      const modalImg = document.getElementById('award-modal-img');
      if (!modal) return;

      document.querySelectorAll('.award-img-enlarge').forEach(img => {
        img.addEventListener('click', function () {
          modalImg.src = this.src;
          modalImg.alt = this.alt;
          modal.classList.add('show');
          modal.style.display = 'flex';
        });
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modal.classList.add('show');
            modal.style.display = 'flex';
          }
        });
      });

      modal.addEventListener('click', e => {
        if (e.target === modal || e.target === modalImg) {
          modal.classList.remove('show');
          modal.style.display = 'none';
          modalImg.src = '';
        }
      });

      document.addEventListener('keydown', e => {
        if (modal.classList.contains('show') && e.key === 'Escape') {
          modal.classList.remove('show');
          modal.style.display = 'none';
          modalImg.src = '';
        }
      });
    }

   // ── DOMContentLoaded: kick off everything that needs the DOM ready ────────
document.addEventListener('DOMContentLoaded', () => {
  
  // ── Admissions Modal Logic with Memory ──
  const modal = document.getElementById('admissions-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const contactModalBtn = document.getElementById('modal-contact-btn');

  if (modal) {
    // 1. Check if the user has already dismissed this modal before
    const isModalDismissed = localStorage.getItem('gopherwood_modal_dismissed');

    // 2. Only trigger the popup timeout if they HAVEN'T dismissed it
    if (!isModalDismissed) {
      setTimeout(() => { 
        modal.style.display = 'flex'; 
      }, 2500);
    }

    // 3. When closing via 'X' button, save preference
    if (closeModalBtn) {
      closeModalBtn.onclick = () => {
        modal.style.display = 'none';
        localStorage.setItem('gopherwood_modal_dismissed', 'true');
      };
    }

    // 4. When navigating via 'Contact' button, save preference too
    if (contactModalBtn) {
      contactModalBtn.onclick = () => {
        modal.style.display = 'none';
        localStorage.setItem('gopherwood_modal_dismissed', 'true');
        window.location.href = 'contact.html';
      };
    }

    // 5. When clicking outside the modal box to close, save preference
    modal.addEventListener('click', e => { 
      if (e.target === modal) {
        modal.style.display = 'none'; 
        localStorage.setItem('gopherwood_modal_dismissed', 'true');
      }
    });
  }

  // ── Your existing initializers ──
  updateHero();
  setInterval(updateHero, 6000);

// updateCountdown();
  //setInterval(updateCountdown, 1000);

  initGalleryModal();
  initAwardModal();
});