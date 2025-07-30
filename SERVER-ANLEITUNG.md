# 🚀 Flask Server für die Hochzeitswebsite

Diese Anleitung zeigt dir, wie du den Flask-Server startest, um deine Hochzeitswebsite zu hosten.

## 📋 Voraussetzungen

### Python installieren:
1. Lade Python von https://python.org herunter
2. Installiere Python (achte darauf, "Add to PATH" anzuhaken)
3. Öffne die Kommandozeile und teste: `python --version`

### Flask installieren:
```bash
pip install flask
```

Oder verwende die requirements.txt:
```bash
pip install -r requirements.txt
```

## 🎯 Server starten

### Option 1: Einfach (Windows)
Doppelklicke auf `run-server.bat`

### Option 2: Kommandozeile
```bash
python app.py
```

## 🌐 Website aufrufen

Nach dem Start siehst du diese Meldungen:
```
🎉 Wedding Invitation Server Starting...
📱 Access your website at:
   Local:    http://localhost:5000
   Network:  http://0.0.0.0:5000
💡 Press Ctrl+C to stop the server
```

### Zugriff von verschiedenen Geräten:

**🖥️ Auf deinem Computer:**
- http://localhost:5000

**📱 Von anderen Geräten (Handy, Tablet):**
1. Finde deine IP-Adresse:
   - Windows: `ipconfig` in der Kommandozeile
   - Suche nach "IPv4-Adresse" (z.B. 192.168.1.100)
2. Auf anderen Geräten: http://[DEINE-IP]:5000
   - Beispiel: http://192.168.1.100:5000

## 🔧 Features des Servers

- **Auto-Reload:** Änderungen an Dateien werden automatisch übernommen
- **Netzwerk-Zugriff:** Andere können von ihren Geräten zugreifen
- **Static Files:** Alle Bilder, CSS, JS werden korrekt serviert
- **Debug-Modus:** Hilfreich für Entwicklung

## 📱 Deiner Verlobten zeigen

1. **Starte den Server** mit `python app.py`
2. **Teile die URL:**
   - Lokal: http://localhost:5000
   - Netzwerk: http://[DEINE-IP]:5000
3. **Sie kann es auf ihrem Handy/Computer öffnen**

## 🛑 Server stoppen

Drücke `Ctrl+C` in der Kommandozeile

## 🎨 Live-Änderungen

Der Server lädt automatisch neu, wenn du Änderungen machst:
- HTML, CSS, JavaScript
- Bilder hinzufügen/ändern
- Übersetzungen anpassen

## 🌍 Für Internet-Zugriff

Wenn du die Website im Internet verfügbar machen möchtest:

### Kostenlose Optionen:
- **Netlify:** Drag & Drop Upload
- **Vercel:** GitHub Integration
- **GitHub Pages:** Kostenlos für öffentliche Repos

### Einfacher Upload:
1. Alle Dateien in einen Ordner
2. Auf Netlify.com hochladen
3. Automatische URL erhalten

## ❓ Fehlerbehebung

**"Flask not found":**
```bash
pip install flask
```

**"Port already in use":**
- Ändere Port in app.py: `port=5001`

**Andere Geräte können nicht zugreifen:**
- Firewall-Einstellungen prüfen
- IP-Adresse korrekt verwenden

**Bilder werden nicht angezeigt:**
- Bilder in `assets/images/` Ordner legen
- Dateinamen exakt wie in BILDER-ANLEITUNG.md

## 💡 Tipps

- **Teste zuerst lokal** bevor du es teilst
- **Verwende dein Handy** um die mobile Ansicht zu testen
- **Lade Bilder hoch** für den vollen Effekt
- **Probiere beide Sprachen** (DE/RU) aus

---
🎉 **Viel Spaß beim Zeigen eurer wunderschönen Hochzeitswebsite!**