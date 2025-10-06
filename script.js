// ===== ANIMATION JAVASCRIPT =====

// Configuration
const textToType = "./MateiStoica";
const typingSpeed = 100; // milliseconds per character
const cursorBlinkTime = 800; // how long cursor blinks before typing
const fadeDelay = 1500; // delay before fade starts after all typing completes

// Get DOM elements
const typedTextElement = document.getElementById('typed-text');
const cursorElement = document.getElementById('cursor');
const animationScreen = document.getElementById('terminal-animation');
const mainContent = document.getElementById('main-content');

// Start animation sequence
function startAnimation() {
    // Wait for cursor to blink a bit
    setTimeout(() => {
        typeText();
    }, cursorBlinkTime);
}

// Typing animation function for name
function typeText() {
    let charIndex = 0;
    
    // Stop cursor blinking during typing
    cursorElement.style.animation = 'none';
    cursorElement.style.opacity = '1';
    
    const typingInterval = setInterval(() => {
        if (charIndex < textToType.length) {
            // Add next character
            typedTextElement.textContent += textToType[charIndex];
            charIndex++;
        } else {
            // Name typing complete, finish animation
            clearInterval(typingInterval);
            setTimeout(() => {
                finishAnimation();
            }, 500); // Brief pause before finishing
        }
    }, typingSpeed);
}

// Finish animation and transition to homepage
function finishAnimation() {
    setTimeout(() => {
        // Start fade out
        animationScreen.classList.add('fade-out');
        
        // Show main content
        document.body.classList.remove('loading');
        mainContent.classList.add('visible');
        
        // Remove animation screen from DOM after fade completes
        setTimeout(() => {
            animationScreen.remove();
        }, 1000);
    }, fadeDelay);
}

// Start everything when page loads
window.addEventListener('load', startAnimation);

// ===== PROJECTS SHOWCASE JAVASCRIPT =====

// Function to handle project clicks
function openProject(projectId) {
    // Add your project opening logic here
    console.log(`Opening project: ${projectId}`);
    // You could open a modal, navigate to a page, etc.
    
    // Example: scroll to work section for now
    const workSection = document.querySelector('#work');
    if (workSection) {
        workSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== POWERGLITCH INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize PowerGlitch for all elements with 'glitch' class
    if (typeof PowerGlitch !== 'undefined') {
        PowerGlitch.glitch('.glitch', {
            playMode: 'hover',
            createContainers: true,
            hideOverflow: false,
            timing: {
                duration: 1000,
                iterations: 1
            },
            glitchTimeSpan: {
                start: 0.3,
                end: 0.8
            },
            shake: {
                velocity: 20,
                amplitudeX: 0.3,
                amplitudeY: 0.3
            },
            slice: {
                count: 8,
                velocity: 20,
                minHeight: 0.03,
                maxHeight: 0.2,
                hueRotate: true
            }
        });
        
        // Initialize PowerGlitch for dropdown menu items and project buttons
        PowerGlitch.glitch('.nav-menu a, .showcase-toggle, .project-box', {
            playMode: 'hover',
            createContainers: true,
            hideOverflow: false,
            timing: {
                duration: 800,
                iterations: 1
            },
            glitchTimeSpan: {
                start: 0.2,
                end: 0.6
            },
            shake: {
                velocity: 15,
                amplitudeX: 0.15,
                amplitudeY: 0.15
            },
            slice: {
                count: 4,
                velocity: 15,
                minHeight: 0.02,
                maxHeight: 0.1,
                hueRotate: true
            }
        });
        
        // Initialize PowerGlitch for contact form submit button
        PowerGlitch.glitch('.submit-btn', {
            playMode: 'hover',
            createContainers: true,
            hideOverflow: false,
            timing: {
                duration: 600,
                iterations: 1
            },
            glitchTimeSpan: {
                start: 0.2,
                end: 0.5
            },
            shake: {
                velocity: 12,
                amplitudeX: 0.1,
                amplitudeY: 0.1
            },
            slice: {
                count: 3,
                velocity: 12,
                minHeight: 0.01,
                maxHeight: 0.08,
                hueRotate: true
            }
        });
        
        // Initialize PowerGlitch for footer GitHub button
        PowerGlitch.glitch('.footer-github-btn', {
            playMode: 'hover',
            createContainers: true,
            hideOverflow: false,
            timing: {
                duration: 500,
                iterations: 1
            },
            glitchTimeSpan: {
                start: 0.2,
                end: 0.4
            },
            shake: {
                velocity: 10,
                amplitudeX: 0.08,
                amplitudeY: 0.08
            },
            slice: {
                count: 2,
                velocity: 10,
                minHeight: 0.01,
                maxHeight: 0.06,
                hueRotate: true
            }
        });
    }
});

// ===== DRAGGABLE WINDOWS =====
class WindowManager {
    constructor() {
        this.windows = document.querySelectorAll('.window');
        this.activeWindow = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.windows.forEach(window => {
            this.makeDraggable(window);
            this.addWindowControls(window);
        });
    }
    
    makeDraggable(windowElement) {
        const header = windowElement.querySelector('.window-header');
        
        header.addEventListener('mousedown', (e) => {
            windowElement.style.zIndex = 1000;
            
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = parseInt(windowElement.style.left) || 0;
            const startTop = parseInt(windowElement.style.top) || 0;
            
            function onMouseMove(e) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                const newLeft = startLeft + deltaX;
                const newTop = startTop + deltaY;
                
                // Keep within bounds
                const maxLeft = window.innerWidth - windowElement.offsetWidth;
                const maxTop = window.innerHeight - windowElement.offsetHeight;
                
                windowElement.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
                windowElement.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
            }
            
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            
            e.preventDefault();
        });
    }
    
    
    addWindowControls(window) {
        const minimizeBtn = window.querySelector('.minimize');
        const maximizeBtn = window.querySelector('.maximize');
        const closeBtn = window.querySelector('.close');
        
        minimizeBtn.addEventListener('click', () => {
            window.classList.toggle('minimized');
        });
        
        maximizeBtn.addEventListener('click', () => {
            window.classList.toggle('maximized');
            if (window.classList.contains('maximized')) {
                maximizeBtn.textContent = '❐';
            } else {
                maximizeBtn.textContent = '❐–¡';
            }
        });
        
        closeBtn.addEventListener('click', () => {
            window.classList.add('closed');
        });
    }
}

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetWindow = document.querySelector(targetId + '-window');
            
            if (targetWindow) {
                targetWindow.classList.remove('closed', 'minimized', 'maximized');
                targetWindow.style.zIndex = 1000;
                
                // Only reposition if window is closed or has no position
                if (!targetWindow.style.left || targetWindow.style.left === '0px') {
                    targetWindow.style.left = '100px';
                    targetWindow.style.top = '100px';
                }
            }
        });
        });
        
        // Random periodic glitch for LinkedIn button
        function randomLinkedInGlitch() {
            PowerGlitch.glitch('.linkedin-button', {
                playMode: 'always',
                createContainers: true,
                hideOverflow: false,
                timing: { duration: 800, iterations: 1 },
                glitchTimeSpan: { start: 0.3, end: 0.7 },
                shake: { velocity: 15, amplitudeX: 0.2, amplitudeY: 0.2 },
                slice: { count: 6, velocity: 15, minHeight: 0.02, maxHeight: 0.15, hueRotate: true }
            });
            
            // Schedule next glitch at random interval (1-4 seconds)
            const nextInterval = Math.random() * 3000 + 1000;
            setTimeout(randomLinkedInGlitch, nextInterval);
        }
        
        // Random periodic glitch for GitHub button
        function randomGitHubGlitch() {
            PowerGlitch.glitch('.github-button', {
                playMode: 'always',
                createContainers: true,
                hideOverflow: false,
                timing: { duration: 800, iterations: 1 },
                glitchTimeSpan: { start: 0.3, end: 0.7 },
                shake: { velocity: 15, amplitudeX: 0.2, amplitudeY: 0.2 },
                slice: { count: 6, velocity: 15, minHeight: 0.02, maxHeight: 0.15, hueRotate: true }
            });
            
            // Schedule next glitch at random interval (1.5-5 seconds)
            const nextInterval = Math.random() * 3500 + 1500;
            setTimeout(randomGitHubGlitch, nextInterval);
        }
        
        // Name glitch after intro animation finishes (one-time)
        setTimeout(() => {
            PowerGlitch.glitch('h1.glitch', {
                playMode: 'always',
                createContainers: true,
                hideOverflow: false,
                timing: { duration: 1500, iterations: 1 },
                glitchTimeSpan: { start: 0.2, end: 0.8 },
                shake: { velocity: 25, amplitudeX: 0.4, amplitudeY: 0.4 },
                slice: { count: 10, velocity: 25, minHeight: 0.05, maxHeight: 0.3, hueRotate: true }
            });
        }, 5000); // Wait 5 seconds for intro animation to complete
        
  
        
        // Start random glitching after initial delay
        setTimeout(randomLinkedInGlitch, Math.random() * 2000 + 1000); // 1-3 seconds
        setTimeout(randomGitHubGlitch, Math.random() * 2000 + 1500); // 1.5-3.5 seconds
        
        // Initialize window manager
    new WindowManager();
    
    // Mobile-specific behavior
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable dragging on mobile for better UX
        document.querySelectorAll('.window').forEach(window => {
            window.style.cursor = 'default';
            window.style.position = 'relative';
            window.style.left = 'auto';
            window.style.top = 'auto';
            window.style.transform = 'none';
        });
        
        // Mobile touch support
        if ('ontouchstart' in window) {
            document.querySelectorAll('.window-header').forEach(header => {
                header.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                });
            });
        }
        
        // Mobile navigation disabled - no navigation toggle on mobile
        
        // Mobile project showcase
        const showcaseToggle = document.querySelector('.showcase-toggle');
        const projectsContainer = document.querySelector('.projects-container');
        
        if (showcaseToggle && projectsContainer) {
            showcaseToggle.addEventListener('click', (e) => {
                e.preventDefault();
                projectsContainer.classList.toggle('active');
            });
            
            // Close projects when clicking outside
            document.addEventListener('click', (e) => {
                if (!projectsContainer.contains(e.target) && !showcaseToggle.contains(e.target)) {
                    projectsContainer.classList.remove('active');
                }
            });
        }
    }
});

// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Create mailto link (you can replace this with actual form submission)
            const mailtoLink = `mailto:me@mateistoica.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your message! Your email client should open with a pre-filled message.');
            
            // Reset form
            contactForm.reset();
        });
    }
});