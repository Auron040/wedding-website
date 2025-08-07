// Language data - will be loaded from JSON files
let translations = {};

// Current language
let currentLang = 'de';

// Wedding date
const weddingDate = new Date('2026-09-19T15:00:00');

// RSVP Configuration
const RSVP_CONFIG = {
    // Set your webhook URL here (e.g., Netlify Forms, Formspree, etc.)
    submitUrl: 'https://webhook.site/ca946e5b-edf7-46ae-bab9-d5c7f7e867fd', // Leave empty to use default alert behavior
    // Alternative: 'https://formspree.io/f/your-form-id'
    // Alternative: 'https://your-webhook-url.com/rsvp'
    method: 'POST'
};

// toggleCard function is now defined in HTML head for immediate availability

// Load translations from JSON files
async function loadTranslations() {
    try {
        const [deResponse, ruResponse] = await Promise.all([
            fetch('locales/de.json'),
            fetch('locales/ru.json')
        ]);

        translations.de = await deResponse.json();
        translations.ru = await ruResponse.json();
        console.log('Translations loaded successfully');
        console.log('DE wine-joy-translation:', translations.de['wine-joy-translation']);
        console.log('RU wine-joy-translation:', translations.ru['wine-joy-translation']);
    } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback translations
        translations = {
            de: {
                'bride-groom-names': 'Fabian & Anastasia',
                'wedding-date': '19. September 2026',
                'countdown-days': 'Tage',
                'countdown-hours': 'Stunden',
                'countdown-minutes': 'Minuten',
                'countdown-seconds': 'Sekunden',
                'countdown-until': 'bis zur Hochzeit'
            },
            ru: {
                'bride-groom-names': 'Фабиан и Анастасия',
                'wedding-date': '19 сентября 2026',
                'countdown-days': 'дней',
                'countdown-hours': 'часов',
                'countdown-minutes': 'минут',
                'countdown-seconds': 'секунд',
                'countdown-until': 'до свадьбы'
            }
        };
        console.log('Using fallback translations');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async function () {
    console.log('DOM loaded, initializing...');

    // Load translations first
    await loadTranslations();

    // Set up language switcher
    const langDe = document.getElementById('lang-de');
    const langRu = document.getElementById('lang-ru');

    if (langDe && langRu) {
        langDe.addEventListener('click', () => switchLanguage('de'));
        langRu.addEventListener('click', () => switchLanguage('ru'));
        console.log('Language switchers set up');
    }

    // Initialize with German
    switchLanguage('de');

    // Start countdown
    console.log('Starting countdown...');
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Handle RSVP form
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleRSVP);
        console.log('RSVP form handler set up');
    }

    // Start portrait flip animation
    startPortraitFlip();

    // Initialize background images
    initBackgroundImages();

    // Test if cards are clickable
    console.log('Event cards ready with onclick handlers');
    console.log('toggleCard function available:', typeof window.toggleCard);
});

// Check for image format and set background
function setBackgroundImage(element, baseName) {
    const formats = ['jpg', 'png'];

    // Try JPG first, then PNG
    const img = new Image();
    img.onload = function () {
        element.style.backgroundImage = `url('assets/images/${baseName}.jpg')`;
    };
    img.onerror = function () {
        // If JPG fails, try PNG
        const imgPng = new Image();
        imgPng.onload = function () {
            element.style.backgroundImage = `url('assets/images/${baseName}.png')`;
        };
        imgPng.onerror = function () {
            console.log(`Neither ${baseName}.jpg nor ${baseName}.png found`);
        };
        imgPng.src = `assets/images/${baseName}.png`;
    };
    img.src = `assets/images/${baseName}.jpg`;
}

// Initialize background images
function initBackgroundImages() {
    const ceremonyBg = document.querySelector('.ceremony-bg');
    const receptionBg = document.querySelector('.reception-bg');

    if (ceremonyBg) {
        setBackgroundImage(ceremonyBg, 'ceremony-bg');
    }

    if (receptionBg) {
        setBackgroundImage(receptionBg, 'reception-bg');
    }
}

// Function is now defined at the top of the file

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate.getTime() - now;

    console.log('Updating countdown - Distance:', distance);

    // Get countdown elements
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.error('Countdown elements not found');
        return;
    }

    if (distance < 0) {
        // Wedding has passed
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minutesEl.textContent = '0';
        secondsEl.textContent = '0';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
}

function switchLanguage(lang) {
    currentLang = lang;

    // Update button states
    const langDe = document.getElementById('lang-de');
    const langRu = document.getElementById('lang-ru');

    langDe.className = lang === 'de'
        ? 'px-3 py-1 rounded text-sm font-medium text-white shadow-md'
        : 'px-3 py-1 rounded text-sm font-medium hover:shadow-md transition-all';

    langRu.className = lang === 'ru'
        ? 'px-3 py-1 rounded text-sm font-medium text-white shadow-md'
        : 'px-3 py-1 rounded text-sm font-medium hover:shadow-md transition-all';

    // Apply colors via style for better control
    langDe.style.backgroundColor = lang === 'de' ? '#6B8E5A' : 'transparent';
    langDe.style.color = lang === 'de' ? 'white' : '#2F2F2F';

    langRu.style.backgroundColor = lang === 'ru' ? '#6B8E5A' : 'transparent';
    langRu.style.color = lang === 'ru' ? 'white' : '#2F2F2F';

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all text content
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
            console.log(`Updated ${key} to: ${translations[lang][key]}`);
        } else {
            console.log(`Missing translation for key: ${key} in language: ${lang}`);
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

async function handleRSVP(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Get form data
    const formData = {
        name: form.querySelector('input[type="text"]').value.trim(),
        email: form.querySelector('input[type="email"]').value.trim(),
        attending: form.querySelector('select').value,
        message: form.querySelector('textarea').value.trim(),
        language: currentLang,
        timestamp: new Date().toISOString()
    };

    // Validation
    if (!formData.name || !formData.email) {
        const errorMessage = currentLang === 'de' 
            ? 'Bitte fülle alle Pflichtfelder aus.' 
            : 'Пожалуйста, заполните все обязательные поля.';
        showNotification(errorMessage, 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        const errorMessage = currentLang === 'de' 
            ? 'Bitte gib eine gültige E-Mail-Adresse ein.' 
            : 'Пожалуйста, введите действительный адрес электронной почты.';
        showNotification(errorMessage, 'error');
        return;
    }

    // Show loading state
    submitButton.disabled = true;
    const loadingText = currentLang === 'de' ? 'Wird gesendet...' : 'Отправляется...';
    submitButton.textContent = loadingText;
    submitButton.style.opacity = '0.7';

    try {
        if (RSVP_CONFIG.submitUrl) {
            // Send to configured URL
            const response = await fetch(RSVP_CONFIG.submitUrl, {
                method: RSVP_CONFIG.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const successMessage = currentLang === 'de'
                ? 'Vielen Dank für deine Antwort! Wir haben sie erhalten.'
                : 'Спасибо за ваш ответ! Мы получили его.';
            showNotification(successMessage, 'success');
            
            // Reset form on success
            form.reset();
        } else {
            // Fallback: Show data in a nice format
            const thankYouMessage = currentLang === 'de'
                ? `Vielen Dank, ${formData.name}! Deine Antwort wurde erfasst.\n\nTeilnahme: ${formData.attending}\nE-Mail: ${formData.email}${formData.message ? '\nNachricht: ' + formData.message : ''}\n\nBitte konfiguriere RSVP_CONFIG.submitUrl im JavaScript für automatische Übermittlung.`
                : `Спасибо, ${formData.name}! Ваш ответ был записан.\n\nУчастие: ${formData.attending}\nE-mail: ${formData.email}${formData.message ? '\nСообщение: ' + formData.message : ''}\n\nПожалуйста, настройте RSVP_CONFIG.submitUrl в JavaScript для автоматической отправки.`;
            
            showNotification(thankYouMessage, 'info');
        }

        console.log('RSVP Data:', formData);

    } catch (error) {
        console.error('RSVP submission error:', error);
        const errorMessage = currentLang === 'de'
            ? 'Es gab ein Problem beim Senden deiner Antwort. Bitte versuche es später erneut.'
            : 'Произошла ошибка при отправке вашего ответа. Пожалуйста, попробуйте позже.';
        showNotification(errorMessage, 'error');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.opacity = '1';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.rsvp-notification');
    existingNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = 'rsvp-notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md';
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.style.cssText = `
        animation: slideInRight 0.3s ease-out;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.4;
        white-space: pre-line;
    `;
    
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.className = 'ml-2 text-xl font-bold opacity-70 hover:opacity-100';
    closeBtn.onclick = () => notification.remove();
    notification.appendChild(closeBtn);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Portrait flip animation
function startPortraitFlip() {
    console.log('Initializing portrait flip...');

    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const fabianFlip = document.getElementById('fabian-flip');
        const anastasiaFlip = document.getElementById('anastasia-flip');

        console.log('Fabian flip element:', fabianFlip);
        console.log('Anastasia flip element:', anastasiaFlip);

        if (!fabianFlip || !anastasiaFlip) {
            console.error('Portrait flip elements not found!');
            return;
        }

        let isFlipped = false;

        function flipPortraits() {
            isFlipped = !isFlipped;

            console.log('Flipping portraits to:', isFlipped ? 'Adult' : 'Child');

            if (isFlipped) {
                fabianFlip.style.transform = 'rotateY(180deg)';
                anastasiaFlip.style.transform = 'rotateY(180deg)';
            } else {
                fabianFlip.style.transform = 'rotateY(0deg)';
                anastasiaFlip.style.transform = 'rotateY(0deg)';
            }
        }

        // Test flip immediately
        console.log('Testing flip in 2 seconds...');
        setTimeout(() => {
            flipPortraits();
        }, 2000);

        // Flip every 5 seconds
        setInterval(flipPortraits, 5000);

        // Add click handlers for manual flip
        fabianFlip.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Fabian clicked!');
            flipPortraits();
        });

        anastasiaFlip.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Anastasia clicked!');
            flipPortraits();
        });

        console.log('Portrait flip animation started successfully!');
    }, 1000);
}

// Smooth scrolling for any future navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});