# 📸 Bilder-Anleitung für die Hochzeitswebsite

Diese Datei zeigt dir alle Bild-Platzhalter auf der Website und welche Dateinamen du verwenden musst, damit die Bilder automatisch angezeigt werden.

## 📁 Ordner-Struktur
Alle Bilder müssen in den Ordner `assets/images/` gelegt werden.

**🎯 Insgesamt 9 Bilder:**

1. **`hero-background.png`** - Haupthintergrundbild
2. **`fabian-child.jpg`** - Fabians Kinderfoto (Flip-Animation)
3. **`fabian-adult.jpg`** - Fabians Erwachsenenfoto (Flip-Animation)
4. **`anastasia-child.jpg`** - Anastasias Kinderfoto (Flip-Animation)
5. **`anastasia-adult.jpg`** - Anastasias Erwachsenenfoto (Flip-Animation)
6. **`story-1.jpg`** - Erste Begegnung (2020)
7. **`story-2.jpg`** - Erstes Date (2021) 
8. **`story-3.jpg`** - Verlobung (2025)
9. **`story-4.jpg`** - Hochzeitstag (2026)

```
assets/
└── images/
    ├── hero-background.png
    ├── fabian-child.jpg
    ├── fabian-adult.jpg
    ├── anastasia-child.jpg
    ├── anastasia-adult.jpg
    ├── story-1.jpg
    ├── story-2.jpg
    ├── story-3.jpg
    └── story-4.jpg
```

## 🖼️ Bild-Platzhalter im Detail

### 1. Hero Section (Hauptbereich)
**📍 Hintergrundbild:**
- **Dateiname:** `hero-background.png`
- **Beschreibung:** Das große Hintergrundbild für den Hauptbereich
- **Format:** PNG oder JPG
- **Empfohlene Größe:** Mindestens 1920x1080px (Full HD)

**👤 Porträtfotos (Flip-Animation):**
- **Dateiname:** `fabian-child.jpg`
  - **Beschreibung:** Fabians Kinderfoto (wird zuerst gezeigt)
  - **Format:** JPG oder PNG
  - **Empfohlene Größe:** Quadratisch, mindestens 400x400px

- **Dateiname:** `fabian-adult.jpg`
  - **Beschreibung:** Fabians Erwachsenenfoto (wird nach 5 Sek. gezeigt)
  - **Format:** JPG oder PNG
  - **Empfohlene Größe:** Quadratisch, mindestens 400x400px

- **Dateiname:** `anastasia-child.jpg`
  - **Beschreibung:** Anastasias Kinderfoto (wird zuerst gezeigt)
  - **Format:** JPG oder PNG
  - **Empfohlene Größe:** Quadratisch, mindestens 400x400px

- **Dateiname:** `anastasia-adult.jpg`
  - **Beschreibung:** Anastasias Erwachsenenfoto (wird nach 5 Sek. gezeigt)
  - **Format:** JPG oder PNG
  - **Empfohlene Größe:** Quadratisch, mindestens 400x400px

### 2. "Unsere Geschichte" Timeline
**📖 Story-Fotos:**
- **Dateiname:** `story-1.jpg`
  - **Beschreibung:** Foto für "Erste Begegnung" (2020)
  - **Position:** Timeline links, erstes Element

- **Dateiname:** `story-2.jpg`
  - **Beschreibung:** Foto für "Erstes Date" (2021)
  - **Position:** Timeline rechts, zweites Element

- **Dateiname:** `story-3.jpg`
  - **Beschreibung:** Foto für "Verlobung" (2025)
  - **Position:** Timeline links, drittes Element

- **Dateiname:** `story-4.jpg`
  - **Beschreibung:** Foto für "Unser großer Tag" (2026)
  - **Position:** Timeline rechts, viertes Element

**Format:** JPG oder PNG
**Empfohlene Größe:** Rechteckig, ca. 600x400px (3:2 Verhältnis)

## 🎭 Besondere Features

### Flip-Animation der Porträtfotos:
- Die Porträtfotos drehen sich automatisch alle 5 Sekunden
- Startet mit den Kinderfotos, wechselt dann zu Erwachsenenfotos
- Klicke auf ein Foto für manuellen Wechsel
- Coole 3D-Flip-Animation mit CSS-Transformationen

## 🎨 Tipps für die besten Ergebnisse

### Bildqualität:
- **Auflösung:** Verwende hochauflösende Bilder für beste Qualität
- **Format:** JPG für Fotos, PNG für Grafiken mit Transparenz
- **Dateigröße:** Optimiere Bilder für Web (unter 2MB pro Bild)

### Hintergrundbild:
- Wähle ein Bild mit nicht zu vielen Details in der Mitte
- Der Text muss gut lesbar bleiben
- Landschaftsformat funktioniert am besten

### Porträtfotos:
- Quadratische Bilder funktionieren am besten
- Gesicht sollte zentriert sein
- Gute Beleuchtung für klare Sichtbarkeit
- **Für Flip-Animation:** Wähle ähnliche Posen für Kind/Erwachsen

### Story-Fotos:
- Erzähle eure Geschichte visuell
- Chronologische Reihenfolge beachten
- Verschiedene Momente eurer Beziehung

## 🚀 So fügst du die Bilder hinzu:

1. **Bilder vorbereiten:** Benenne deine Bilder exakt wie oben angegeben
2. **Hochladen:** Kopiere alle Bilder in den Ordner `assets/images/`
3. **Automatisch:** Die Website erkennt die Bilder automatisch und zeigt sie an
4. **Testen:** Lade die Website neu, um die Bilder zu sehen

## ❓ Fehlerbehebung

**Bild wird nicht angezeigt?**
- ✅ Überprüfe den Dateinamen (Groß-/Kleinschreibung beachten)
- ✅ Stelle sicher, dass das Bild im richtigen Ordner liegt
- ✅ Lade die Website neu (F5 oder Strg+R)
- ✅ Überprüfe das Dateiformat (JPG/PNG)

**Flip-Animation funktioniert nicht?**
- ✅ Beide Bilder (Kind + Erwachsen) müssen vorhanden sein
- ✅ Warte 5 Sekunden für automatischen Wechsel
- ✅ Klicke auf das Foto für manuellen Test

**Bild ist zu groß/klein?**
- Die Website passt die Bilder automatisch an
- Für beste Qualität verwende die empfohlenen Größen

## 📝 Notizen
- Alle Dateinamen sind case-sensitive (Groß-/Kleinschreibung wichtig)
- Die Website funktioniert auch ohne Bilder (zeigt Platzhalter)
- Du kannst Bilder jederzeit austauschen, indem du sie überschreibst
- Die Flip-Animation startet automatisch beim Laden der Seite

---
💡 **Tipp:** Beginne mit dem Hintergrundbild und den Porträtfotos für den größten visuellen Effekt! Die Flip-Animation macht die Seite besonders lebendig! 🎪