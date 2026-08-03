
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. PRELOADER
    // ==========================================================================

    const preloader = document.getElementById('preloader');

    function esconderPreloader() {
        if (!preloader) {
            return;
        }

        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1000);
    }

    if (document.readyState === 'complete') {
        esconderPreloader();
    } else {
        window.addEventListener('load', esconderPreloader);
    }

    // ==========================================================================
    // 2. CURSOR PERSONALIZADO
    // ==========================================================================

    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (
        window.innerWidth > 768 &&
        cursor &&
        cursorDot
    ) {
        document.addEventListener('mousemove', (evento) => {
            cursor.style.left = `${evento.clientX}px`;
            cursor.style.top = `${evento.clientY}px`;

            cursorDot.style.left = `${evento.clientX}px`;
            cursorDot.style.top = `${evento.clientY}px`;
        });
    }

    // ==========================================================================
    // 3. CABEÇALHO AO ROLAR
    // ==========================================================================

    const header = document.getElementById('main-header');

    function atualizarCabecalho() {
        if (!header) {
            return;
        }

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', atualizarCabecalho, {
        passive: true
    });

    atualizarCabecalho();

    // ==========================================================================
    // 4. MENU RESPONSIVO
    // ==========================================================================

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function fecharMenu() {
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.addEventListener('click', () => {
            const menuAberto = navMenu.classList.toggle('active');

            menuToggle.classList.toggle('active', menuAberto);

            menuToggle.setAttribute(
                'aria-expanded',
                String(menuAberto)
            );
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('click', (evento) => {
        if (
            navMenu &&
            menuToggle &&
            navMenu.classList.contains('active') &&
            !navMenu.contains(evento.target) &&
            !menuToggle.contains(evento.target)
        ) {
            fecharMenu();
        }
    });

    // ==========================================================================
    // 5. LINK ATIVO DO MENU
    // ==========================================================================

    const secoesDoMenu = document.querySelectorAll(
        'section[id]'
    );

    function atualizarLinkAtivo() {
        let secaoAtual = '';

        secoesDoMenu.forEach((secao) => {
            const topoDaSecao = secao.offsetTop - 160;
            const alturaDaSecao = secao.offsetHeight;

            if (
                window.scrollY >= topoDaSecao &&
                window.scrollY < topoDaSecao + alturaDaSecao
            ) {
                secaoAtual = secao.id;
            }
        });

        navLinks.forEach((link) => {
            const destino = link.getAttribute('href');

            link.classList.toggle(
                'active',
                destino === `#${secaoAtual}`
            );
        });
    }

    window.addEventListener('scroll', atualizarLinkAtivo, {
        passive: true
    });

    atualizarLinkAtivo();

    // ==========================================================================
    // 6. ANIMAÇÃO DOS ELEMENTOS AO ROLAR
    // ==========================================================================

    const elementosParaRevelar =
        document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const observador = new IntersectionObserver(
            (entradas, observer) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('revealed');
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -80px 0px'
            }
        );

        elementosParaRevelar.forEach((elemento) => {
            observador.observe(elemento);
        });
    } else {
        elementosParaRevelar.forEach((elemento) => {
            elemento.classList.add('revealed');
        });
    }

    // ==========================================================================
    // 7. SLIDER DOS DEPOIMENTOS
    // ==========================================================================

    function configurarSlider(
        sliderId,
        botaoAnteriorId,
        botaoProximoId
    ) {
        const slider = document.getElementById(sliderId);
        const botaoAnterior =
            document.getElementById(botaoAnteriorId);
        const botaoProximo =
            document.getElementById(botaoProximoId);

        if (
            !slider ||
            !botaoAnterior ||
            !botaoProximo
        ) {
            return;
        }

        const cartoes = Array.from(
            slider.querySelectorAll('.depoimento-card-v2')
        );

        if (cartoes.length === 0) {
            return;
        }

        let indiceAtual = cartoes.findIndex((cartao) => {
            return cartao.classList.contains('active');
        });

        if (indiceAtual < 0) {
            indiceAtual = 0;
        }

        function mostrarCartao(indice) {
            cartoes.forEach((cartao, posicao) => {
                const cartaoAtivo = posicao === indice;

                cartao.classList.toggle(
                    'active',
                    cartaoAtivo
                );

                cartao.setAttribute(
                    'aria-hidden',
                    String(!cartaoAtivo)
                );
            });

            const wrapper = slider.closest(
                '.slider-wrapper-dep'
            );

            if (wrapper) {
                wrapper.scrollTop = 0;
            }
        }

        botaoProximo.addEventListener('click', () => {
            indiceAtual =
                (indiceAtual + 1) % cartoes.length;

            mostrarCartao(indiceAtual);
        });

        botaoAnterior.addEventListener('click', () => {
            indiceAtual =
                (indiceAtual - 1 + cartoes.length) %
                cartoes.length;

            mostrarCartao(indiceAtual);
        });

        mostrarCartao(indiceAtual);
    }

    configurarSlider(
        'slider-clientes',
        'prev-cliente',
        'next-cliente'
    );

    configurarSlider(
        'slider-alunas',
        'prev-aluna',
        'next-aluna'
    );

    // ==========================================================================
    // 8. AMPLIAÇÃO DAS FOTOS DOS PROCEDIMENTOS
    // ==========================================================================

    const fotoModal = document.getElementById('foto-modal');

    const fotoModalImagem =
        document.getElementById('foto-modal-imagem');

    const fotoModalLegenda =
        document.getElementById('foto-modal-legenda');

    const fotoModalFechar =
        document.getElementById('foto-modal-fechar');

    const fotosProcedimentos = document.querySelectorAll(
        '.procedimentos-galeria img'
    );

    let elementoAnterior = null;

    function abrirFoto(foto) {
        if (
            !fotoModal ||
            !fotoModalImagem ||
            !fotoModalLegenda ||
            !fotoModalFechar
        ) {
            return;
        }

        elementoAnterior = document.activeElement;

        fotoModalImagem.src =
            foto.currentSrc || foto.src;

        fotoModalImagem.alt =
            foto.alt || 'Foto ampliada do procedimento';

        fotoModalLegenda.textContent =
            foto.alt || 'Resultado do procedimento';

        fotoModal.classList.add('aberto');

        fotoModal.setAttribute(
            'aria-hidden',
            'false'
        );

        document.body.classList.add('modal-aberto');

        fotoModalFechar.focus();
    }

    function fecharFoto() {
        if (
            !fotoModal ||
            !fotoModalImagem
        ) {
            return;
        }

        fotoModal.classList.remove('aberto');

        fotoModal.setAttribute(
            'aria-hidden',
            'true'
        );

        document.body.classList.remove('modal-aberto');

        setTimeout(() => {
            if (!fotoModal.classList.contains('aberto')) {
                fotoModalImagem.src = '';
            }
        }, 300);

        if (
            elementoAnterior &&
            typeof elementoAnterior.focus === 'function'
        ) {
            elementoAnterior.focus();
        }
    }

    if (
        fotoModal &&
        fotoModalImagem &&
        fotoModalLegenda &&
        fotoModalFechar
    ) {
        fotosProcedimentos.forEach((foto) => {
            foto.setAttribute('tabindex', '0');
            foto.setAttribute('role', 'button');

            foto.setAttribute(
                'aria-label',
                `Ampliar ${foto.alt || 'foto do procedimento'}`
            );

            foto.addEventListener('click', (evento) => {
                evento.preventDefault();
                evento.stopPropagation();

                abrirFoto(foto);
            });

            foto.addEventListener('keydown', (evento) => {
                if (
                    evento.key === 'Enter' ||
                    evento.key === ' '
                ) {
                    evento.preventDefault();
                    evento.stopPropagation();

                    abrirFoto(foto);
                }
            });
        });

        fotoModalFechar.addEventListener(
            'click',
            fecharFoto
        );

        fotoModal.addEventListener('click', (evento) => {
            if (evento.target === fotoModal) {
                fecharFoto();
            }
        });

        document.addEventListener('keydown', (evento) => {
            if (
                evento.key === 'Escape' &&
                fotoModal.classList.contains('aberto')
            ) {
                fecharFoto();
            }
        });
    }

});
