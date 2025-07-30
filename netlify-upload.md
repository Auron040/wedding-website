# 📤 Netlify Upload - Schritt für Schritt

## 🎯 Dateien für Upload vorbereiten

### Diese Dateien NICHT hochladen:
- ❌ `app.py` (Flask-Server nicht nötig)
- ❌ `run-server.bat` 
- ❌ `share-online.bat`
- ❌ `requirements.txt`
- ❌ `SERVER-ANLEITUNG.md`
- ❌ `INTERNET-ZUGRIFF.md`

### Diese Dateien HOCHLADEN:
- ✅ `index.html`
- ✅ `script.js`
- ✅ `locales/` (ganzer Ordner)
  - ✅ `de.json`
  - ✅ `ru.json`
- ✅ `assets/` (ganzer Ordner)
  - ✅ `images/` (alle deine Bilder)

## 🚀 Upload-Prozess

1. **Ordner erstellen:** `wedding-website-upload`
2. **Dateien kopieren:** Nur die ✅ Dateien von oben
3. **ZIP erstellen:** Ganzen Ordner zippen
4. **Netlify öffnen:** https://netlify.com
5. **Registrieren:** Kostenlos mit E-Mail
6. **"Sites" klicken**
7. **"Add new site" → "Deploy manually"**
8. **ZIP-Datei hineinziehen**
9. **Warten** (30 Sekunden)
10. **URL kopieren** und an Verlobte senden! 🎉

## 🔗 Beispiel-URL
Nach dem Upload bekommst du eine URL wie:
`https://wonderful-cupcake-abc123.netlify.app`

Diese URL funktioniert für immer und von überall! 🌍

## 💡 Bonus-Tipps

### Custom URL:
- In Netlify Settings → "Change site name"
- Z.B. `fabian-anastasia-wedding.netlify.app`

### Passwort-Schutz:
- Settings → "Access control" → "Password protection"
- Nur für geladene Gäste zugänglich

### Updates:
- Einfach neue ZIP-Datei hochladen
- Überschreibt automatisch die alte Version