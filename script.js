// Language data - will be loaded from JSON files
let translations = {};

// Current language
let currentLang = 'de';

// Wedding date
const weddingDate = new Date('2026-09-19T15:00:00');

// RSVP Configuration
const RSVP_CONFIG = {
    // EmailJS configuration for sending emails
    emailJSServiceId: 'service_jcbhohw', // Your EmailJS service ID
    emailJSTemplateId: 'template_7wj01li', // Template sends all RSVPs to organizers
    emailJSUserId: 'YemPicATBzzyZ0TYD', // Your EmailJS public key
    recipientEmail: 'auron212@gmx.net',
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

    // Initialize map fallback detection
    initMapFallback();

    // Initialize date fields
    initDateFields();
});

// Map fallback functionality
function initMapFallback() {
    const iframe = document.querySelector('iframe[title="Kvareli Lake Resort Location"]');
    const fallback = document.getElementById('map-fallback');
    
    if (iframe && fallback) {
        // Show fallback if iframe fails to load after 5 seconds
        setTimeout(() => {
            iframe.onerror = () => {
                iframe.style.display = 'none';
                fallback.style.display = 'flex';
            };
        }, 5000);
    }
}

// Initialize date fields with German format (dd.mm.yyyy)
function initDateFields() {
    const arrivalDisplay = document.querySelector('input[name="arrival-date-display"]');
    const departureDisplay = document.querySelector('input[name="departure-date-display"]');
    const arrivalHidden = document.querySelector('input[name="arrival-date"]');
    const departureHidden = document.querySelector('input[name="departure-date"]');
    
    if (arrivalDisplay && departureDisplay && arrivalHidden && departureHidden) {
        // Add input formatting and validation
        [arrivalDisplay, departureDisplay].forEach(input => {
            // Format input as user types
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                
                // Add dots automatically
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '.' + value.substring(2);
                }
                if (value.length >= 5) {
                    value = value.substring(0, 5) + '.' + value.substring(5, 9);
                }
                
                e.target.value = value;
            });
            
            // Validate and convert on blur
            input.addEventListener('blur', function(e) {
                const germanDate = e.target.value;
                const isValid = validateAndConvertGermanDate(germanDate, e.target);
                
                if (isValid && e.target === arrivalDisplay) {
                    // Auto-adjust departure if needed
                    autoAdjustDeparture();
                }
            });
        });
        
        // Auto-adjust departure date when arrival changes
        function autoAdjustDeparture() {
            const arrivalISO = arrivalHidden.value;
            const departureISO = departureHidden.value;
            
            if (arrivalISO) {
                const arrivalDate = new Date(arrivalISO);
                const departureDate = new Date(departureISO);
                
                // If departure is before or same as arrival, set it to next day
                if (!departureISO || departureDate <= arrivalDate) {
                    const nextDay = new Date(arrivalDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    
                    const newDepartureISO = nextDay.toISOString().split('T')[0];
                    const newDepartureGerman = formatDateToGerman(newDepartureISO);
                    
                    departureHidden.value = newDepartureISO;
                    departureDisplay.value = newDepartureGerman;
                }
            }
        }
    }
}

// Validate and convert German date format (dd.mm.yyyy) to ISO (yyyy-mm-dd)
function validateAndConvertGermanDate(germanDate, inputElement) {
    const datePattern = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = germanDate.match(datePattern);
    
    if (!match) {
        if (germanDate.length > 0) {
            inputElement.style.borderColor = '#ef4444'; // Red border for invalid
            return false;
        }
        return true; // Empty is okay
    }
    
    const day = parseInt(match[1]);
    const month = parseInt(match[2]);
    const year = parseInt(match[3]);
    
    // Basic validation
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2026 || year > 2027) {
        inputElement.style.borderColor = '#ef4444'; // Red border
        return false;
    }
    
    // Create date and validate it exists
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        inputElement.style.borderColor = '#ef4444'; // Red border
        return false;
    }
    
    // Convert to ISO format and store in hidden field
    const isoDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    // Find corresponding hidden field
    const hiddenFieldName = inputElement.name.replace('-display', '');
    const hiddenField = document.querySelector(`input[name="${hiddenFieldName}"]`);
    if (hiddenField) {
        hiddenField.value = isoDate;
    }
    
    // Reset border color
    inputElement.style.borderColor = 'var(--dusty-rose)';
    return true;
}

// Convert ISO date (yyyy-mm-dd) to German format (dd.mm.yyyy)
function formatDateToGerman(isoDate) {
    if (!isoDate) return '';
    
    const parts = isoDate.split('-');
    if (parts.length !== 3) return '';
    
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

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

    // Get all form data including new fields
    const formData = {
        name: form.querySelector('input[name="name"]').value.trim(),
        email: form.querySelector('input[name="email"]').value.trim(),
        attending: form.querySelector('select[name="attending"]').value,
        message: form.querySelector('textarea[name="message"]').value.trim(),
        alcohol: Array.from(form.querySelectorAll('input[name="alcohol[]"]:checked')).map(cb => cb.value),
        alcoholOther: form.querySelector('input[name="alcohol-other"]').value.trim(),
        childcare: form.querySelector('input[name="childcare"]:checked')?.value || '',
        arrivalDate: form.querySelector('input[name="arrival-date"]').value,
        departureDate: form.querySelector('input[name="departure-date"]').value,
        language: currentLang,
        timestamp: new Date().toISOString()
    };

    // Validation
    if (!formData.name || !formData.email || !formData.attending) {
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
        // Prepare email content
        const emailContent = `
Neue RSVP-Anmeldung für die Hochzeit:

Name: ${formData.name}
E-Mail: ${formData.email}
Teilnahme: ${formData.attending}
Sprache: ${formData.language}

Alkoholpräferenzen: ${formData.alcohol.join(', ')}${formData.alcoholOther ? ` (Andere: ${formData.alcoholOther})` : ''}
Kinderbetreuung: ${formData.childcare || 'Nicht angegeben'}
Ankunft: ${formData.arrivalDate || 'Nicht angegeben'}
Abreise: ${formData.departureDate || 'Nicht angegeben'}

Nachricht: ${formData.message || 'Keine Nachricht'}

Zeitstempel: ${formData.timestamp}
        `;

        // Prepare parameters for organizer notification
        const organizerParams = {
            from_name: formData.name,
            from_email: formData.email,
            attending_status: formData.attending,
            language: formData.language,
            alcohol_preferences: formData.alcohol.join(', ') || 'Keine Angabe',
            alcohol_other: formData.alcoholOther || '',
            childcare_needed: formData.childcare || 'Nicht angegeben',
            arrival_date: formData.arrivalDate || 'Nicht angegeben',
            departure_date: formData.departureDate || 'Nicht angegeben',
            message: formData.message || '',
            timestamp: formData.timestamp,
            reply_to: formData.email
        };

        // Send notification email to organizers using existing template
        await emailjs.send(RSVP_CONFIG.emailJSServiceId, RSVP_CONFIG.emailJSTemplateId, organizerParams);

        const successMessage = currentLang === 'de'
            ? 'Vielen Dank für deine Anmeldung! Wir haben sie erhalten.'
            : 'Спасибо за регистрацию! Мы получили её.';
        showNotification(successMessage, 'success');
        
        // Reset form on success
        form.reset();

        console.log('RSVP Data sent:', formData);

    } catch (error) {
        console.error('RSVP submission error:', error);
        const errorMessage = currentLang === 'de'
            ? 'Es gab ein Problem beim Senden deiner Anmeldung. Bitte versuche es später erneut oder kontaktiere uns direkt.'
            : 'Произошла ошибка при отправке регистрации. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.';
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