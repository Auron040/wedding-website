# RSVP Konfiguration

## URL für RSVP-Daten konfigurieren

Um die RSVP-Daten automatisch zu versenden, öffne die Datei `script.js` und ändere die `RSVP_CONFIG` Einstellungen:

```javascript
const RSVP_CONFIG = {
    submitUrl: 'DEINE_URL_HIER', // Ersetze mit deiner Webhook-URL
    method: 'POST'
};
```

## Empfohlene Services:

### 1. Formspree (Einfach)
- Gehe zu https://formspree.io
- Erstelle ein kostenloses Konto
- Erstelle ein neues Formular
- Verwende die URL: `https://formspree.io/f/DEIN_FORM_ID`

### 2. Netlify Forms (Wenn auf Netlify gehostet)
- Füge `netlify` Attribut zum `<form>` Tag hinzu
- Netlify erkennt das Formular automatisch
- Verwende die URL: `/.netlify/functions/submit-form`

### 3. Webhook.site (Zum Testen)
- Gehe zu https://webhook.site
- Kopiere die generierte URL
- Verwende diese URL zum Testen

### 4. Eigener Server
- Erstelle einen Endpoint der POST-Requests akzeptiert
- Der Request enthält JSON-Daten mit: name, email, attending, message, language, timestamp

## Beispiel Webhook-Daten:

```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "attending": "yes",
  "message": "Freue mich sehr auf eure Hochzeit!",
  "language": "de",
  "timestamp": "2026-08-01T10:30:00.000Z"
}
```

## Ohne URL-Konfiguration:
Wenn keine URL konfiguriert ist, werden die Daten in einer schönen Benachrichtigung angezeigt und in der Browser-Konsole geloggt.