

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initActiveNav();
    initContactForm();
    initResumeModal();
    initCertificateModal();
    initCertificationSlider();
    initPortfolioSlider();
});

// Certificate Modal
function initCertificateModal() {
    const certificateItems = document.querySelectorAll('.certification-item[data-certificate]');
    const certificateModal = document.getElementById('certificateModal');
    const closeCertificateModal = document.getElementById('closeCertificateModal');
    const certificateImage = document.getElementById('certificateImage');

    if (certificateItems.length && certificateModal && certificateImage) {
        // Open modal on certificate click
        certificateItems.forEach(item => {
            item.addEventListener('click', function () {
                const certPath = this.getAttribute('data-certificate');
                certificateImage.src = certPath;
                certificateModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal with X button
        if (closeCertificateModal) {
            closeCertificateModal.addEventListener('click', function () {
                certificateModal.classList.remove('active');
                document.body.style.overflow = '';
                certificateImage.src = '';
            });
        }

        // Close modal when clicking outside
        certificateModal.addEventListener('click', function (e) {
            if (e.target === certificateModal) {
                certificateModal.classList.remove('active');
                document.body.style.overflow = '';
                certificateImage.src = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
                certificateModal.classList.remove('active');
                document.body.style.overflow = '';
                certificateImage.src = '';
            }
        });
    }
}

// Certification Slider Navigation
function initCertificationSlider() {
    const wrapper = document.querySelector('.certifications-wrapper');
    const grid = document.querySelector('.certifications-grid');
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    const items = document.querySelectorAll('.certification-item');

    if (!wrapper || !grid || !prevBtn || !nextBtn || items.length === 0) return;

    let currentIndex = 0;
    const cardWidth = 280; // min-width of certification-item
    const gap = 24; // 1.5rem gap
    const totalCards = items.length;

    function getVisibleCards() {
        const wrapperWidth = wrapper.offsetWidth;
        return Math.floor(wrapperWidth / (cardWidth + gap)) || 1;
    }

    function getMaxIndex() {
        const visibleCards = getVisibleCards();
        return Math.max(0, totalCards - visibleCards);
    }

    function updateSlider() {
        const translateX = currentIndex * (cardWidth + gap);
        grid.style.transform = `translateX(-${translateX}px)`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
            updateSlider();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        // Ensure currentIndex is within bounds after resize
        if (currentIndex > getMaxIndex()) {
            currentIndex = getMaxIndex();
        }
        updateSlider();
    });

    // Initial update
    updateSlider();
}

// Portfolio Slider Navigation
function initPortfolioSlider() {
    const wrapper = document.querySelector('.portfolio-wrapper');
    const slider = document.getElementById('portfolioSlider');
    const prevBtn = document.getElementById('portfolioPrevBtn');
    const nextBtn = document.getElementById('portfolioNextBtn');
    // We select all cards inside the slider. Note: initCertificationSlider used items that were direct children of a grid being transformed.
    // Here we have .portfolio-slider which is a flex container.
    const items = document.querySelectorAll('.portfolio-card'); // This might pick up featured items if not scoped.

    // Better scoping
    const sliderItems = slider ? slider.querySelectorAll('.portfolio-card') : [];

    if (!wrapper || !slider || !prevBtn || !nextBtn || sliderItems.length === 0) return;

    let currentIndex = 0;
    // We need to calculate card width dynamically or assume based on CSS (min-width 300px + gap)
    // Styles say: min-width: 300px, flex-shrink: 0. Gap: 1.5rem (24px).
    // Let's measure the first item's rendered width to be safe.

    function getCardWidth() {
        return sliderItems[0].offsetWidth;
    }

    const gap = 24; // 1.5rem
    const totalCards = sliderItems.length;

    function getVisibleCards() {
        const wrapperWidth = wrapper.offsetWidth;
        const width = getCardWidth();
        return Math.floor(wrapperWidth / (width + gap)) || 1;
    }

    function getMaxIndex() {
        const visibleCards = getVisibleCards();
        return Math.max(0, totalCards - visibleCards);
    }

    function updateSlider() {
        // Recalculate card width in case of resize
        const cardWidth = getCardWidth();
        const translateX = currentIndex * (cardWidth + gap);
        slider.style.transform = `translateX(-${translateX}px)`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
            updateSlider();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        // Ensure currentIndex is within bounds after resize
        const max = getMaxIndex();
        if (currentIndex > max) {
            currentIndex = max;
        }
        updateSlider();
    });

    // Initial update
    // Small delay to ensure layout is computed
    setTimeout(updateSlider, 100);
}

// Resume Modal
function initResumeModal() {
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');

    if (viewResumeBtn && resumeModal) {
        // Open modal
        viewResumeBtn.addEventListener('click', function () {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal with X button
        if (closeResumeModal) {
            closeResumeModal.addEventListener('click', function () {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close modal when clicking outside
        resumeModal.addEventListener('click', function (e) {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when link clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations (Simple AOS alternative)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Active Navigation Link
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

// Dynamic Project Loading (for API integration)
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.log('Using static projects');
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('portfolioGrid');
    if (!grid || !projects.length) return;

    grid.innerHTML = projects.map(project => `
        <div class="portfolio-card" data-aos="fade-up">
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="portfolio-overlay">
                    <a href="${project.link || '#'}" class="portfolio-link">View Project</a>
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.category || project.description}</p>
            </div>
        </div>
    `).join('');

    // Re-init animations
    initScrollAnimations();
}
