document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide
    lucide.createIcons();

    // GSAP Setup
    gsap.registerPlugin(ScrollTrigger);

    // Sticky Navbar
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Page Load Animations
    const tl = gsap.timeline();

    tl.from('.hero-text h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2
    })
    .from('.hero-text p', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-img-main', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
    }, '-=1')
    .from('.hero-stats-row', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5');

    // Reveal Animations on Scroll
    gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Services Grid Stagger
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-container',
            start: 'top 85%',
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
    });

    // Doctor Image Parallax
    gsap.to('.dr-img-container img', {
        scrollTrigger: {
            trigger: '.doctor-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -50,
        ease: 'none'
    });

    // Stats Counter Mockup
    const stats = document.querySelectorAll('.dr-stat-item h4');
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 90%'
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            stagger: 0.2
        });
    });

    // Form Submission
    const premiumForm = document.getElementById('premiumForm');
    if (premiumForm) {
        premiumForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = premiumForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Securing Slot...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                alert('Success! Your private consultation slot has been reserved. Our manager will connect with you shortly.');
                premiumForm.reset();
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            }, 2000);
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
