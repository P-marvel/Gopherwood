// Mobile nav toggle
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if(target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    if(window.innerWidth <= 700) navLinks.classList.remove('active');
                }
            });
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


