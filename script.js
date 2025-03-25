
// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Skill Bar Animation
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


// Typewriter Effect for Name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typewriter effect to name
const nameTitle = document.getElementById('name-title');
typeWriter(nameTitle, nameTitle.textContent);

function loadIcons() {
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
loadIcons();

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navbar links
document.querySelectorAll('.navbar-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Dark Mode Toggle Script
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

// Previous scroll and smooth scrolling scripts remain the same
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navbar links
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