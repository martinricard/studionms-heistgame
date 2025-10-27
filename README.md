# Studio NMS - Heist Game SE

![Version](https://img.shields.io/badge/version-0.01--alpha-blue)
![StreamElements](https://img.shields.io/badge/StreamElements-Custom%20Widget-purple)
![License](https://img.shields.io/badge/license-MIT-green)

A fully interactive text-based heist mini-game widget for StreamElements overlays. Let your viewers bet loyalty points, choose risk levels, and win big (or lose it all)!

---

## 🎮 Features

- **🎰 Three Risk Levels** - Low, Medium, and High with customizable success rates and multipliers
- **💰 Real Points Integration** - Connects directly to StreamElements loyalty points system
- **⏰ Countdown Timer** - Visual timer with optional 30s and 10s reminders
- **🎨 Animated UI** - Beautiful gradient design with smooth animations
- **🎨 Full Customization** - Choose any Google Font, adjust colors, sizes, and styling
- **👥 Live Participant Tracking** - See who joined and their bets in real-time
- **🚫 Mod Controls** - Mods and streamers can cancel heists with refunds
- **⏱️ Global Cooldown** - Prevents heist spam with configurable cooldown after completion
- **💬 Smart User Guidance** - Helpful messages guide users to join active heists
- **📱 Easy Configuration** - Change every message, command, color, and setting
- **💬 Chat Integration** - Simple commands everyone can use
- **🔒 Privacy First** - All credentials stay in your browser, no external data transmission

---

## 📦 What's Included

```
StreamElement Heist Widget/
├── src/
│   ├── heist-widget.html    # Widget HTML structure
│   ├── heist-widget.css     # Widget styles and animations
│   ├── heist-widget.js      # Game logic and API integration
│   └── fields.json          # StreamElements configuration fields
├── SETUP-INSTRUCTIONS.md    # Detailed installation guide
├── QUICK-START.md           # Quick reference guide
└── README.md                # This file
```

---

## 🚀 Quick Start

### Installation (5 minutes)

1. **Open StreamElements Dashboard**
   - Go to [StreamElements](https://streamelements.com/dashboard)
   - Navigate to **Streaming Tools** → **My Overlays**
   - Add a **Custom Widget**

2. **Copy Widget Files**
   - **HTML Tab:** Paste contents of `src/heist-widget.html`
   - **CSS Tab:** Paste contents of `src/heist-widget.css`
   - **JS Tab:** Paste contents of `src/heist-widget.js`
   - **Fields Tab:** Paste contents of `src/fields.json`

3. **Configure API (Required)**
   - Go to [StreamElements Channels](https://streamelements.com/dashboard/account/channels)
   - Click **"Show Secrets"**
   - Copy your **JWT Token** and **Channel ID**
   - Paste both into widget settings under **🔑 API**
   - Enable **"Point Tracking"

4. **Save and Test!**
   - Type `!heist` in chat to start
   - Type `!join 100 medium` to join

📚 **Full Instructions:** See [SETUP-INSTRUCTIONS.md](./SETUP-INSTRUCTIONS.md) for detailed setup

---

## 🎯 Chat Commands

| Command | Description | Example |
|---------|-------------|---------|
| `!heist` | Start a new heist | `!heist` |
| `!join [amount] [risk]` | Join with bet and risk level | `!join 500 high` |
| `!cancelheist` | Cancel heist (Mods only) | `!cancelheist` |

### Risk Levels
- **🟢 low** - 70% success, 1.2x-1.5x rewards
- **🟠 medium** - 50% success, 1.5x-2.0x rewards  
- **🔴 high** - 30% success, 1.8x-2.0x rewards

---

## ⚙️ Configuration

### 🎨 Customization (NEW!)
- **Fonts:** Choose any Google Font with custom weights and sizes
- **Colors:** Full RGBA color picker for all UI elements
- **Typography:** Adjust title, timer, and participant text sizes
- **Themes:** Create your own color schemes to match your brand

📚 **See full guide:** [CUSTOMIZATION-GUIDE.md](./docs/CUSTOMIZATION-GUIDE.md)

### Visual Settings
- Toggle overlay on/off
- Customize title and icon
- Choose from 11 emojis or upload custom icon
- Hide participant count

### Game Settings
- Min/max bet amounts
- Join duration (10-300 seconds)
- User cooldown (0-60 minutes)
- Success rates per risk level
- Win multipliers per risk level

### Messages
- All chat messages are customizable
- Use placeholders: `{user}`, `{amount}`, `{currency}`, `{risk}`, etc.
- Add your own emotes directly in messages

---

## 🎨 Customization

### Change Colors
Edit CSS variables to match your stream theme:
```css
:root {
  --accent-blue: #5865f2;
  --accent-purple: #9b6bff;
  --accent-green: #57f287;
  --accent-orange: #ffa94d;
  --accent-red: #ed4245;
}
```

### Change Position
Move the widget anywhere on screen:
```css
#heist-widget {
  top: 20px;
  right: 20px;
  /* or use left: 20px for left side */
}
```

### Disable Visual
Set **"Show Visual Overlay"** to **"No"** for chat-only mode

---

## 🐛 Troubleshooting

### Widget not showing?
- ✅ Check "Show Visual Overlay" is enabled
- ✅ Verify all 3 code files are pasted (HTML, CSS, JS)
- ✅ Check browser console (F12) for errors
- ✅ **IMPORTANT:** Widget must be loaded in OBS to function (even for chat-only mode)

### Points not working?
- ✅ Confirm JWT Token is correct (from [Show Secrets](https://streamelements.com/dashboard/account/channels))
- ✅ Verify Channel ID matches your account
- ✅ Enable "Point Tracking" in settings
- ✅ Ensure widget is loaded in OBS

### Commands not responding?
- ✅ Check command names in settings
- ✅ Look for conflicts with other widgets
- ✅ Check console for JavaScript errors
- ✅ Verify widget is loaded in OBS browser source

### "Can't start heist" messages?
- ✅ **Global cooldown active** - Heists have a cooldown period after completion (configurable in settings)
- ✅ Check cooldown duration in **⚙️ Settings → Cooldown Minutes**
- ✅ Wait for cooldown to expire before starting new heist

---

## 📞 Support

**Email:** contact@noticemesenpai.studio

For bug reports, please include:
- StreamElements channel name
- Description of issue
- Console error messages (F12)
- Widget settings screenshot

---

## 📝 Changelog

### Version 0.01 (Alpha) - Current Release

#### Latest Update: v2.1.2 (2025-10-27)
- ✨ **Global Cooldown System** - Prevents heist spam with configurable cooldown
- ✨ **Enhanced User Guidance** - Helpful messages when heist is active
- ✨ **Separate Cooldown Messages** - Different messages for global vs individual cooldowns
- 🐛 **Bug Fixes** - Fixed executeHeist() participants array bug
- 🔒 **Privacy Notices** - Added security information in setup guide

#### Previous Updates
- ✅ Full StreamElements API integration with manual JWT configuration
- ✅ Three customizable risk levels
- ✅ Visual overlay with animations
- ✅ Mod cancellation with refunds
- ✅ Time reminders system
- ✅ Cooldown management
- ✅ Custom icons and messages
- ✅ Privacy-first credential handling

📚 **Full changelog:** See [CHANGELOG.md](./CHANGELOG.md) for complete version history

---

## 🏆 Credits

**Created by:** Studio Notice Me Senpai (Studio NMS)  
**Version:** 0.01 (Alpha)  
**License:** MIT  

### Made with 💜 for the streaming community

If you enjoy this widget, a shoutout to **Studio NMS** is always appreciated!

---

## 📜 License

MIT License - Free to use and modify for personal and commercial streams.

---

**Enjoy the heists! 🎰💰**
