# 🌍 Internet-Zugriff für die Hochzeitswebsite

Diese Anleitung zeigt dir verschiedene Wege, wie deine Verlobte von überall auf der Welt auf eure Hochzeitswebsite zugreifen kann.

## 🚀 Schnelle & Einfache Lösungen (Empfohlen)

### 1. Netlify (Kostenlos & Einfach) ⭐
**Am einfachsten für statische Websites!**

1. **Gehe zu:** https://netlify.com
2. **Registriere dich** kostenlos
3. **Drag & Drop:** Ziehe deinen ganzen Website-Ordner auf die Netlify-Seite
4. **Fertig!** Du bekommst eine URL wie: `https://deine-hochzeit-abc123.netlify.app`

**Vorteile:**
- ✅ Kostenlos
- ✅ Automatische HTTPS
- ✅ Sehr schnell
- ✅ Keine technischen Kenntnisse nötig

### 2. Vercel (Kostenlos & Modern) ⭐
**Perfekt für moderne Websites!**

1. **Gehe zu:** https://vercel.com
2. **Registriere dich** mit GitHub/Google
3. **Upload:** Lade deine Dateien hoch
4. **Automatische URL:** z.B. `https://wedding-invitation.vercel.app`

### 3. GitHub Pages (Kostenlos)
**Wenn du GitHub verwendest:**

1. **Erstelle** ein GitHub Repository
2. **Upload** alle Website-Dateien
3. **Aktiviere** GitHub Pages in den Settings
4. **URL:** `https://deinusername.github.io/repository-name`

## 🏠 Von zu Hause aus (Router-Setup)

### Port-Forwarding (Fortgeschritten)
**Dein Flask-Server von außen erreichbar machen:**

1. **Router-Admin öffnen** (meist 192.168.1.1)
2. **Port-Forwarding einrichten:**
   - Interner Port: 5000
   - Externer Port: 5000
   - IP: Deine Computer-IP
3. **Deine öffentliche IP finden:** https://whatismyipaddress.com
4. **URL teilen:** `http://DEINE-ÖFFENTLICHE-IP:5000`

**⚠️ Sicherheitshinweise:**
- Nur temporär verwenden
- Firewall-Einstellungen beachten
- Nach dem Zeigen wieder deaktivieren

## ☁️ Cloud-Hosting (Kostenlos)

### 1. Heroku (Einfach)
```bash
# Heroku CLI installieren
# Dann:
heroku create deine-hochzeit-app
git push heroku main
```

### 2. Railway (Modern)
1. **Gehe zu:** https://railway.app
2. **GitHub verbinden**
3. **Deploy** mit einem Klick

## 📱 Tunnel-Services (Temporär)

### 1. ngrok (Sehr einfach) ⭐
**Perfekt zum schnellen Teilen!**

1. **Download:** https://ngrok.com
2. **Installieren** und registrieren
3. **Server starten:** `python app.py`
4. **Tunnel öffnen:** `ngrok http 5000`
5. **URL teilen:** z.B. `https://abc123.ngrok.io`

**Vorteile:**
- ✅ Sofort einsatzbereit
- ✅ HTTPS automatisch
- ✅ Temporär und sicher

### 2. localtunnel
```bash
npm install -g localtunnel
lt --port 5000 --subdomain deine-hochzeit
```

## 🎯 Empfohlener Workflow

### Für schnelles Zeigen (heute):
1. **ngrok verwenden:**
   ```bash
   # Terminal 1: Server starten
   python app.py
   
   # Terminal 2: Tunnel öffnen
   ngrok http 5000
   ```
2. **URL an Verlobte senden**
3. **Sie kann sofort zugreifen!**

### Für dauerhafte Lösung:
1. **Netlify verwenden:**
   - Alle Dateien in ZIP packen
   - Auf netlify.com hochladen
   - Permanente URL erhalten

## 📋 Schritt-für-Schritt: Netlify (Empfohlen)

### Vorbereitung:
1. **Alle Dateien sammeln:**
   ```
   wedding-website/
   ├── index.html
   ├── script.js
   ├── locales/
   │   ├── de.json
   │   └── ru.json
   └── assets/
       └── images/
           └── (deine Bilder)
   ```

2. **ZIP-Datei erstellen** (ohne app.py, da statisch)

### Upload:
1. **Gehe zu:** https://netlify.com
2. **"Sites" → "Add new site" → "Deploy manually"**
3. **ZIP-Datei hochziehen**
4. **Warten** (30 Sekunden)
5. **URL erhalten!** 🎉

### Anpassungen:
- **Custom Domain:** Eigene Domain verbinden
- **Password Protection:** Website mit Passwort schützen
- **Analytics:** Besucherstatistiken

## 🔒 Sicherheit & Privatsphäre

### Website schützen:
- **Netlify:** Password Protection aktivieren
- **Vercel:** Authentication hinzufügen
- **Eigener Server:** Basic Auth verwenden

### Temporäre Links:
- **ngrok:** Läuft nur solange dein Computer an ist
- **localtunnel:** Automatisch nach Inaktivität geschlossen

## 💡 Pro-Tipps

### Für die beste Erfahrung:
1. **Bilder optimieren** (unter 1MB pro Bild)
2. **Mobile testen** bevor du teilst
3. **Beide Sprachen** (DE/RU) testen
4. **Verschiedene Browser** testen

### Sharing-Tipps:
- **QR-Code erstellen** für einfachen Handy-Zugriff
- **Kurze URL** verwenden (bit.ly, tinyurl)
- **Screenshot senden** als Vorschau

## 🚀 Schnellstart-Befehle

### ngrok (Sofort):
```bash
# 1. Server starten
python app.py

# 2. Neues Terminal, ngrok starten
ngrok http 5000

# 3. URL aus ngrok-Output kopieren und teilen
```

### Netlify (Dauerhaft):
1. Alle Dateien außer `app.py` in ZIP packen
2. Auf netlify.com hochladen
3. URL teilen

## ❓ Welche Lösung wählen?

**🏃‍♂️ Schnell zeigen (heute):**
- **ngrok** - Sofort einsatzbereit

**🏠 Dauerhaft & Kostenlos:**
- **Netlify** - Am einfachsten

**👨‍💻 Technisch versiert:**
- **Vercel** oder **GitHub Pages**

**🔒 Privat & Sicher:**
- **Port-Forwarding** mit Firewall

---
💕 **Egal welche Methode - deine Verlobte wird die wunderschöne Website lieben!**