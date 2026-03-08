document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Lenis Smooth Scrolling ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    if (typeof ScrollTrigger !== "undefined") {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        });
        gsap.ticker.lagSmoothing(0, 0);
    }

    // --- 1.1 Mobile Menu Logic ---
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link, .btn-sm');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');

        // Disable/Enable scroll when menu is open
        if (nav.classList.contains('active')) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            nav.classList.remove('active');
            lenis.start();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains('active')) {
            menuBtn.classList.remove('active');
            nav.classList.remove('active');
            lenis.start();
        }
    });

    // --- 2. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Custom Cursor is handled by CSS to be hidden on touch
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover state to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, .magnetic-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // --- 3. Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;

            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - h;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = `transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = `none`;
        });
    });

    // --- 4. Dark/Light Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);

        if (newTheme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        // Let the Three.js scene know if theme changed
        if (window.updateThreeTheme) {
            window.updateThreeTheme(newTheme);
        }
    });

    // --- 5. Header Scroll Effect & Scroll Progress ---
    const header = document.querySelector('.header');
    const progressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Calculate scroll progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // --- 6. AI Chatbot Toggle ---
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Basic Chatbot logic
    function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Appending user msg
        appendMessage('user', text);
        chatInput.value = '';

        // Simple hardcoded responses
        setTimeout(() => {
            let response = "I'm still learning! Ask me about Anish's skills, projects, or pricing.";
            const lowerText = text.toLowerCase();

            if (lowerText.includes('skill')) {
                response = "Anish is skilled in HTML, CSS, JavaScript, Python, Full Stack Development, and integrating AI tools.";
            } else if (lowerText.includes('project')) {
                response = "Some top projects include a Personal Expense Tracker, Restaurant Website, and Startup Landing Pages. Check out the Work section!";
            } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('hire')) {
                response = "Portfolio Website: ₹7000, Business Website: ₹15000, App + AI Chatbot: ₹25000.";
            } else if (lowerText.includes('contact') || lowerText.includes('email')) {
                response = "You can reach out via the contact form below or email directly!";
            } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
                response = "Hello! How can I help you learn about Anish today?";
            }

            appendMessage('ai', response);
        }, 1000);
    }

    sendChat.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    function appendMessage(sender, text) {
        const div = document.createElement('div');
        div.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
        div.textContent = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // --- 7. Initial GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Reveal
    gsap.to('.hero-title, .hero-subtitle, .greeting, .hero-tagline, .hero-cta', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
    });

    // --- 8. 3D Tech Sphere (TagCloud) ---
    const techSphereContainer = document.getElementById('tech-sphere');
    if (techSphereContainer) {
        const texts = [
            'HTML5', 'CSS3', 'JavaScript', 'React',
            'Node.js', 'Python', 'Tailwind', 'GSAP',
            'Three.js', 'MongoDB', 'SQL', 'Git',
            'Next.js', 'AI Tools', 'Figma'
        ];

        // Configuration
        const options = {
            radius: window.innerWidth > 768 ? 200 : 130,
            maxSpeed: 'fast',
            initialSpeed: 'normal',
            direction: 135,
            keep: true
        };

        TagCloud(techSphereContainer, texts, options);
    }

    // --- 9. Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.reveal-elem');

    // We add a slight delay to ensure layouts are computed properly
    setTimeout(() => {
        revealElements.forEach((elem) => {
            gsap.fromTo(elem,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, 100);

    // --- 10. Vanilla Tilt for Cards ---
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
    });

    // --- 11. Case Study Modals ---
    const caseStudyBtns = document.querySelectorAll('.case-study-btn');
    const modal = document.getElementById('caseStudyModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');

    const caseStudies = {
        'Personal Expense Tracker': `
            <h2>Personal Expense Tracker</h2>
            <div class="project-tech mt-1 mb-2"><span>React</span><span>Node.js</span><span>MongoDB</span></div>
            <h3>Problem</h3>
            <p class="mb-1">Users struggle to visualize where their money goes on a daily basis due to complex interfaces.</p>
            <h3>Solution</h3>
            <p class="mb-1">A full-stack application featuring interactive charts, daily breakdowns, and intelligent budgeting tools.</p>
            <h3>Results</h3>
            <p>Helped users save an average of 15% more per month through improved financial awareness.</p>
        `,
        'Restaurant Website': `
            <h2>Restaurant Website</h2>
            <div class="project-tech mt-1 mb-2"><span>HTML/CSS</span><span>Vanilla JS</span><span>GSAP</span></div>
            <h3>Problem</h3>
            <p class="mb-1">The restaurant needed a modern online presence to accept reservations and showcase their ambiance.</p>
            <h3>Solution</h3>
            <p class="mb-1">Developed a visually immersive website with 3D food showcases, fluid animations, and an integrated booking system.</p>
            <h3>Results</h3>
            <p>Increased online reservations by 40% and drastically reduced drop-off rates.</p>
        `,
        'Startup Landing Page': `
            <h2>Startup Landing Page</h2>
            <div class="project-tech mt-1 mb-2"><span>Next.js</span><span>Tailwind</span><span>Framer Motion</span></div>
            <h3>Problem</h3>
            <p class="mb-1">The startup suffered from high bounce rates on their previous text-heavy landing page.</p>
            <h3>Solution</h3>
            <p class="mb-1">A high-performance, animation-rich landing page with clear Call-to-Action funnels and dark mode support.</p>
            <h3>Results</h3>
            <p>Boosted conversion rates by over 250% within the first month of deployment.</p>
        `
    };

    caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;

            modalBody.innerHTML = caseStudies[projectTitle] || '<p>Case study coming soon.</p>';
            modal.classList.add('active');

            // disable lenis scrolling
            lenis.stop();
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        // re-enable lenis scrolling
        lenis.start();
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            lenis.start();
        }
    });

});
