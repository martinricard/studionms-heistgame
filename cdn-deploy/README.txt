==========================================
NOTICE ME SENPAI STUDIO - CDN SETUP
cdn.noticemesenpai.studio
==========================================

📦 WHAT'S IN THIS FOLDER:

This folder contains everything you need to upload to your CDN subdomain.

📁 FOLDER STRUCTURE:

cdn-upload/
├── .htaccess              ← Apache configuration (CORS, caching, security)
├── index.html             ← CDN status page (shows when someone visits cdn.noticemesenpai.studio)
├── README.txt             ← This file
└── heist/                 ← Heist widget files
    ├── heist-loader.js    ← Loader script
    ├── heist-widget.css   ← Widget styles
    ├── heist-widget.js    ← Widget functionality
    └── images/            ← Images folder (currently empty, add as needed)


🚀 UPLOAD INSTRUCTIONS:

1. CREATE SUBDOMAIN in your web host:
   - Name: cdn
   - Full domain: cdn.noticemesenpai.studio
   - Document root: /public_html/cdn/ (or similar)

2. ENABLE SSL CERTIFICATE:
   - Use Let's Encrypt (free)
   - Enable "Force HTTPS"

3. UPLOAD FILES via FTP/SFTP:
   - Connect to your host
   - Navigate to the cdn subdomain folder
   - Upload EVERYTHING from this folder
   - Preserve folder structure

4. TEST URLS (after upload):
   ✅ https://cdn.noticemesenpai.studio/
   ✅ https://cdn.noticemesenpai.studio/heist/heist-loader.js
   ✅ https://cdn.noticemesenpai.studio/heist/heist-widget.css
   ✅ https://cdn.noticemesenpai.studio/heist/heist-widget.js

5. UPDATE WIDGET HTML:
   - In your StreamElements widget HTML
   - Update the loader script URL to:
     <script src="https://cdn.noticemesenpai.studio/heist/heist-loader.js"></script>


🔧 AFTER UPLOAD:

1. Visit: https://cdn.noticemesenpai.studio/
   - You should see the "NMS CDN" status page

2. Check files directly:
   - https://cdn.noticemesenpai.studio/heist/heist-loader.js
   - Should display JavaScript code (not 404)

3. If .htaccess doesn't work:
   - Your host might use Nginx instead of Apache
   - Contact support for CORS headers setup


📝 ADDING MORE WIDGETS:

When you create new widgets, add them like this:

cdn-upload/
├── heist/              ← Already exists
├── countdown/          ← New widget
│   ├── countdown-loader.js
│   ├── countdown-widget.css
│   └── countdown-widget.js
└── alerts/             ← Another widget
    └── ...

Just upload the new folder via FTP!


🆘 TROUBLESHOOTING:

Problem: Files not loading in StreamElements
Solution: Check CORS headers are enabled (.htaccess working)

Problem: CSS not loading
Solution: Clear browser cache, check file URL directly

Problem: "Not Secure" warning
Solution: Enable SSL certificate and force HTTPS

Problem: .htaccess not working
Solution: Your host uses Nginx - contact support


📧 SUPPORT:

For widget support: contact@noticemesenpai.studio
CDN Version: 1.0.0
Last Updated: 2025-10-26

==========================================
Notice Me Senpai Studio
Professional streaming tools
https://noticemesenpai.studio
==========================================
