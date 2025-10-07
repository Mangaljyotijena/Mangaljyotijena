// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const currentTheme = body.getAttribute('data-theme');
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic form validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (replace with actual backend call)
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');

    // Reset form
    this.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;

    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else {
        notification.style.backgroundColor = '#ef4444';
    }

    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);

    // Add slide-out animation
    style.textContent += `
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
}

// Typing Animation for Hero Subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
let isTyping = false;

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        heroSubtitle.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        setTimeout(() => {
            typeWriter(text, i + 1, fnCallback);
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

function startTypingAnimation() {
    if (!isTyping) {
        isTyping = true;
        heroSubtitle.innerHTML = '';
        typeWriter(originalText, 0, () => {
            isTyping = false;
        });
    }
}

// Start typing animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTypingAnimation();
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero'));

// Parallax Effect for Hero Background (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    hero.style.transform = `translateY(${rate}px)`;
});

// Skill Tags Hover Effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.backgroundColor = 'var(--accent-color)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = 'var(--primary-color)';
    });
});

// Project Cards Hover Effect Enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'var(--shadow)';
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in-up class to initially visible sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('fade-in-up');
        }
    });
});
