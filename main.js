/* ============================================
   ELANGO PORTFOLIO — PREMIUM 3D INTERACTIVE JS
   Three.js · GSAP · 3D Animations · Custom Cursor
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Core Init
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initActiveNav();
    initScrollProgress();

    // Modals & Sliders
    initResumeModal();
    initCertificateModal();
    initCertificationSlider();
    initPortfolioSlider();
    initCaseStudyPanel();

    // Contact Terminal
    initContactTerminal();

    // Premium Features
    initCustomCursor();
    initMagneticButtons();
    init3DCardTilt();
    initFloatingParticles();

    // GSAP & Three.js (deferred to ensure libs loaded)
    requestAnimationFrame(() => {
        initScrollAnimations();
        initGSAPAnimations();
        initThreeBackground();
        initSkillsUniverse();
        initParallaxScroll();
    });
});

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + '%';
    }, { passive: true });
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const glow = document.getElementById('customCursorGlow');
    if (!cursor || !glow) return;

    // Check for touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        glow.style.display = 'none';
        return;
    }

    let mx = 0, my = 0;
    let cx = 0, cy = 0;
    let gx = 0, gy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animate() {
        // Dot follows tightly
        cx += (mx - cx) * 0.25;
        cy += (my - cy) * 0.25;
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';

        // Glow follows loosely
        gx += (mx - gx) * 0.12;
        gy += (my - gy) * 0.12;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    // Hover states
    const interactives = document.querySelectorAll('a, button, [data-magnetic], .portfolio-card, .certification-item, .service-card, .cta-tag');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            glow.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            glow.classList.remove('hovered');
        });
    });
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
function initMagneticButtons() {
    if ('ontouchstart' in window) return;

    const magnets = document.querySelectorAll('[data-magnetic]');
    magnets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* ============================================
   3D CARD TILT EFFECT
   ============================================ */
function init3DCardTilt() {
    if ('ontouchstart' in window) return;

    const cards = document.querySelectorAll('.service-card, .testimonial-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const rotateX = y * -15;
            const rotateY = x * 15;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => { card.style.transition = ''; }, 600);
        });
    });
}

/* ============================================
   FLOATING PARTICLES OVERLAY
   ============================================ */
function initFloatingParticles() {
    const body = document.body;
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const isBlue = Math.random() > 0.5;

        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${isBlue ? 'rgba(37, 99, 235, 0.4)' : 'rgba(239, 68, 68, 0.3)'};
            border-radius: 50%;
            left: ${left}%;
            bottom: -20px;
            pointer-events: none;
            z-index: -1;
            animation: particleDrift ${duration}s linear ${delay}s infinite;
            box-shadow: 0 0 ${size * 3}px ${isBlue ? 'rgba(37, 99, 235, 0.3)' : 'rgba(239, 68, 68, 0.2)'};
        `;
        body.appendChild(particle);
    }
}

/* ============================================
   PARALLAX SCROLL EFFECTS
   ============================================ */
function initParallaxScroll() {
    const heroGlow1 = document.querySelector('.hero-glow-1');
    const heroGlow2 = document.querySelector('.hero-glow-2');

    if (!heroGlow1 && !heroGlow2) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (heroGlow1) {
            heroGlow1.style.transform = `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px)`;
        }
        if (heroGlow2) {
            heroGlow2.style.transform = `translate(-${scrollY * 0.03}px, ${scrollY * 0.08}px)`;
        }
    }, { passive: true });
}

/* ============================================
   THREE.JS PARTICLE BACKGROUND — ENHANCED 3D
   ============================================ */
function initThreeBackground() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create main particle field
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const blueColor = new THREE.Color(0x2563EB);
    const redColor = new THREE.Color(0xEF4444);
    const whiteColor = new THREE.Color(0x94A3B8);
    const cyanColor = new THREE.Color(0x06B6D4);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

        const t = Math.random();
        const color = t < 0.35 ? blueColor : t < 0.5 ? redColor : t < 0.65 ? cyanColor : whiteColor;
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 0.06 + 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create a second layer — wireframe geometric shapes
    const torusGeo = new THREE.TorusGeometry(3, 0.02, 8, 50);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x2563EB, transparent: true, opacity: 0.08, wireframe: true });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(4, -2, -8);
    scene.add(torus);

    const torus2Geo = new THREE.TorusGeometry(2, 0.02, 8, 40);
    const torus2Mat = new THREE.MeshBasicMaterial({ color: 0xEF4444, transparent: true, opacity: 0.06, wireframe: true });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.position.set(-5, 3, -10);
    scene.add(torus2);

    // Octahedron shape
    const octGeo = new THREE.OctahedronGeometry(1.5, 0);
    const octMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.05, wireframe: true });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    octahedron.position.set(-3, -4, -6);
    scene.add(octahedron);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1, 0);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x2563EB, transparent: true, opacity: 0.06, wireframe: true });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(6, 4, -12);
    scene.add(ico);

    camera.position.z = 6;

    let mouseX = 0, mouseY = 0;
    let scrollProgress = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        scrollProgress = h.scrollTop / (h.scrollHeight - h.clientHeight);
    }, { passive: true });

    const clock = new THREE.Clock();

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        const elapsed = clock.getElapsedTime();

        // Main particles rotation
        particles.rotation.y = elapsed * 0.03;
        particles.rotation.x = elapsed * 0.01;

        // Geometric shapes rotation — cinematic feel
        torus.rotation.x = elapsed * 0.15;
        torus.rotation.y = elapsed * 0.1;
        torus.rotation.z = elapsed * 0.05;

        torus2.rotation.x = elapsed * 0.1;
        torus2.rotation.y = -elapsed * 0.12;

        octahedron.rotation.x = elapsed * 0.2;
        octahedron.rotation.y = elapsed * 0.15;

        ico.rotation.x = -elapsed * 0.12;
        ico.rotation.y = elapsed * 0.18;
        ico.rotation.z = elapsed * 0.05;

        // Scroll-driven camera movement
        camera.position.z = 6 - scrollProgress * 3;
        camera.position.y = scrollProgress * 2;

        // Mouse parallax
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - camera.position.y + scrollProgress * 2) * 0.02;
        camera.lookAt(scene.position);

        // Animate particle positions subtly
        const posArray = particles.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            posArray[ix + 1] += Math.sin(elapsed + posArray[ix]) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }
    animateParticles();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ============================================
   SKILLS UNIVERSE (Canvas 2D)
   ============================================ */
function initSkillsUniverse() {
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const wrapper = canvas.parentElement;

    function resizeCanvas() {
        canvas.width = wrapper.clientWidth;
        canvas.height = wrapper.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const skills = [
        { name: 'Figma', color: '#A259FF' },
        { name: 'React', color: '#61DAFB' },
        { name: 'Python', color: '#3776AB' },
        { name: 'HTML', color: '#E34F26' },
        { name: 'CSS', color: '#2563EB' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'UI/UX', color: '#EF4444' },
        { name: 'React Native', color: '#FFCA28' },
        { name: 'Git', color: '#F05032' },
        { name: 'Node.js', color: '#339933' },
        { name: 'SQL', color:'#02569B' },
        { name: 'MongoDB', color: '#6942a5' },
        { name: 'Express JS', color: '#d465d0' },
        { name: 'DSA', color: '#5ed3c7' },
        { name: 'APIs', color: '#db9929' },
    ];

    class Node {
        constructor(skill, x, y) {
            this.skill = skill;
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = 28 + Math.random() * 10;
            this.baseRadius = this.radius;
            this.targetRadius = this.radius;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        update(w, h, mouseX, mouseY, time) {
            // Pulse effect
            this.pulsePhase += 0.02;
            const pulseScale = 1 + Math.sin(this.pulsePhase) * 0.05;

            // Mouse repulsion
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
                const force = (120 - dist) / 120;
                this.vx += (dx / dist) * force * 0.3;
                this.vy += (dy / dist) * force * 0.3;
                this.targetRadius = this.baseRadius * 1.4;
            } else {
                this.targetRadius = this.baseRadius * pulseScale;
            }

            this.radius += (this.targetRadius - this.radius) * 0.08;

            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x - this.radius < 0) { this.x = this.radius; this.vx *= -0.8; }
            if (this.x + this.radius > w) { this.x = w - this.radius; this.vx *= -0.8; }
            if (this.y - this.radius < 0) { this.y = this.radius; this.vy *= -0.8; }
            if (this.y + this.radius > h) { this.y = h - this.radius; this.vy *= -0.8; }

            // Friction
            this.vx *= 0.995;
            this.vy *= 0.995;
        }

        draw(ctx, time) {
            // Outer glow ring
            ctx.beginPath();
            const outerGradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.3, this.x, this.y, this.radius * 2);
            outerGradient.addColorStop(0, this.skill.color + '33');
            outerGradient.addColorStop(0.5, this.skill.color + '11');
            outerGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = outerGradient;
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Inner circle with gradient
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            const innerGradient = ctx.createRadialGradient(this.x - this.radius * 0.3, this.y - this.radius * 0.3, 0, this.x, this.y, this.radius);
            innerGradient.addColorStop(0, this.skill.color + '33');
            innerGradient.addColorStop(1, this.skill.color + '0D');
            ctx.fillStyle = innerGradient;
            ctx.fill();

            // Rotating border arc
            const arcStart = (time * 0.5) % (Math.PI * 2);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, arcStart, arcStart + Math.PI * 1.2);
            ctx.strokeStyle = this.skill.color + '77';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Second arc
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, arcStart + Math.PI, arcStart + Math.PI + Math.PI * 0.8);
            ctx.strokeStyle = this.skill.color + '44';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Text
            ctx.fillStyle = '#F8FAFC';
            ctx.font = `600 ${Math.max(10, this.radius * 0.35)}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.skill.name, this.x, this.y);
        }
    }

    const nodes = [];
    const w = canvas.width, h = canvas.height;
    skills.forEach(skill => {
        const x = Math.random() * (w - 80) + 40;
        const y = Math.random() * (h - 80) + 40;
        nodes.push(new Node(skill, x, y));
    });

    let mX = -200, mY = -200;
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mX = e.clientX - rect.left;
        mY = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
        mX = -200;
        mY = -200;
    });

    function drawConnections(time) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const opacity = (1 - dist / 200) * 0.2;
                    const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    gradient.addColorStop(0, nodes[i].skill.color + Math.round(opacity * 255).toString(16).padStart(2, '0'));
                    gradient.addColorStop(1, nodes[j].skill.color + Math.round(opacity * 255).toString(16).padStart(2, '0'));
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    let startTime = performance.now();
    function animateUniverse() {
        const time = (performance.now() - startTime) / 1000;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections(time);
        nodes.forEach(node => {
            node.update(canvas.width, canvas.height, mX, mY, time);
            node.draw(ctx, time);
        });
        requestAnimationFrame(animateUniverse);
    }
    animateUniverse();
}

/* ============================================
   GSAP SCROLL ANIMATIONS — FIXED VISIBILITY
   ============================================ */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // ---- HERO ENTRANCE (3D cinematic) ----
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');

    // Ensure hero elements are visible — set final state first, then animate
    if (heroTitle) {
        // Set elements visible first to prevent flash-of-invisible
        gsap.set([heroTitle, heroDesc, heroButtons, heroImage], { opacity: 1 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 3D text reveal
        tl.fromTo(heroTitle,
            { opacity: 0, y: 80, rotateX: -15, scale: 0.9, filter: 'blur(10px)' },
            { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)', duration: 1.2 }
        )
        .fromTo(heroDesc,
            { opacity: 0, y: 50, filter: 'blur(5px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
            '-=0.6'
        )
        .fromTo(heroButtons,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 },
            '-=0.4'
        )
        .fromTo(heroImage,
            { opacity: 0, scale: 0.8, rotateY: -10, x: 60 },
            { opacity: 1, scale: 1, rotateY: 0, x: 0, duration: 1.2 },
            '-=0.9'
        );
    }

    // Floating cards 3D stagger entrance
    gsap.fromTo('.floating-card', {
        opacity: 0,
        scale: 0.3,
        rotate: -15
    }, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.9,
        stagger: 0.15,
        delay: 1.5,
        ease: 'back.out(1.7)'
    });

    // ---- SECTION HEADERS — 3D reveal ----
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, {
            opacity: 0,
            y: 60,
            rotateX: -10
        }, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // ---- SERVICE CARDS — 3D perspective entrance ----
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 80,
            rotateX: -20,
            rotateY: 10,
            scale: 0.8
        }, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out'
        });
    });

    // ---- SKILL BARS — Animated fill ----
    gsap.utils.toArray('.skill-detail-fill').forEach(bar => {
        const fill = bar.getAttribute('data-fill');
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
            },
            width: fill + '%',
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // ---- SKILL DETAIL CARDS — Stagger ----
    gsap.utils.toArray('.skill-detail-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            x: -40,
            scale: 0.9
        }, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out'
        });
    });

    // ---- TIMELINE LINE FILL ----
    gsap.utils.toArray('.timeline-line-fill').forEach(line => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: line.parentElement.parentElement,
                start: 'top 70%',
                end: 'bottom 40%',
                scrub: 1,
            },
            height: '100%',
            ease: 'none'
        });
    });

    // ---- TIMELINE NODES — 3D slide ----
    gsap.utils.toArray('.timeline-node').forEach((node, i) => {
        gsap.fromTo(node, {
            opacity: 0,
            x: -60,
            rotateY: 15,
            scale: 0.85
        }, {
            scrollTrigger: {
                trigger: node,
                start: 'top 85%',
            },
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out'
        });
    });

    // ---- PORTFOLIO CARDS ----
    gsap.utils.toArray('.portfolio-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 60,
            rotateX: -15,
            scale: 0.9
        }, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // ---- PORTFOLIO FEATURED ----
    const featured = document.querySelector('.portfolio-featured');
    if (featured) {
        gsap.fromTo(featured, {
            opacity: 0,
            y: 60,
            scale: 0.95
        }, {
            scrollTrigger: {
                trigger: featured,
                start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // ---- CTA SECTION — Dramatic entrance ----
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        gsap.fromTo(ctaContent, {
            opacity: 0,
            scale: 0.85,
            y: 40
        }, {
            scrollTrigger: {
                trigger: ctaContent,
                start: 'top 80%',
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // ---- CTA TAGS — Stagger bounce ----
    gsap.utils.toArray('.cta-tag').forEach((tag, i) => {
        gsap.fromTo(tag, {
            opacity: 0,
            y: 20,
            scale: 0.8
        }, {
            scrollTrigger: {
                trigger: tag.parentElement,
                start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'back.out(2)'
        });
    });

    // ---- TESTIMONIALS — 3D cards ----
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50,
            rotateX: -10,
            scale: 0.9
        }, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // ---- CERTIFICATIONS — Scale rotate ----
    gsap.utils.toArray('.certification-item').forEach((item, i) => {
        gsap.fromTo(item, {
            opacity: 0,
            scale: 0.7,
            rotate: -5
        }, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
            },
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'back.out(1.5)'
        });
    });

    // ---- CONTACT INFO — Slide in from left ----
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        gsap.fromTo(contactInfo, {
            opacity: 0,
            x: -80,
            rotateY: 10
        }, {
            scrollTrigger: {
                trigger: contactInfo,
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // ---- TERMINAL — Slide in from right ----
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        gsap.fromTo(terminal, {
            opacity: 0,
            x: 80,
            rotateY: -10
        }, {
            scrollTrigger: {
                trigger: terminal,
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // ---- WHY HIRE ME — 3D entrances ----
    const whyHireImage = document.querySelector('.why-hire-image');
    const whyHireText = document.querySelector('.why-hire-text');
    if (whyHireImage) {
        gsap.fromTo(whyHireImage, {
            opacity: 0,
            x: -100,
            rotateY: 15,
            scale: 0.85
        }, {
            scrollTrigger: {
                trigger: whyHireImage,
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out'
        });
    }
    if (whyHireText) {
        gsap.fromTo(whyHireText, {
            opacity: 0,
            x: 100,
            rotateY: -15,
            scale: 0.85
        }, {
            scrollTrigger: {
                trigger: whyHireText,
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out'
        });
    }

    // ---- HIRE LIST items — Stagger ----
    gsap.utils.toArray('.hire-list li').forEach((li, i) => {
        gsap.fromTo(li, {
            opacity: 0,
            x: -30
        }, {
            scrollTrigger: {
                trigger: li.parentElement,
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // ---- FOOTER ----
    const footer = document.querySelector('.footer-content');
    if (footer) {
        gsap.fromTo(footer, {
            opacity: 0,
            y: 30
        }, {
            scrollTrigger: {
                trigger: footer,
                start: 'top 95%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
}

/* ============================================
   CASE STUDY PANEL
   ============================================ */
function initCaseStudyPanel() {
    const openBtn = document.getElementById('viewCaseStudyBtn');
    const panel = document.getElementById('caseStudyPanel');
    const overlay = document.getElementById('caseStudyOverlay');
    const closeBtn = document.getElementById('caseStudyClose');

    if (!openBtn || !panel || !overlay || !closeBtn) return;

    function openPanel(e) {
        e.preventDefault();
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closePanel();
        }
    });
}

/* ============================================
   DEVELOPER TERMINAL CONTACT FORM
   ============================================ */
function initContactTerminal() {
    const form = document.getElementById('contactForm');
    const output = document.getElementById('terminalOutput');
    if (!form || !output) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Clear previous status messages (keep initial 3)
        const existingLines = output.querySelectorAll('.terminal-line');
        existingLines.forEach((line, i) => {
            if (i >= 3) line.remove();
        });

        function addLine(html, delay) {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'terminal-line';
                div.innerHTML = html;
                output.appendChild(div);
                output.scrollTop = output.scrollHeight;
            }, delay);
        }

        addLine(`<span class="command">$ ./send_message.sh --name="${data.name}" --email="${data.email}"</span>`, 100);
        addLine(`<span class="system">→ Connecting to server...</span>`, 500);
        addLine(`<span class="system">→ Validating payload...</span>`, 1000);
        addLine(`<span class="success">→ Message from ${data.name} delivered successfully! ✓</span>`, 1600);
        addLine(`<span class="system">→ Elango will respond within 24 hours.</span>`, 2100);

        setTimeout(() => {
            form.reset();
        }, 2200);
    });
}

/* ============================================
   CERTIFICATE MODAL
   ============================================ */
function initCertificateModal() {
    const certificateItems = document.querySelectorAll('.certification-item[data-certificate]');
    const certificateModal = document.getElementById('certificateModal');
    const closeCertificateModal = document.getElementById('closeCertificateModal');
    const certificateImage = document.getElementById('certificateImage');

    if (certificateItems.length && certificateModal && certificateImage) {
        certificateItems.forEach(item => {
            item.addEventListener('click', function () {
                const certPath = this.getAttribute('data-certificate');
                certificateImage.src = certPath;
                certificateModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeCertificateModal) {
            closeCertificateModal.addEventListener('click', function () {
                certificateModal.classList.remove('active');
                document.body.style.overflow = '';
                certificateImage.src = '';
            });
        }

        certificateModal.addEventListener('click', function (e) {
            if (e.target === certificateModal) {
                certificateModal.classList.remove('active');
                document.body.style.overflow = '';
                certificateImage.src = '';
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
                certificateModal.classList.remove('active');
                document.body.style.overflow = '';
                certificateImage.src = '';
            }
        });
    }
}

/* ============================================
   CERTIFICATION SLIDER
   ============================================ */
function initCertificationSlider() {
    const wrapper = document.querySelector('.certifications-wrapper');
    const grid = document.querySelector('.certifications-grid');
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    const items = document.querySelectorAll('.certification-item');

    if (!wrapper || !grid || !prevBtn || !nextBtn || items.length === 0) return;

    let currentIndex = 0;
    const cardWidth = 280;
    const gap = 28;
    const totalCards = items.length;

    function getVisibleCards() {
        const wrapperWidth = wrapper.offsetWidth;
        return Math.floor(wrapperWidth / (cardWidth + gap)) || 1;
    }

    function getMaxIndex() {
        return Math.max(0, totalCards - getVisibleCards());
    }

    function updateSlider() {
        const translateX = currentIndex * (cardWidth + gap);
        grid.style.transform = `translateX(-${translateX}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateSlider(); } });
    nextBtn.addEventListener('click', () => { if (currentIndex < getMaxIndex()) { currentIndex++; updateSlider(); } });
    window.addEventListener('resize', () => {
        if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
        updateSlider();
    });
    updateSlider();
}

/* ============================================
   PORTFOLIO SLIDER
   ============================================ */
function initPortfolioSlider() {
    const wrapper = document.querySelector('.portfolio-wrapper');
    const slider = document.getElementById('portfolioSlider');
    const prevBtn = document.getElementById('portfolioPrevBtn');
    const nextBtn = document.getElementById('portfolioNextBtn');
    const sliderItems = slider ? slider.querySelectorAll('.portfolio-card') : [];

    if (!wrapper || !slider || !prevBtn || !nextBtn || sliderItems.length === 0) return;

    let currentIndex = 0;
    const gap = 28;
    const totalCards = sliderItems.length;

    function getCardWidth() { return sliderItems[0].offsetWidth; }
    function getVisibleCards() { return Math.floor(wrapper.offsetWidth / (getCardWidth() + gap)) || 1; }
    function getMaxIndex() { return Math.max(0, totalCards - getVisibleCards()); }

    function updateSlider() {
        const cardWidth = getCardWidth();
        const translateX = currentIndex * (cardWidth + gap);
        slider.style.transform = `translateX(-${translateX}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateSlider(); } });
    nextBtn.addEventListener('click', () => { if (currentIndex < getMaxIndex()) { currentIndex++; updateSlider(); } });
    window.addEventListener('resize', () => {
        if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
        updateSlider();
    });
    setTimeout(updateSlider, 150);
}

/* ============================================
   RESUME MODAL
   ============================================ */
function initResumeModal() {
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeResumeModal = document.getElementById('closeResumeModal');

    if (viewResumeBtn && resumeModal) {
        viewResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (closeResumeModal) {
            closeResumeModal.addEventListener('click', () => {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   SCROLL-BASED ANIMATIONS (AOS)
   ============================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ============================================
   ACTIVE NAVIGATION LINK
   ============================================ */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 120;
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
    }, { passive: true });
}
