from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    """Serve the main wedding invitation page"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (CSS, JS, images, etc.)"""
    return send_from_directory('.', filename)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    """Serve assets (images, etc.)"""
    return send_from_directory('assets', filename)

@app.route('/locales/<path:filename>')
def serve_locales(filename):
    """Serve translation files"""
    return send_from_directory('locales', filename)

if __name__ == '__main__':
    print("🎉 Wedding Invitation Server Starting...")
    print("📱 Access your website at:")
    print("   Local:    http://localhost:5000")
    print("   Network:  http://0.0.0.0:5000")
    print("💡 Press Ctrl+C to stop the server")
    
    # Run the server
    app.run(
        host='0.0.0.0',  # Makes it accessible from other devices on your network
        port=5000,
        debug=True       # Auto-reload when files change
    )