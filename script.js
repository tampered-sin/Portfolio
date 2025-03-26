// Utility Functions
const utils = {
    /**
     * Apply typewriter effect to an element
     * @param {HTMLElement} element - Target element 
     * @param {string} text - Text to type
     * @param {number} [speed=100] - Typing speed in milliseconds
     */
    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    },

    /**
     * Load custom font for social icons
     */
    loadIcons() {
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'social-icons';
                src: url('data:font/woff;charset=utf-8;base64,...') format('woff');
            }
            .social-icons a {
                font-family: 'social-icons';
            }
        `;
        document.head.appendChild(style);
    }
};

// Intersection Observer Modules
const observerModules = {
    /**
     * Initialize section visibility observer
     */
    initSectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    },

    /**
     * Initialize skill bar animation observer
     */
    initSkillBarObserver() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        const observerSkills = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const skillLevel = skillBar.getAttribute('data-skill-level');
                    skillBar.style.width = `${skillLevel}%`;
                }
            });
        }, { threshold: 0.1 });

        skillBars.forEach(bar => {
            observerSkills.observe(bar);
        });
    }
};

// Navigation and UI Interactions
const navigationModule = {
    /**
     * Add scroll effect to navbar
     */
    initNavbarScrollEffect() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    },

    /**
     * Initialize smooth scrolling for navbar links
     */
    initSmoothScrolling() {
        document.querySelectorAll('.navbar-links a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// Dark Mode Module
const darkModeModule = {
    /**
     * Initialize dark mode toggle functionality
     */
    init() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        // Check for saved dark mode preference
        if (localStorage.getItem('dark-mode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to local storage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.removeItem('dark-mode');
            }
        });
    }
};

// Main Initialization Function
function initPortfolioScripts() {
    // Typewriter effect for name
    const nameTitle = document.getElementById('name-title');
    if (nameTitle) {
        utils.typeWriter(nameTitle, nameTitle.textContent);
    }

    // Load social icons
    utils.loadIcons();

    // Initialize observers
    observerModules.initSectionObserver();
    observerModules.initSkillBarObserver();

    // Initialize navigation
    navigationModule.initNavbarScrollEffect();
    navigationModule.initSmoothScrolling();

    // Initialize dark mode
    darkModeModule.init();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPortfolioScripts);