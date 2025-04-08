// Particles.js Configuration
const particlesConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#3498db"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#3498db",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };
  
  // Utility Functions
  const utils = {
      /**
       * Apply typewriter effect to an element
       * @param {HTMLElement} element - Target element 
       * @param {string} text - Text to type
       * @param {number} [speed=100] - Typing speed in milliseconds
       * @returns {Promise} - Resolves when typing is complete
       */
      typeWriter(element, text, speed = 100) {
          return new Promise(resolve => {
              let i = 0;
              element.textContent = '';
              
              const type = () => {
                  if (i < text.length) {
                      element.textContent += text.charAt(i);
                      i++;
                      setTimeout(type, speed);
                  } else {
                      resolve();
                  }
              };
              
              type();
          });
      },
  
      /**
       * Calculate duration between start date and now
       * @param {Date} startDate - Start date
       * @returns {number} - Number of days
       */
      calculateDuration(startDate) {
          const now = new Date();
          const diffTime = Math.abs(now - startDate);
          return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      },
  
      /**
       * Load external script
       * @param {string} src - Script URL
       * @returns {Promise} - Resolves when script is loaded
       */
      loadScript(src) {
          return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = src;
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
          });
      }
  };
  
  // Intersection Observer Modules
  const observerModules = {
      /**
       * Initialize section visibility observer for animations
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
      },
  
      /**
       * Initialize circular progress animation observer
       */
      initCircularProgressObserver() {
          const circularProgress = document.querySelectorAll('.circular-progress');
          const observerCircular = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const progress = entry.target;
                      const value = progress.getAttribute('data-value');
                      const circle = progress.querySelector('circle:last-child');
                      const radius = circle.r.baseVal.value;
                      const circumference = 2 * Math.PI * radius;
                      
                      circle.style.strokeDasharray = circumference;
                      circle.style.strokeDashoffset = circumference - (value / 100) * circumference;
                      
                      // Animate the counter
                      const counter = progress.nextElementSibling;
                      let count = 0;
                      const interval = setInterval(() => {
                          if (count >= value) {
                              clearInterval(interval);
                          } else {
                              count++;
                              counter.textContent = `${count}%`;
                          }
                      }, 20);
                  }
              });
          }, { threshold: 0.1 });
  
          circularProgress.forEach(progress => {
              observerCircular.observe(progress);
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
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function(e) {
                  e.preventDefault();
                  
                  const targetId = this.getAttribute('href');
                  if (targetId === "#") return;
                  
                  const targetElement = document.querySelector(targetId);
                  
                  if (targetElement) {
                      // Close mobile menu if open
                      document.querySelector('.navbar').classList.remove('mobile-menu-open');
                      
                      // Scroll to element
                      targetElement.scrollIntoView({
                          behavior: 'smooth'
                      });
                  }
              });
          });
      },
  
      /**
       * Initialize mobile menu toggle
       */
      initMobileMenu() {
          const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
          if (mobileMenuToggle) {
              mobileMenuToggle.addEventListener('click', () => {
                  document.querySelector('.navbar').classList.toggle('mobile-menu-open');
              });
          }
      }
  };
  
  // Project Cards Module
  const projectsModule = {
      /**
       * Initialize project card flip functionality
       */
      initProjectCards() {
          const projectCards = document.querySelectorAll('.project-card');
          
          projectCards.forEach(card => {
              card.addEventListener('click', function() {
                  this.classList.toggle('flipped');
              });
          });
      }
  };
  
  // Form Validation Module
  const formModule = {
      /**
       * Initialize contact form validation
       */
      initFormValidation() {
          const contactForm = document.getElementById('contact-form');
          if (!contactForm) return;
  
          contactForm.addEventListener('submit', function(e) {
              e.preventDefault();
              
              const nameInput = document.getElementById('name');
              const emailInput = document.getElementById('email');
              const messageInput = document.getElementById('message');
              let isValid = true;
              
              // Reset validation styles
              [nameInput, emailInput, messageInput].forEach(input => {
                  input.classList.remove('error');
                  const errorElement = input.nextElementSibling;
                  if (errorElement && errorElement.classList.contains('error-message')) {
                      errorElement.remove();
                  }
              });
              
              // Validate name
              if (!nameInput.value.trim()) {
                  this.showError(nameInput, 'Name is required');
                  isValid = false;
              }
              
              // Validate email
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                  this.showError(emailInput, 'Valid email is required');
                  isValid = false;
              }
              
              // Validate message
              if (!messageInput.value.trim()) {
                  this.showError(messageInput, 'Message is required');
                  isValid = false;
              }
              
              if (isValid) {
                  // Show success message
                  const formSuccess = document.createElement('div');
                  formSuccess.className = 'form-success';
                  formSuccess.textContent = 'Message sent successfully!';
                  contactForm.appendChild(formSuccess);
                  
                  // Clear form
                  contactForm.reset();
                  
                  // Remove success message after 3 seconds
                  setTimeout(() => {
                      formSuccess.remove();
                  }, 3000);
              }
          });
          
          // Add show error method to form
          contactForm.showError = function(input, message) {
              input.classList.add('error');
              const errorMessage = document.createElement('div');
              errorMessage.className = 'error-message';
              errorMessage.textContent = message;
              input.parentNode.insertBefore(errorMessage, input.nextSibling);
          };
      }
  };
  
  // Dark Mode Module
  const darkModeModule = {
      /**
       * Initialize dark mode toggle functionality
       */
      init() {
          const darkModeToggle = document.getElementById('dark-mode-toggle');
          if (!darkModeToggle) return;
          
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
  
  // Study Duration Counter
  const counterModule = {
      /**
       * Initialize the study duration counter
       */
      initStudyDurationCounter() {
          const durationElement = document.getElementById('study-duration');
          if (!durationElement) return;
          
          // Assuming study started on August 1, 2023 (adjust as needed)
          const studyStartDate = new Date(2023, 7, 1);
          const duration = utils.calculateDuration(studyStartDate);
          
          // Animate the counter
          let count = 0;
          const interval = setInterval(() => {
              if (count >= duration) {
                  clearInterval(interval);
              } else {
                  count += Math.ceil(duration / 100);
                  if (count > duration) count = duration;
                  durationElement.textContent = count;
              }
          }, 30);
      }
  };
  
  // Timeline Animation Module
  const timelineModule = {
      /**
       * Initialize timeline animations
       */
      initTimeline() {
          const timelineItems = document.querySelectorAll('.timeline-item');
          
          const observerTimeline = new IntersectionObserver((entries) => {
              entries.forEach((entry, index) => {
                  if (entry.isIntersecting) {
                      // Add delay based on index for sequential animation
                      setTimeout(() => {
                          entry.target.classList.add('visible');
                      }, index * 200);
                  }
              });
          }, { threshold: 0.2 });
          
          timelineItems.forEach(item => {
              observerTimeline.observe(item);
          });
      }
  };
  
  // Particles Module
  const particlesModule = {
      /**
       * Initialize particles.js on hero section
       */
      async init() {
          try {
              // Load particles.js script
              await utils.loadScript('https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js');
              
              // Initialize particles
              if (window.particlesJS) {
                  window.particlesJS('particles-js', particlesConfig);
              }
          } catch (error) {
              console.error('Failed to load particles.js', error);
          }
      }
  };
  
  // Main Initialization Function
  async function initPortfolio() {
      try {
          // Initialize particles first (visual priority)
          await particlesModule.init();
          
          // Navbar and UI interactions
          navigationModule.initNavbarScrollEffect();
          navigationModule.initSmoothScrolling();
          navigationModule.initMobileMenu();
          
          // Initialize dark mode
          darkModeModule.init();
          
          // Set up observers for animations
          observerModules.initSectionObserver();
          observerModules.initSkillBarObserver();
          observerModules.initCircularProgressObserver();
          
          // Initialize project cards
          projectsModule.initProjectCards();
          
          // Initialize contact form validation
          formModule.initFormValidation();
          
          // Initialize timeline animations
          timelineModule.initTimeline();
          
          // Initialize counter for study duration
          counterModule.initStudyDurationCounter();
          
          // Typewriter effects
          const nameTitle = document.getElementById('name-title');
          if (nameTitle) {
              await utils.typeWriter(nameTitle, "Tenzin Kunga", 150);
              
              // After name is typed, animate the subtitle
              const subtitle = document.getElementById('hero-subtitle');
              if (subtitle) {
                  utils.typeWriter(subtitle, "Aspiring AI/ML Engineer | Creative Developer", 50);
              }
          }
          
          // Add typing animation to section titles when they become visible
          const sectionTitles = document.querySelectorAll('.section-title');
          const observerTitles = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.classList.add('typed');
                  }
              });
          }, { threshold: 0.5 });
          
          sectionTitles.forEach(title => {
              observerTitles.observe(title);
          });
          
      } catch (error) {
          console.error('Portfolio initialization error:', error);
      }
  }
  
  // Run initialization when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initPortfolio);