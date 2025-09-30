document.addEventListener('DOMContentLoaded', function() {
    initializeFadeIn();
    initializeNavigation();
    initializeModals();
    initializeFormHandling();
    initializeScrollEffects();
    initializeAnimations();
});

// Initialize fade-in animation
function initializeFadeIn() {
    // Add a class to trigger animations after page load
    document.body.classList.add('loaded');
    
    // Optional: Add intersection observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .stat, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const verticalNav = document.getElementById('verticalNav');
    const navClose = document.getElementById('navClose');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.vertical-nav-link');

    // Debug: Check if elements exist
    console.log('Navigation elements found:', {
        navToggle: !!navToggle,
        verticalNav: !!verticalNav,
        navClose: !!navClose,
        navOverlay: !!navOverlay,
        navLinks: navLinks.length
    });

    // Toggle navigation
    function toggleNav() {
        console.log('Toggle nav clicked');
        verticalNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = verticalNav.classList.contains('active') ? 'hidden' : '';
    }

    // Close navigation
    function closeNav() {
        console.log('Close nav called');
        verticalNav.classList.remove('active');
        navOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav toggle clicked');
            toggleNav();
        });
    }

    if (navClose) {
        navClose.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav close clicked');
            closeNav();
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', function(e) {
            console.log('Overlay clicked');
            closeNav();
        });
    }

    // Close navigation when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                closeNav();
                
                // Smooth scroll to target section
                setTimeout(() => {
                    const headerHeight = 0; // No header offset needed
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300); // Wait for nav close animation
            }
        });
    });

    // Close navigation on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && verticalNav.classList.contains('active')) {
            closeNav();
        }
    });

    // Close navigation on window resize (mobile)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && verticalNav.classList.contains('active')) {
            closeNav();
        }
    });
}

// Modal functionality
function initializeModals() {
    // Add modal functionality if needed
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Form handling
function initializeFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff6b6b';
                } else {
                    field.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
            });
            
            if (isValid) {
                // Show success message (you can customize this)
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navToggle = document.getElementById('navToggle');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show nav toggle based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navToggle.style.transform = 'translateY(-100px)';
        } else {
            // Scrolling up
            navToggle.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation initialization
function initializeAnimations() {
    // Add any additional animation logic here
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(element => {
        const animationType = element.getAttribute('data-animate');
        element.classList.add(animationType);
    });
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}