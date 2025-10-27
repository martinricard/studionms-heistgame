/**
 * StreamElements Heist Widget Loader
 * Notice Me Senpai Studio
 * https://cdn.noticemesenpai.studio/heist/
 * 
 * This loader dynamically injects the heist widget CSS and JS files
 * Uses timestamp cache busting to always load the latest version
 */

(function() {
    'use strict';
    
    // Base URL for CDN - UPDATE THIS AFTER UPLOAD
    const BASE_URL = 'https://cdn.noticemesenpai.studio/heist/';
    
    // Generate timestamp for cache busting
    const CACHE_BUSTER = Date.now();
    
    /**
     * Load CSS file
     */
    function loadCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = BASE_URL + 'heist-widget.css?_t=' + CACHE_BUSTER;
        link.onerror = function() {
            console.error('[Heist Widget] Failed to load CSS from:', link.href);
        };
        document.head.appendChild(link);
    }
    
    /**
     * Load JS file
     */
    function loadJS() {
        const script = document.createElement('script');
        script.src = BASE_URL + 'heist-widget.js?_t=' + CACHE_BUSTER;
        script.onerror = function() {
            console.error('[Heist Widget] Failed to load JS from:', script.src);
        };
        script.onload = function() {
            console.log('[Heist Widget] Successfully loaded (timestamp: ' + CACHE_BUSTER + ')');
        };
        document.body.appendChild(script);
    }
    
    // Load files in order
    console.log('[Heist Widget] Loading from CDN:', BASE_URL);
    loadCSS();
    loadJS();
    
})();
