document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. LOADING SCREEN & CURSOR
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 600);
        }, 1000);
    });

    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    if (window.innerWidth > 768 && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
    }

    // ==========================================================================
    // 2. HEADER & MENU RESPONSIVO
    // ==========================================================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================================================
    // 3. SCROLL REVEAL ANIMATION
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) el.classList.add('revealed');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ==========================================================================
    // 4. SISTEMA DE SETAS DOS DEPOIMENTOS (MUDANÇA 3)
    // ==========================================================================
    const setupCustomSlider = (sliderId, prevBtnId, nextBtnId) => {
        const sliderContainer = document.getElementById(sliderId);
        if(!sliderContainer) return;
       
        const cards = sliderContainer.querySelectorAll('.depoimento-card-v2');
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        let currentIndex = 0;

        const showCard = (index) => {
            cards.forEach(card => card.classList.remove('active'));
            cards[index].classList.add('active');
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
        });
    };

    // Inicializa o controle das setas para ambos os blocos independentes
    setupCustomSlider('slider-clientes', 'prev-cliente', 'next-cliente');
    setupCustomSlider('slider-alunas', 'prev-aluna', 'next-aluna');

    // ==========================================================================
    // 5. FORMULÁRIO DE CONTATO
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            submitBtn.innerText = "Processando Solicitação...";
            submitBtn.disabled = true;
            setTimeout(() => {
                alert('Recebemos sua solicitação de agendamento! Equipe Priscylla Portugal entrará em contato em breve.');
                contactForm.reset();
                submitBtn.innerText = "Enviar Mensagem";
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});