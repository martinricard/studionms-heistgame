========================================
HEIST WIDGET - CDN FILES
========================================

This folder contains all the files needed for the Heist Widget to work on StreamElements.

FILES IN THIS FOLDER:
---------------------

1. heist-widget.html
   - The main HTML file that customers copy into StreamElements
   - Contains the loader script with timestamp cache busting
   - This is what goes in the "HTML" tab of the custom widget

2. fields.json
   - Configuration fields for StreamElements widget settings
   - Customers copy this into the "Fields" tab
   - Defines all customization options (commands, colors, timers, etc.)

3. heist-loader.js
   - Dynamically loads the CSS and JS files
   - Uses timestamp cache busting to always load latest version
   - Customers never see this file directly (loaded automatically)

4. heist-widget.css
   - All widget styling and animations
   - Loaded automatically by heist-loader.js
   - Customers never touch this file

5. heist-widget.js
   - All widget functionality and game logic
   - Loaded automatically by heist-loader.js
   - Customers never touch this file

images/
   - Folder for any images the widget might use
   - Currently empty but ready for future assets


CUSTOMER WORKFLOW:
------------------

1. Customer creates custom widget in StreamElements
2. Customer copies content from heist-widget.html → HTML tab
3. Customer copies content from fields.json → Fields tab
4. Customer configures settings in Fields panel
5. Widget loads CSS and JS automatically from CDN


CDN URLS:
---------

Widget HTML: https://cdn.noticemesenpai.studio/heist/heist-widget.html
Fields JSON: https://cdn.noticemesenpai.studio/heist/fields.json
Loader: https://cdn.noticemesenpai.studio/heist/heist-loader.js
CSS: https://cdn.noticemesenpai.studio/heist/heist-widget.css
JS: https://cdn.noticemesenpai.studio/heist/heist-widget.js


UPDATING THE WIDGET:
--------------------

To push updates to customers:

1. Update heist-widget.css or heist-widget.js on your computer
2. Upload the updated file(s) to this CDN folder via FTP
3. Customers automatically get the new version (timestamp cache busting)
4. No action needed from customers!

If you update heist-loader.js:
- Upload new loader to CDN
- Customers still get it automatically (timestamp in HTML)

If you update heist-widget.html or fields.json:
- Customers need to update their StreamElements widget
- Send them an update notice with new code


TESTING:
--------

Before updating production files, test at:
https://cdn.noticemesenpai.studio/heist/heist-widget.html

Check browser console for:
[Heist Widget] Loading from CDN: https://cdn.noticemesenpai.studio/heist/
[Heist Widget] Successfully loaded (timestamp: XXXXX)


========================================
Notice Me Senpai Studio
https://noticemesenpai.studio
========================================
