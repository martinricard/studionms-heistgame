# 🎮 Heist Widget - Interactive Demo

**Studio NMS Production Demo** - Standalone demonstration version with simulated Twitch chat for portfolio and testing purposes.

---

## 📁 Professional Folder Structure

```
demo/
├── index.html              # Main demo page (opens directly)
├── demo.html               # Alternative entry point
├── README.md               # This file
└── assets/
    ├── css/
    │   └── demo.css        # All styles (widget + demo controls)
    ├── js/
    │   └── demo.js         # Complete heist logic + chat simulator
    └── images/             # (Reserved for future assets)
        └── README.txt
```

---

## ✨ Features

### **Fully Functional Heist Game**
- ✅ Complete heist mechanics (start, join, execute)
- ✅ Risk levels: Low, Medium, High (configurable success rates & multipliers)
- ✅ Real-time countdown timer with visual overlay
- ✅ Participant tracking with animated display
- ✅ User cooldowns & global cooldowns
- ✅ Points management system

### **Simulated Twitch Chat**
- ✅ Fake chat interface with realistic messages
- ✅ Pre-configured test users (Alice, Bob, Charlie, Dana, Eve)
- ✅ Custom user simulator (create your own test scenarios)
- ✅ Quick action buttons for rapid testing
- ✅ Live chat feed showing all game messages

### **Demo Controls**
- 🎬 Quick action buttons for common scenarios
- 👥 Pre-made user joins with different risk levels
- ⚡ Fast-forward timer (skip to heist execution)
- 🧪 Custom user simulator (name, amount, risk)
- 🎯 Multiple heist presets (low, medium, high risk groups)
- 🔄 Reset/clear functionality

---

## 🚀 How to Use

### **Method 1: Open Directly in Browser**
1. Open `demo.html` (or `index.html`) in any modern browser
2. No server required - runs 100% client-side

### **Method 2: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```
Then open: `http://localhost:8000/demo.html`

---

## 🎯 Quick Start Guide

### **Basic Demo Flow:**

1. **Start a Heist**
   - Click "Start Heist (!heist)" button
   - Watch the 60-second countdown begin
   - Heist overlay appears on screen

2. **Add Participants**
   - Click quick action buttons (Alice, Bob, Charlie, etc.)
   - OR use custom simulator to create your own users
   - Watch them appear in the participant list

3. **Fast-Forward (Optional)**
   - Click "⚡ Skip to End" to instantly execute heist
   - Great for quick demonstrations

4. **Watch Results**
   - Success/failure determined by risk levels
   - Winners receive multiplied points
   - Losers lose their bet
   - Results displayed in chat feed

### **Advanced Testing:**

**Test Different Risk Levels:**
- Low Risk: 70% success, 1.2x-1.5x multiplier
- Medium Risk: 50% success, 1.5x-2.5x multiplier  
- High Risk: 30% success, 2.5x-4.0x multiplier

**Test Cooldowns:**
- After heist completes, try starting another (cooldown message)
- Users can't join multiple heists (duplicate prevention)

**Test Edge Cases:**
- No participants (heist cancels automatically)
- Invalid amounts (min/max validation)
- Invalid risk levels (error handling)

---

## ⚙️ Configuration

Edit values in `assets/js/demo.js`:

```javascript
// Default settings (mimics StreamElements fields.json)
const fieldData = {
  minBet: 10,
  maxBet: 10000,
  heistDuration: 60,        // Seconds for join phase
  cooldownMinutes: 5,       // Cooldown between heists
  
  // Risk levels
  lowSuccessRate: 70,       // %
  lowMultiplierMin: 1.2,
  lowMultiplierMax: 1.5,
  
  mediumSuccessRate: 50,
  mediumMultiplierMin: 1.5,
  mediumMultiplierMax: 2.5,
  
  highSuccessRate: 30,
  highMultiplierMin: 2.5,
  highMultiplierMax: 4.0,
  
  // Customize messages
  msgHeistStart: 'Heist starting! Type !join [amount] [risk] to join!',
  msgSuccess: '{user} succeeded and won {amount} {currency}!',
  msgFailure: '{user} failed and lost {amount} {currency}!',
  // ... etc
};
```

---

## 🎨 Customization

### **Colors & Styling**
Edit CSS variables in `assets/css/demo.css`:
```css
:root {
  --bg-dark: rgba(20, 22, 36, 0.98);
  --accent-blue: rgba(88, 101, 242, 1);
  --accent-green: rgba(87, 242, 135, 1);
  /* ... more variables */
}
```

### **Fonts**
Change Google Font in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap">
```

---

## 📋 Demo Scenarios

### **Scenario 1: Low-Risk Group**
1. Start heist
2. Add Alice (100, low), Bob (150, low), Charlie (200, low)
3. Execute - High success rate, modest returns

### **Scenario 2: High-Risk Gamblers**
1. Start heist
2. Add Charlie (500, high), Dana (1000, high)
3. Execute - Low success rate, huge potential returns

### **Scenario 3: Mixed Strategy**
1. Start heist
2. Add Alice (100, low), Bob (250, medium), Charlie (500, high)
3. Execute - Varied results demonstrate all risk levels

### **Scenario 4: Large Group**
1. Start heist
2. Use "Simulate Large Heist (10 users)" button
3. Execute - Show scalability with many participants

---

## 🐛 Troubleshooting

**Widget not showing?**
- Check browser console for errors (F12)
- Ensure all file paths are correct
- Try opening in a different browser

**Timer not counting down?**
- JavaScript may be blocked
- Check browser console
- Refresh the page

**Buttons not working?**
- Ensure demo.js loaded properly
- Check browser console for errors
- Verify file paths in HTML

---

## 📦 Differences from Production Version

| Feature | Demo Version | Production Version |
|---------|-------------|-------------------|
| **Chat Integration** | Simulated fake chat | Real Twitch via StreamElements |
| **Points System** | In-memory fake points | StreamElements API |
| **Authentication** | None required | JWT Token + Channel ID |
| **User Management** | Test users only | Real Twitch users |
| **Data Persistence** | None (resets on refresh) | SE Database |
| **API Calls** | Mocked locally | Real SE REST API |

---

## 💼 Portfolio Use

**Perfect for demonstrating:**
- ✅ Interactive web application development
- ✅ Real-time UI updates & animations
- ✅ Game logic & state management
- ✅ Twitch/StreamElements integration (architecture)
- ✅ Responsive design & UX
- ✅ Professional code structure
- ✅ Configurable systems design

**Presentation Tips:**
1. Open demo before meeting (loads faster)
2. Start with quick scenario (Alice, Bob, Charlie)
3. Show visual overlay + chat feed simultaneously
4. Demonstrate different risk outcomes
5. Highlight configurability (settings panel)
6. Explain production integration (SE API)

---

## 🔗 Related Files

- **Production Version:** `../widget/` (StreamElements custom widget)
- **CDN Deployment:** `../cdn-deploy/` (hosted version)
- **Testing Version:** `../test/` (experimental features)
- **Documentation:** `../docs/` (setup guides, API docs)

---

## 📄 License & Credits

**Studio NMS - Heist Game Widget**  
Version: 0.01 (Alpha)

Created by: **Notice Me Senpai Studio**  
Contact: contact@noticemesenpai.studio  
Website: noticemesenpai.studio

© 2025 Studio NMS. For portfolio and demonstration purposes.

---

## 🎯 Quick Links

- [Main README](../README.md)
- [Setup Instructions](../docs/SETUP-INSTRUCTIONS.md)
- [Configuration Guide](../docs/CUSTOMIZATION-GUIDE.md)
- [Field JSON Reference](../docs/FIELD-JSON-GUIDE.md)

---

**View Demo:** Open `demo.html` in your browser to see the interactive heist widget in action.
