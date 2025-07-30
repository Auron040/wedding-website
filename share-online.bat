@echo off
echo 🌍 Wedding Website - Online teilen
echo.
echo Schritt 1: Server wird gestartet...
start "Flask Server" cmd /k "python app.py"

echo.
echo Schritt 2: Warte 3 Sekunden...
timeout /t 3 /nobreak >nul

echo.
echo Schritt 3: ngrok wird gestartet...
echo.
echo ⚠️  WICHTIG: Du brauchst ngrok installiert!
echo    Download: https://ngrok.com/download
echo.
echo 📱 Die URL die erscheint kannst du an deine Verlobte senden!
echo.
ngrok http 5000

pause