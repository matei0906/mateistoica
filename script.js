// ===== ANIMATION JAVASCRIPT =====

// Configuration
const textToType = "./MateiStoica";
const typingSpeed = 100; // milliseconds per character
const cursorBlinkTime = 800; // how long cursor blinks before typing
const fadeDelay = 300; // delay before fade starts after all typing completes

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
addEventListener('load', function() {
    // Check if mobile device
    const isMobile = document.documentElement.clientWidth <= 768;
    
    // Check if animation has already been shown in this session
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    
    if (isMobile || hasSeenAnimation) {
        // Skip animation on mobile or if already seen - show content immediately
        document.body.classList.remove('loading');
        document.getElementById('main-content').classList.add('visible');
        const animationScreen = document.getElementById('terminal-animation');
        if (animationScreen) {
            animationScreen.remove();
        }
    } else {
        // Run animation on desktop (first time only)
        startAnimation();
        // Mark that animation has been seen in this session
        sessionStorage.setItem('hasSeenAnimation', 'true');
    }
});

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

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
        
        // Name glitch after intro animation finishes
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
        
    // Mobile-specific behavior
    const isMobile = document.documentElement.clientWidth <= 768;
    
    if (isMobile) {
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
    const successMessage = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('.submit-btn');
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            
            // Submit form data to Formspree using fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Optional: Hide success message and show form again after 5 seconds
                    setTimeout(() => {
                        contactForm.style.display = 'block';
                        successMessage.style.display = 'none';
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
            });
        });
    }
});

// ===== PROJECTS 3D GRID SCROLL TILT (from projects.html) =====
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('grid3d');
    const scene = document.getElementById('sceneWrapper');
    const rows = document.querySelectorAll('.grid-row');

    if (!grid || !scene || !rows.length) return;

    const START_X = 72;
    const END_X = 0;
    const START_Y = -8;
    const END_Y = 0;
    const ROW_OFFSET = 120;

    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function updateTilt() {
        const rect = scene.getBoundingClientRect();
        const winH = window.innerHeight;
        const raw = 1 - rect.top / winH;
        const progress = Math.min(1, Math.max(0, raw));
        const t = easeInOut(progress);

        const rotX = START_X + (END_X - START_X) * t;
        const rotY = START_Y + (END_Y - START_Y) * t;
        grid.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

        const driftAmount = ROW_OFFSET * (1 - t);
        rows.forEach((row) => {
            const dir = parseFloat(row.dataset.dir) || 1;
            row.style.transform = `translateX(${dir * driftAmount}px)`;
        });
    }

    window.addEventListener('scroll', updateTilt, { passive: true });
    updateTilt();
});