# 🚀 CDN Upload Checklist

## ✅ Pre-Upload (Do This First)

### 1. Create Subdomain in Web Host
- [ ] Log into your web hosting control panel (cPanel/Plesk)
- [ ] Go to "Subdomains" section
- [ ] Create new subdomain:
  - **Name:** `cdn`
  - **Full domain:** `cdn.noticemesenpai.studio`
  - **Document Root:** `/public_html/cdn/` (or similar path)
- [ ] Click "Create"

### 2. Enable SSL Certificate
- [ ] Go to "SSL/TLS Status" or "Let's Encrypt"
- [ ] Find `cdn.noticemesenpai.studio`
- [ ] Click "Issue" or "Enable" SSL certificate
- [ ] Wait 5-10 minutes for certificate to activate
- [ ] Enable "Force HTTPS" option

---

## 📤 Upload Files

### 3. Connect via FTP/SFTP
- [ ] Open FileZilla (or your FTP client)
- [ ] Connect to your host:
  - **Host:** `ftp.noticemesenpai.studio` (or provided by host)
  - **Username:** Your cPanel username
  - **Password:** Your cPanel password
  - **Port:** 21 (FTP) or 22 (SFTP)

### 4. Navigate to CDN Folder
- [ ] In remote panel, navigate to: `/public_html/cdn/` (or your subdomain root)
- [ ] Should be empty or have default files

### 5. Upload Everything
- [ ] In local panel, navigate to: `StreamElement Heist Widget/cdn-upload/`
- [ ] Select ALL files and folders:
  - `.htaccess`
  - `index.html`
  - `README.txt`
  - `heist/` folder (with all contents)
- [ ] Drag and drop to remote panel
- [ ] Wait for upload to complete (should be quick)
- [ ] Verify folder structure matches on server

---

## 🧪 Testing

### 6. Test Main CDN URL
- [ ] Open browser
- [ ] Go to: `https://cdn.noticemesenpai.studio/`
- [ ] Should see: "NMS CDN" status page with purple gradient
- [ ] Check for "Secure" padlock in browser address bar

### 7. Test Heist Widget Files
- [ ] Test loader: `https://cdn.noticemesenpai.studio/heist/heist-loader.js`
  - Should display JavaScript code
- [ ] Test CSS: `https://cdn.noticemesenpai.studio/heist/heist-widget.css`
  - Should display CSS code
- [ ] Test JS: `https://cdn.noticemesenpai.studio/heist/heist-widget.js`
  - Should display JavaScript code
- [ ] ❌ Should NOT see: 404 error or "File not found"

### 8. Test CORS Headers (Optional but Important)
- [ ] Open browser console (F12)
- [ ] Paste and run:
```javascript
fetch('https://cdn.noticemesenpai.studio/heist/heist-loader.js')
  .then(response => response.text())
  .then(text => console.log('✅ CORS working!', text.substring(0, 100)))
  .catch(error => console.error('❌ CORS error:', error));
```
- [ ] Should see: "✅ CORS working!" with code snippet
- [ ] If error: .htaccess may not be working (contact host support)

---

## 🔧 Update Widget HTML

### 9. Update Your Loader Script
- [ ] In StreamElements, edit your heist widget HTML
- [ ] Find the loader script line
- [ ] Replace with:
```html
<script src="https://cdn.noticemesenpai.studio/heist/heist-loader.js"></script>
```
- [ ] Save widget

### 10. Test in StreamElements
- [ ] Open your overlay editor
- [ ] Add the heist widget
- [ ] Check browser console for: `[Heist Widget] Successfully loaded v1.0.0`
- [ ] Test heist command (!heist 100 low)
- [ ] Verify widget displays correctly

---

## 📝 Post-Upload

### 11. Document Your URLs
Save these for reference:
```
CDN Base: https://cdn.noticemesenpai.studio/
Heist Loader: https://cdn.noticemesenpai.studio/heist/heist-loader.js
Heist CSS: https://cdn.noticemesenpai.studio/heist/heist-widget.css
Heist JS: https://cdn.noticemesenpai.studio/heist/heist-widget.js
```

### 12. Update Customer Instructions
- [ ] Update `CUSTOMER-SETUP-GUIDE.md` with new CDN URLs
- [ ] Update `CUSTOMER-PDF-TEMPLATE.md` with new loader script
- [ ] Update Etsy listing with setup instructions

### 13. Create Backup
- [ ] Download entire `/cdn/` folder from server
- [ ] Save locally as backup
- [ ] Store in: `Dropbox/Notice Me Senpai/Backups/CDN/`

---

## 🆘 Troubleshooting

### If files return 404:
- Check FTP upload was successful
- Verify file permissions (should be 644 for files, 755 for folders)
- Check file names match exactly (case-sensitive on Linux servers)

### If SSL shows "Not Secure":
- Wait 10-15 minutes after issuing certificate
- Clear browser cache
- Try in incognito/private mode
- Contact host support if still not working

### If .htaccess not working:
- Your host may use Nginx (not Apache)
- Contact support and ask them to enable CORS for `cdn.noticemesenpai.studio`
- Provide them with: "Allow Access-Control-Allow-Origin: * for all files"

### If widget not loading in StreamElements:
- Check browser console for errors
- Verify all 3 URLs load correctly when visited directly
- Test in different browser
- Check StreamElements isn't blocking external scripts

---

## ✅ Success Criteria

You're done when:
- ✅ `https://cdn.noticemesenpai.studio/` shows status page
- ✅ All 3 widget files load without 404
- ✅ SSL certificate is active (green padlock)
- ✅ Widget loads in StreamElements overlay
- ✅ Console shows "Successfully loaded v1.0.0"
- ✅ Widget functions correctly (!heist command works)

---

## 📧 Need Help?

If you get stuck:
1. Check README.txt in the upload folder
2. Verify each checkbox above
3. Contact your web host support for server issues
4. Test in multiple browsers to rule out caching

**Remember:** It can take 5-15 minutes for DNS/SSL changes to propagate!

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-26  
**Notice Me Senpai Studio**
