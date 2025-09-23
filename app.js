// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Navigation functionality
    initializeNavigation();
    
    // Contact form functionality
    initializeContactForm();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Gallery interactions
    initializeGalleryInteractions();
    
    // Social tracking
    initializeSocialTracking();
    
    // Header scroll effect
    initializeHeaderScrollEffect();
});

// Mobile menu toggle functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navbarMenu.classList.toggle('active');
            
            // Change hamburger icon to X when menu is open
            const icon = mobileMenuToggle.querySelector('i');
            if (navbarMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navbarMenu.contains(event.target)) {
                navbarMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Navigation active link functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Function to update active navigation link
    function updateActiveNavLink() {
        let current = 'home'; // Default to home
        const scrollPosition = window.scrollY + 150; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll with debounce
    window.addEventListener('scroll', debounce(updateActiveNavLink, 50));
    
    // Update active link on page load
    setTimeout(updateActiveNavLink, 100);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();
            
            // Clear previous validation styles
            [nameField, emailField, messageField].forEach(field => {
                field.style.borderColor = '';
            });
            
            // Basic validation
            let hasErrors = false;
            
            if (!name) {
                nameField.style.borderColor = 'var(--color-error)';
                hasErrors = true;
            }
            
            if (!email) {
                emailField.style.borderColor = 'var(--color-error)';
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                emailField.style.borderColor = 'var(--color-error)';
                hasErrors = true;
            }
            
            if (!message) {
                messageField.style.borderColor = 'var(--color-error)';
                hasErrors = true;
            }
            
            if (hasErrors) {
                showNotification('Please fill in all fields correctly.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Reset field border colors
                [nameField, emailField, messageField].forEach(field => {
                    field.style.borderColor = '';
                });
            }, 1500);
        });
    }
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Improved notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Determine colors based on type
    let backgroundColor, borderColor, textColor;
    switch(type) {
        case 'success':
            backgroundColor = 'rgba(33, 128, 141, 0.1)';
            borderColor = 'var(--color-success)';
            textColor = 'var(--color-success)';
            break;
        case 'error':
            backgroundColor = 'rgba(192, 21, 47, 0.1)';
            borderColor = 'var(--color-error)';
            textColor = 'var(--color-error)';
            break;
        default:
            backgroundColor = 'var(--color-surface)';
            borderColor = 'var(--color-border)';
            textColor = 'var(--color-text)';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Apply styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        min-width: 300px;
        background: ${backgroundColor};
        border: 2px solid ${borderColor};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInFromRight 0.4s ease-out;
        font-family: var(--font-family-base);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        gap: 12px;
    `;
    
    const messageElement = notification.querySelector('.notification-message');
    messageElement.style.cssText = `
        color: ${textColor};
        font-size: 14px;
        font-weight: 500;
        flex: 1;
        line-height: 1.4;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: ${textColor};
        cursor: pointer;
        font-size: 14px;
        padding: 4px;
        border-radius: 4px;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInFromRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutToRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add hover effect for close button
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
    });
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.7';
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutToRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const animationElements = document.querySelectorAll('.event-card, .activity-card, .team-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animationElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Update URL without causing page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// Gallery image placeholder interactions
function initializeGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-placeholder');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('p').textContent;
            showNotification(`Gallery: ${title} - Image coming soon!`, 'info');
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Social media link tracking
function initializeSocialTracking() {
    const socialLinks = document.querySelectorAll('a[href*="instagram.com"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Instagram link clicked - @kits_jeevankaushal_official');
        });
    });
}

// Header scroll effect
function initializeHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(252, 252, 249, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid rgba(94, 82, 64, 0.1)';
        } else {
            header.style.background = 'var(--color-surface)';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = '1px solid var(--color-border)';
        }
    }, 10));
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile menu
    if (event.key === 'Escape') {
        const navbarMenu = document.getElementById('navbar-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }
});

// Error handling for better user experience
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
});

// Initialize on page load with fallback
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🎓 Jeevan Kaushal Club - KITS Guntur initialized');
    });
} else {
    console.log('🎓 Jeevan Kaushal Club - KITS Guntur loaded');
}

// Print welcome message
console.log('%c🎓 Jeevan Kaushal Club - KITS Guntur', 'color: #218B8C; font-size: 16px; font-weight: bold;');
console.log('%cEmpowering Students Through Life Skills Development', 'color: #626C71; font-size: 12px;');
console.log('%cWebsite functionality enhanced! 🚀', 'color: #32B08C; font-size: 12px;');