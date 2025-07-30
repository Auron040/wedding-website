// Language data - will be loaded from JSON files
let translations = {};

// Current language
let currentLang = 'de';

// Wedding date
const weddingDate = new Date('2026-09-19T15:00:00');

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
});

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

function handleRSVP(event) {
    event.preventDefault();

    // Get form data
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const attending = event.target.querySelector('select').value;
    const message = event.target.querySelector('textarea').value;

    // Here you would typically send this data to a server
    // For now, we'll just show an alert
    const thankYouMessage = currentLang === 'de'
        ? 'Vielen Dank für Ihre Antwort!'
        : 'Спасибо за ваш ответ!';

    alert(thankYouMessage);

    // Reset form
    event.target.reset();

    // Log the data (remove in production)
    console.log('RSVP Data:', { name, email, attending, message, language: currentLang });
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