# Wedding Website - Fabian & Anastasia

A beautiful, multilingual wedding invitation website with German and Russian language support.

## Features

- 🎨 Beautiful, responsive design with elegant animations
- 🌍 Multilingual support (German/Russian)
- ⏰ Live countdown timer to the wedding date
- 📱 Mobile-friendly responsive layout
- 💌 RSVP functionality
- 🖼️ Interactive photo galleries
- 🎭 Animated portrait flipping effects

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- Google Fonts (Dancing Script, Playfair Display, Great Vibes, Montserrat)

## Deployment

This website is automatically deployed to GitHub Pages using GitHub Actions.

### Manual Setup for GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The website will be automatically deployed on every push to the main branch

### RSVP Configuration

To enable RSVP functionality, edit the `RSVP_CONFIG` in `script.js`:

```javascript
const RSVP_CONFIG = {
    submitUrl: 'YOUR_WEBHOOK_URL_HERE',
    method: 'POST'
};
```

See `rsvp-config.md` for detailed setup instructions.

## Local Development

Simply open `index.html` in your browser or serve it with a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## Wedding Details

- **Date**: September 19, 2026
- **Ceremony**: 15:00 at Kvareli Lake Resort
- **Reception**: 18:00 at Kvareli Lake Resort
- **Location**: Kvareli, Kakheti, Georgia

## License

This is a personal wedding website. Please respect the privacy of the couple.