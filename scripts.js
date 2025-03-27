document.addEventListener('DOMContentLoaded', function() {
    // Animação ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-anime]');
        const windowTop = window.scrollY + (window.innerHeight * 0.75);
        
        elements.forEach(function(element) {
            const elementTop = element.offsetTop;
            const delay = element.getAttribute('data-anime-delay') || 0;
            
            if (windowTop > elementTop) {
                setTimeout(function() {
                    element.classList.add('animate');
                }, delay * 1000);
            }
        });
    };
    
    // Menu ativo conforme seção visível
    const activateMenuAtCurrentSection = function() {
        const sections = document.querySelectorAll('section');
        const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            const checkpointStart = checkpoint >= sectionTop;
            const checkpointEnd = checkpoint <= sectionTop + sectionHeight;
            
            if (checkpointStart && checkpointEnd) {
                document.querySelector(`.menu a[href*=${sectionId}]`).classList.add('active');
            } else {
                document.querySelector(`.menu a[href*=${sectionId}]`).classList.remove('active');
            }
        });
    };
    
    // Smooth scroll para links internos
    const smoothScroll = function() {
        const internalLinks = document.querySelectorAll('.menu a[href^="#"], .btn[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
    };
    
    // Efeito de digitação no banner (opcional)
    const typeEffect = function() {
        const text = "Cuidamos do seu animal de estimação com amor e dedicação";
        const element = document.querySelector('.banner p');
        let i = 0;
        
        if (element) {
            element.textContent = '';
            
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 50);
        }
    };
    
    // Inicialização
    animateOnScroll();
    smoothScroll();
    typeEffect();
    
    window.addEventListener('scroll', function() {
        animateOnScroll();
        activateMenuAtCurrentSection();
    });
});

// Validação do formulário de contato
if (document.getElementById('contactForm')) {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação simples
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simulação de envio
        alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
        
        // Limpar formulário
        contactForm.reset();
    });
}

// Carrossel de banners
function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let interval;

    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${currentIndex * 100}%)`;
            slide.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
        resetInterval();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
        resetInterval();
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Iniciar intervalo
    resetInterval();

    // Pausar quando o mouse estiver sobre o carrossel
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', resetInterval);
}

// Inicializar carrossel se existir na página
if (document.querySelector('.carousel-container')) {
    initCarousel();
}

document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu a");

    function activateLink() {
        menuLinks.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");
    }

    menuLinks.forEach((link) => link.addEventListener("click", activateLink));
});
document.getElementById("menu-toggle").addEventListener("click", function () {
    document.querySelector(".menu ul").classList.toggle("active");
});
