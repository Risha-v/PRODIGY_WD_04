// Typewriter effect
const typedTextSpan = document.querySelector('.typed-text');
const texts = [
    { text: 'cse student', color: '#f00' },
    { text: 'software engineer', color: '#0f0' },
    { text: 'full stack dev', color: '#00bfff' }
];
let currentTextIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < texts[currentTextIndex].text.length) {
        typedTextSpan.textContent += texts[currentTextIndex].text.charAt(charIndex);
        typedTextSpan.style.color = texts[currentTextIndex].color;
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = texts[currentTextIndex].text.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        currentTextIndex++;
        if (currentTextIndex >= texts.length) {
            currentTextIndex = 0;
        }
        typedTextSpan.style.color = texts[currentTextIndex].color;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 1000);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Section visibility
const sections = document.querySelectorAll('section');
let currentSection = null;

sections.forEach(function(section) {
    const sectionContent = section.querySelector('.section-content');
    const sectionText = section.querySelectorAll('.section-text');
    const projectOverlays = section.querySelectorAll('.project-overlay'); // Get project overlays

    // Show section content, text, and project overlays on click
    section.addEventListener('click', function() {
        showSectionContent(sectionContent, sectionText, projectOverlays, section);
    });

    // Show section content, text, and project overlays on hover
    section.addEventListener('mouseenter', function() {
        showSectionContent(sectionContent, sectionText, projectOverlays, section);
    });

    // Hide section content, text, and project overlays when cursor leaves the section
    section.addEventListener('mouseleave', function() {
        hideSectionContent(sectionContent, sectionText, projectOverlays, section);
    });
});

function showSectionContent(sectionContent, sectionText, projectOverlays, section) {
    if (currentSection && currentSection !== section) {
        hideSectionContent(currentSection.querySelector('.section-content'), currentSection.querySelectorAll('.section-text'), currentSection.querySelectorAll('.project-overlay'), currentSection);
    }
    currentSection = section;

    let opacity = 0.2;
    const opacityInterval = setInterval(function() {
        if (opacity >= 1) {
            clearInterval(opacityInterval);
        } else {
            sectionContent.style.opacity = opacity;
            sectionText.forEach(function(text) {
                text.style.opacity = opacity;
            });
            projectOverlays.forEach(function(overlay) {
                overlay.style.opacity = opacity;
            });
            opacity += 0.1;
        }
    }, 50); // Increase opacity every 50 milliseconds
}

function hideSectionContent(sectionContent, sectionText, projectOverlays, section) {
    if (currentSection === section) {
        currentSection = null;
    }

    sectionContent.style.opacity = 0;
    sectionText.forEach(function(text) {
        text.style.opacity = 0;
    });
    projectOverlays.forEach(function(overlay) {
        overlay.style.opacity = 0;
    });
}