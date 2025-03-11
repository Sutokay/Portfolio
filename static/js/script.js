document.addEventListener('DOMContentLoaded', function() {
    initTypeEffect();
    generateStars();
    createBackgroundGlows();
    addSmoothScrolling();
    initHighlightWords();
});

/**
 * Typing effect for the hero section
 * Creates a typewriter effect for the professional titles
 */
function initTypeEffect() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    // Get text array from data attribute or use default values
    let textArray = [];
    const dataAttribute = typingElement.getAttribute('data-texts');

    if (dataAttribute) {
        try {
            textArray = JSON.parse(dataAttribute);
        } catch (e) {
            console.error("Error parsing typing text array:", e);
            textArray = ["Backend Developer", "Software Engineer", "UI/UX Designer"];
        }
    } else {
        textArray = ["Backend Developer", "Software Engineer", "UI/UX Designer"];
    }

    // Clear any existing content to prevent double display
    typingElement.textContent = '';

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 600);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }

        const typingSpeed = isDeleting ? 60 : 100;
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

/**
 * Creates fixed background glows in specific locations
 * with varied colors for a vibrant space theme
 */
function createBackgroundGlows() {
    const decorationsContainer = document.getElementById('static-decorations');
    if (!decorationsContainer) return;

    // Define specific glow configurations
    const glowConfigurations = [
        {
            size: 1400,
            posX: 40,
            posY: -6,
            color: 'rgba(255, 130, 220, 0.25)',
            blur: 200
        },
        {
            size: 1500,
            posX: -40,
            posY: 30,
            color: 'rgba(120, 50, 200, 0.25)',
            blur: 220
        },
        {
            size: 1400,
            posX: 80,
            posY: 60,
            color: 'rgba(100, 180, 255, 0.25)',
            blur: 210
        },
        {
            size: 1300,
            posX: -20,
            posY: 100,
            color: 'rgba(255, 255, 255, 0.2)',
            blur: 200
        }
    ];

    // Create each glow with exact specifications
    glowConfigurations.forEach(config => {
        const glowSpot = document.createElement('div');
        glowSpot.classList.add('background-glow');

        glowSpot.style.width = config.size + 'px';
        glowSpot.style.height = config.size + 'px';
        glowSpot.style.left = config.posX + '%';
        glowSpot.style.top = config.posY + '%';
        glowSpot.style.backgroundColor = config.color;
        glowSpot.style.filter = `blur(${config.blur}px)`;

        decorationsContainer.appendChild(glowSpot);
    });
}

/**
 * Generates star elements for the space background
 * Creates a random pattern of stars with varying sizes and opacities
 */
function generateStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    const numberOfStars = 300;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Generate random properties for each star
        const sizeRand = Math.random();
        const size = sizeRand < 0.7
            ? (sizeRand * 1.0 + 0.2)
            : (sizeRand * 1.0 + 1.2);

        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        star.style.left = posX + '%';
        star.style.top = posY + '%';

        // Opacity based on size for a more natural look
        const opacity = size < 1.0
            ? (0.15 + Math.random() * 0.2)
            : (0.25 + Math.random() * 0.3);

        star.style.opacity = opacity;

        // Enhanced glow effect
        const glowIntensity = size < 1.0
            ? (opacity * 2).toFixed(1)
            : (opacity * 3.5).toFixed(1);

        star.style.boxShadow = `0 0 ${size * 2.5}px ${glowIntensity}px rgba(255, 255, 255, ${opacity * 1.3})`;

        // Make some stars blink
        if (Math.random() < 0.6) {
            star.classList.add('blinking');
            star.style.setProperty('--original-opacity', opacity);

            const blinkDuration = (4 + Math.random() * 6).toFixed(1) + 's';
            star.style.setProperty('--blink-duration', blinkDuration);
            star.style.animationDelay = (Math.random() * 10).toFixed(1) + 's';
        }

        starsContainer.appendChild(star);
    }
}

/**
 * Adds smooth scrolling behavior to navigation links
 */
function addSmoothScrolling() {
    const links = document.querySelectorAll('header nav a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top;
                const startPosition = window.pageYOffset;
                const distance = targetPosition;

                const duration = 520;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, scrollY);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Logo link for returning to home section
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Highlights specific words in the about section
 */
function initHighlightWords() {
    // Words to highlight
    const wordsToHighlight = [
        'backend developer', 'innovative', 'efficient', 'HTML',
        'Python', 'CSS', 'scalable', 'maintainable',
        'real-world problems'
    ];

    // Get all paragraphs in the about section
    const aboutParagraphs = document.querySelectorAll('.about-text p');

    // Flag to track if we've highlighted 'backend' already
    let backendHighlighted = false;

    aboutParagraphs.forEach(paragraph => {
        let html = paragraph.innerHTML;

        // First, handle the special "backend" word - only the first occurrence
        if (!backendHighlighted) {
            const backendRegex = new RegExp('\\bbackend\\b', 'i');
            if (backendRegex.test(html)) {
                html = html.replace(backendRegex, '<span class="highlight-word">backend</span>');
                backendHighlighted = true;
            }
        }

        // Then handle the rest of the words (all occurrences)
        wordsToHighlight.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            html = html.replace(regex, `<span class="highlight-word">${word}</span>`);
        });

        paragraph.innerHTML = html;
    });
}

/**
 * Copies the email address to clipboard and shows a notification
 */
function copyEmailToClipboard() {
    // The email you want users to copy
    const emailAddress = 'mathiasulfsryggen@gmail.com';

    // Copy to clipboard using the Clipboard API
    navigator.clipboard.writeText(emailAddress)
        .then(() => {
            showClipboardMessage();
        })
        .catch(err => {
            // Fallback for browsers that don't support Clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = emailAddress;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showClipboardMessage();
                } else {
                    console.error('Failed to copy email');
                }
            } catch (err) {
                console.error('Error copying email: ', err);
            }

            document.body.removeChild(textArea);
        });
}

/**
 * Shows the clipboard message notification
 */
function showClipboardMessage() {
    const message = document.getElementById('clipboard-message');
    if (message) {
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    }
}
