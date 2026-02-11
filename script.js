// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== STICKY HEADER =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== SCROLL ANIMATIONS =====
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

// Observe elements for animation
const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        input.style.borderColor = '#c0392b';
    }
}

// Clear error
function clearError(input) {
    const errorElement = document.getElementById(`${input.id}Error`);
    if (errorElement) {
        errorElement.textContent = '';
        input.style.borderColor = '';
    }
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Please enter a valid name (at least 2 characters)');
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        clearError(emailInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
    } else {
        clearError(messageInput);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    } else {
        clearError(nameInput);
    }
    
    // Validate email
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailInput);
    }
    
    // Validate message
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
    } else {
        clearError(messageInput);
    }
    
    if (isValid) {
        // Success feedback
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Inquiry Submitted ✓';
        submitButton.style.background = '#27ae60';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
        
        // In production, this would send data to a server
        console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            phone: document.getElementById('phone').value,
            interest: document.getElementById('interest').value,
            message: messageInput.value
        });
    }
});

// ===== CTA BUTTON ACTIONS =====
const ctaButtons = document.querySelectorAll('.cta-primary, .header-cta');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerOffset = 80;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CARD BUTTONS =====
const cardButtons = document.querySelectorAll('.card-button');
cardButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.feature-card');
        const mountainName = card.querySelector('.card-title').textContent;
        
        // Show alert (in production, this would open a modal or navigate to detail page)
        alert(`Thank you for your interest in ${mountainName}. Our specialists will contact you shortly with detailed information about this exceptional property.`);
    });
});

// ===== PRICING BUTTONS =====
const pricingButtons = document.querySelectorAll('.pricing-button');
pricingButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const tier = card.querySelector('.pricing-title').textContent;
        
        // Scroll to contact form and pre-fill interest
        const contactSection = document.getElementById('contact');
        const interestSelect = document.getElementById('interest');
        
        if (contactSection && interestSelect) {
            // Set the interest dropdown
            const tierValue = tier.toLowerCase();
            interestSelect.value = tierValue;
            
            // Scroll to contact
            const headerOffset = 80;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Focus on name input after scroll
            setTimeout(() => {
                nameInput.focus();
            }, 800);
        }
    });
});

// ===== PARALLAX EFFECT FOR HERO =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== WATCH FILM BUTTON =====
const watchFilmButtons = document.querySelectorAll('.cta-secondary');
watchFilmButtons.forEach(button => {
    button.addEventListener('click', () => {
        // In production, this would open a video modal
        alert('Our exclusive documentary film showcasing the majesty of mountain ownership will be available soon. We will notify you when it premieres.');
    });
});

// ===== CURSOR EFFECT (DESKTOP ONLY) =====
if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(212, 165, 116, 0.6);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 5 + 'px';
        cursor.style.top = e.clientY - 5 + 'px';
    });

    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .testimonial-card, .pricing-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(3)';
            cursor.style.background = 'rgba(212, 165, 116, 0.3)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(212, 165, 116, 0.6)';
        });
    });
}

console.log('Peak Acquisitions - Website loaded successfully');
