# StreamElements Heist Widget - Quick Reference

**Version 0.01 (Alpha)** | Two distribution models: Standard & Loader (Etsy)

---

## 🎯 Two Versions Available

### **Standard Version** (`/src` folder)
For personal use or direct sharing:
- Paste HTML directly into StreamElements
- Copy/paste fields.json into Fields tab
- All code visible and customizable

### **Loader Version** (`/loader` folder)  
For selling on Etsy:
- Customer pastes 5-line HTML (with Widget ID)
- Import fields.json via Import button
- Files hosted on your CDN
- Automatic updates for all customers

---

## 📦 What's Unique vs. Shared (Loader Version)

### ✅ **Unique Per Customer:**
- **heist-widget-[name].html** - Contains their Widget ID only

### ✅ **Same for All Customers:**
- **fields.json** - Your config from `/src/fields.json`
- **CSS/JS files** - Hosted on your CDN
- **Setup guide** - Instructions PDF

### 🎯 **Widget ID = Just an Identifier**
- Not a license key
- Just for support tracking
- Doesn't affect functionality
- Embedded in HTML automatically

---

## 🚀 Customer Setup (Loader Version)

### 1. Add Widget (StreamElements)
1. My Overlays → Add Widget → Custom Widget
2. Paste HTML from `heist-widget-[name].html` (5 lines)
3. Go to **Fields** tab

### 2. Import Configuration
1. Click **Import Fields** button at bottom
2. Open `fields.json` in text editor
3. Copy ALL content (first `{` to last `}`)
4. Paste and click Import

### 3. Enter Credentials
1. Scroll to **💾 Points** section
2. Enter JWT Token (from StreamElements)
3. Enter Account ID (from StreamElements)
4. Click Save

### 4. Test
- Chat: `!heist` (start heist)
- Chat: `!join 100 medium` (join heist)

---

## 📝 Commands

| Command | Description | Example |
|---------|-------------|---------|
| `!heist` | Start a new heist | `!heist` |
| `!join [amount] [risk]` | Join active heist | `!join 500 high` |
| `!cancelheist` | Cancel heist (mods only) | `!cancelheist` |

**Risk levels**: `low`, `medium`, `high`

---

## ⚙️ Key Settings (fields.json)

### 👁️ Visual
- Colors (10 customizable RGBA colors)
- Fonts (Any Google Font + weight)
- Font sizes (title, timer, participants)
- Show/hide elements

### ⚙️ Settings
- Min/Max Bet: Point limits
- Cooldown: Minutes between heists
- Duration: Seconds to join
- Reminders: 30s and 10s warnings

### 🎯 Risk Levels (Default)
- **Low**: 70% @ 1.2-1.5x (safer)
- **Medium**: 50% @ 1.5-2.0x (balanced)
- **High**: 30% @ 1.8-2.0x (risky)

### 💬 Messages
- 14 customizable messages
- Placeholders: `{user}`, `{amount}`, `{currency}`, `{risk}`, `{time}`

---

## 📊 File Structure

```
Standard Version (/src):
├── heist-widget.html ← Paste into HTML tab
├── heist-widget.css ← Included in HTML
├── heist-widget.js ← Included in HTML
└── fields.json ← Paste into Fields tab

Loader Version (/loader):
Customer receives:
├── heist-widget-[name].html ← 5 lines with Widget ID
├── fields.json ← Your config (from /src/)
└── CUSTOMER-SETUP-GUIDE.pdf ← Instructions

You host on CDN:
├── heist-loader.js
├── heist-widget.css (from /src/)
└── heist-widget.js (from /src/)
```

---

## 🔧 For Etsy Sellers

### Delivery Checklist:
- [ ] Generate UUID Widget ID
- [ ] Replace `YOUR_WIDGET_ID` in HTML template
- [ ] Save as `heist-widget-[customer-name].html`
- [ ] Send 3 files:
  - [ ] Personalized HTML
  - [ ] `fields.json` (from `/src/`)
  - [ ] `CUSTOMER-SETUP-GUIDE.pdf`
- [ ] Log Widget ID in tracking spreadsheet

### Files to Host on CDN:
- `heist-loader.js`
- `heist-widget.css` (from `/src/`)
- `heist-widget.js` (from `/src/`)

**Update BASE_URL** in `heist-loader.js` with your CDN URL!

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| No settings panel | Import fields.json via Fields tab → Import button |
| Commands not working | Check JWT Token and Account ID |
| Widget not appearing | Verify HTML pasted correctly |
| Points not updating | Check StreamElements console (F12) |
| Widget ID questions | It's just for tracking, doesn't affect function |

---

## 📚 Full Documentation

- `README.md` - Complete feature documentation
- `SETUP-INSTRUCTIONS.md` - Detailed setup guide
- `LOADER-LAUNCH-GUIDE.md` - Etsy selling guide
- `/loader/CUSTOMER-SETUP-GUIDE.md` - Customer instructions
- `/loader/WIDGET-ID-SYSTEM.md` - Widget ID management

---

## 💡 Key Takeaways

✅ **Widget ID** = Identifier only (not a license key)  
✅ **fields.json** = YOUR version works for everyone  
✅ **Only HTML** = Personalized per customer  
✅ **CSS/JS** = Hosted once, shared by all  
✅ **Automatic updates** = Update CDN files, all customers benefit  

---

**Ready to use or sell!** 🎉

*Studio NMS - Notice Me Senpai Studio*
