const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");
  const currentPage = window.location.pathname.split("/").pop();

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", false);
      dropdownContent.classList.remove("show");
    }
  });

  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle("show");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active-page");
    }
  });

        // Contact form submission (demo only)
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for contacting Gopher Wood School! We will get back to you soon.');
            this.reset();
        });

        // Section reveal on scroll (fade/slide in)
        function revealSections() {
            document.querySelectorAll('.section').forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight - 80) {
                    section.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', revealSections);
        window.addEventListener('DOMContentLoaded', revealSections);

        // Animated counters for stats
        function animateCounter(el, to) {
            let start = 0;
            const duration = 1200;
            const step = Math.ceil(to / (duration / 16));
            function update() {
                start += step;
                if (start >= to) {
                    el.textContent = to;
                } else {
                    el.textContent = start;
                    requestAnimationFrame(update);
                }
            }
            update();
        }
        window.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.counter').forEach(counter => {
                animateCounter(counter, parseInt(counter.dataset.to, 10));
            });
        });

        // Admissions popup modal logic
        function showAdmissionsModal() {
            const modal = document.getElementById('admissions-modal');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        function closeAdmissionsModal() {
            const modal = document.getElementById('admissions-modal');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        window.addEventListener('DOMContentLoaded', () => {
            showAdmissionsModal();
            document.getElementById('modal-close-btn').onclick = closeAdmissionsModal;
            document.getElementById('admissions-modal').addEventListener('click', function(e) {
                if (e.target === this) closeAdmissionsModal();
            });
            // Fix: Add handler for CONTACT US button in modal
            var contactBtn = document.getElementById('modal-contact-btn');
            if (contactBtn) {
                contactBtn.onclick = function() {
                    closeAdmissionsModal();
                    window.location.href = 'contact.html';
                };
            }
        });


        document.querySelectorAll('#social-media-bar .social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.13) rotate(-6deg)';
        this.style.boxShadow = '0 4px 18px rgba(20,83,45,0.18)';
    });
    icon.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    icon.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.97)';
    });
    icon.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.13) rotate(-6deg)';
    });
});


const heroBackgrounds = [
    {
        img: "images/headerimg1.JPG",
        text: "An environment where every child thrives."
    },
    {
        img: "images/headerimg2.jpeg",
        text: "World-class facilities for world-class learning."
    },
    {
        img: "images/headerimg3.JPG",
        text: "Building character, creativity, and confidence."
    }
];

let heroIdx = 0;
const heroSection = document.querySelector('.hero');
const popupText = document.getElementById('hero-popup-text');

function updateHero() {
    // Change background
    heroSection.style.background = `url('${heroBackgrounds[heroIdx].img}') center/cover no-repeat`;
    // Animate popup text
    popupText.style.opacity = 0;
    setTimeout(() => {
        popupText.textContent = heroBackgrounds[heroIdx].text;
        popupText.style.opacity = 1;
    }, 400);
    // Next index
    heroIdx = (heroIdx + 1) % heroBackgrounds.length;
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateHero();
    setInterval(updateHero, 6000); // Change every 6 seconds
});





// Animated countdown to August 15 (this year or next if already passed)
        function getNextAnniversary() {
          const now = new Date();
          let year = now.getFullYear();
          const target = new Date(year, 7, 15, 0, 0, 0); // August is month 7 (0-based)
          if (now > target) year++;
          return new Date(year, 11, 1, 0, 0, 0);
        }
        function updateCountdown() {
          const target = getNextAnniversary();
          const now = new Date();
          let diff = target - now;
          if (diff < 0) diff = 0;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          document.getElementById('days').textContent = String(days).padStart(2, '0');
          document.getElementById('hours').textContent = String(hours).padStart(2, '0');
          document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
          document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
        document.addEventListener('DOMContentLoaded', function() {
          updateCountdown();
          setInterval(updateCountdown, 1000);
        });







        document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('award-modal');
  const modalImg = document.getElementById('award-modal-img');
  document.querySelectorAll('.award-img-enlarge').forEach(img => {
    img.addEventListener('click', function() {
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      modal.classList.add('show');
      modal.style.display = 'flex';
    });
    img.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modal.classList.add('show');
        modal.style.display = 'flex';
      }
    });
  });
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target === modalImg) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
  // Optional: ESC key closes modal
  document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('show') && e.key === 'Escape') {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
});








document.addEventListener('DOMContentLoaded', function() {
  // Awards Slideshow
  const slides = document.querySelectorAll('.award-slide');
  const dots = document.querySelectorAll('.awards-dots .dot');
  let current = 0;
  let timer = null;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.style.display = i === idx ? 'flex' : 'none';
    });
    dots.forEach((dot, i) => {
      dot.style.opacity = i === idx ? '1' : '0.5';
      dot.style.background = i === idx ? 'var(--highlight)' : 'var(--secondary)';
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  document.querySelector('.awards-next').onclick = function() {
    nextSlide();
    resetTimer();
  };
  document.querySelector('.awards-prev').onclick = function() {
    prevSlide();
    resetTimer();
  };
  dots.forEach((dot, i) => {
    dot.onclick = function() {
      showSlide(i);
      resetTimer();
    };
  });

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  }

  showSlide(0);
  timer = setInterval(nextSlide, 6000);

  // Award image enlarge modal (keep this if you want image enlarge on click)
  const modal = document.getElementById('award-modal');
  const modalImg = document.getElementById('award-modal-img');
  document.querySelectorAll('.award-img-enlarge').forEach(img => {
    img.addEventListener('click', function() {
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      modal.classList.add('show');
      modal.style.display = 'flex';
    });
    img.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modal.classList.add('show');
        modal.style.display = 'flex';
      }
    });
  });
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target === modalImg) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
  document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('show') && e.key === 'Escape') {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const galleryImgs = Array.from(document.querySelectorAll('.gallery-img'));
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const closeBtn = document.getElementById('gallery-close');
  let currentIdx = 0;

  function showModal(idx) {
    currentIdx = idx;
    modalImg.src = galleryImgs[idx].src;
    modalImg.alt = galleryImgs[idx].alt;
    modal.classList.add('show');
    modal.style.display = 'flex';
  }

  function showPrev() {
    currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length;
    showModal(currentIdx);
  }

  function showNext() {
    currentIdx = (currentIdx + 1) % galleryImgs.length;
    showModal(currentIdx);
  }

  galleryImgs.forEach((img, idx) => {
    img.addEventListener('click', () => showModal(idx));
    img.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') showModal(idx);
    });
  });

  prevBtn.onclick = function(e) { e.stopPropagation(); showPrev(); };
  nextBtn.onclick = function(e) { e.stopPropagation(); showNext(); };
  closeBtn.onclick = function() { modal.classList.remove('show'); modal.style.display = 'none'; modalImg.src = ''; };

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('show')) return;
    if (e.key === 'Escape') closeBtn.click();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
});
    

