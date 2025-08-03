// Плавная прокрутка к секциям
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Мобильное меню
const handleMobileMenu = () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
        });
    }
};

// Обработка формы
const handleContactForm = () => {
    const form = document.querySelector('.contact__form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Имитация отправки формы
            showNotification('Сообщение отправлено! Скоро свяжемся с вами.', 'success');
            form.reset();
        });
    }
};

// Уведомления
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое удаление
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

// Анимация при скролле
const handleScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.project-card, .stat, .skill');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Активное состояние навигации при скролле
const handleActiveNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
};

// Плавная прокрутка для навигационных ссылок
const handleSmoothNavigation = () => {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Закрываем мобильное меню
            const navMenu = document.querySelector('.nav__menu');
            const navToggle = document.querySelector('.nav__toggle');
            if (navMenu && navMenu.classList.contains('nav__menu--active')) {
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
            }
        });
    });
};

// Анимация счетчиков
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat__number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    const suffix = counter.textContent.includes('+') ? '+' : 
                                 counter.textContent.includes('%') ? '%' : '';
                    counter.textContent = Math.floor(current) + suffix;
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
};

// Эффект параллакса для hero секции
const handleParallax = () => {
    const heroShape = document.querySelector('.hero__shape');
    
    if (heroShape) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroShape.style.transform = `translateY(${rate}px)`;
        });
    }
};

// Инициализация всех функций
const init = () => {
    handleMobileMenu();
    handleContactForm();
    handleScrollAnimations();
    handleActiveNavigation();
    handleSmoothNavigation();
    animateCounters();
    handleParallax();
    
    // Добавляем стили для активного состояния навигации
    const style = document.createElement('style');
    style.textContent = `
        .nav__link--active {
            color: #667eea !important;
        }
        .nav__link--active::after {
            width: 100% !important;
        }
        .nav__menu--active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        .nav__toggle--active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .nav__toggle--active span:nth-child(2) {
            opacity: 0;
        }
        .nav__toggle--active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
};

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', init); 