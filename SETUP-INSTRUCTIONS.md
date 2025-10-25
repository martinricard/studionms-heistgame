# Studio NMS - Heist Game SE
## Complete Setup Instructions for StreamElements

---

### 📋 **What is this widget?**

The **Studio NMS - Heist Game SE** is a fully interactive text-based heist mini-game for your StreamElements overlay. Viewers use chat commands to start heists, bet their loyalty points, choose risk levels, and win (or lose) based on their luck!

**Features:**
- 🎰 Three risk levels (Low, Medium, High) with customizable rewards
- 💰 Real StreamElements loyalty point integration
- ⏰ Countdown timer with optional reminders
- 🎨 Beautiful animated overlay UI
- 👥 Live participant tracking
- 🚫 Mod/Streamer heist cancellation
- 📱 Fully customizable messages, commands, and visuals

---

## 🚀 **Installation Steps**

### **1. Create a New Custom Widget**

1. Go to **[StreamElements Dashboard](https://streamelements.com/dashboard)**
2. Click **"Streaming Tools"** → **"My Overlays"**
3. Select your overlay (or create a new one)
4. Click **"+ Add Widget"** → **"Custom"** → **"Custom widget"**

---

### **2. Add the Widget Code**

#### **HTML Tab:**
1. Copy all contents from `heist-widget.html`
2. Paste into the **HTML** tab in StreamElements

#### **CSS Tab:**
1. Copy all contents from `heist-widget.css`
2. Paste into the **CSS** tab in StreamElements

#### **JS Tab:**
1. Copy all contents from `heist-widget.js`
2. Paste into the **JS** tab in StreamElements

#### **Fields Tab:**
1. Copy all contents from `fields.json`
2. Paste into the **Fields** tab in StreamElements
3. Click **"Save"**

---

### **3. Configure StreamElements API (Required for Point Tracking)**

To enable real loyalty point tracking, you need to connect the widget to your StreamElements account:

#### **Get Your JWT Token:**
1. Go to **[StreamElements Account Settings](https://streamelements.com/dashboard/account/channels)**
2. Click **"Show secrets"** (bottom right)
3. Copy your **JWT Token** (long string starting with "eyJ...")
4. Paste it into the **"StreamElements JWT Token"** field in widget settings

#### **Get Your Account ID:**
1. Still in account settings, find your **Account ID**
2. Copy the ID (looks like: `5f1234567890abcdef`)
3. Paste it into the **"Account ID"** field in widget settings

#### **Enable Point Tracking:**
1. Set **"Enable Point Tracking"** to **"Yes - Use Real SE Points"**
2. Click **"Save Settings"**

> **⚠️ Important:** Without the JWT Token and Channel ID, the widget will run in **visual-only mode** (no real points will be deducted/awarded).

---

## 🎮 **How to Use**

### **Chat Commands:**

| Command | Who Can Use | Description |
|---------|-------------|-------------|
| `!heist` | Anyone | Start a new heist (if none is active) |
| `!join [amount] [risk]` | Anyone | Join the active heist with bet amount and risk level |
| `!cancelheist` | Mods & Streamer Only | Cancel the current heist and refund all participants |

### **Examples:**
```
!heist
!join 100 low
!join 500 medium
!join 1000 high
!cancelheist
```

### **Risk Levels:**
- **🟢 Low Risk:** High success rate (70%), low rewards (1.2x-1.5x)
- **🟠 Medium Risk:** Medium success rate (50%), medium rewards (1.5x-2.5x)
- **🔴 High Risk:** Low success rate (30%), high rewards (2.5x-4.0x)

---

## ⚙️ **Configuration Options**

### **👁️ Visual Settings**
- **Show Visual Overlay:** Display the UI overlay or run chat-only mode
- **Widget Title:** Customize the header text
- **Widget Icon:** Choose from 11 emojis or upload custom image
- **Show Participant Count:** Display participant count pill

### **⚙️ General Settings**
- **Min/Max Bet:** Set betting limits
- **Cooldown:** Time before users can join another heist (in minutes)
- **Join Duration:** How long users have to join (in seconds)
- **Time Reminders:** Optional 30s and 10s countdown warnings in chat

### **💬 Commands**
- Customize the `!heist` and `!join` command triggers
- Change to `!rob`, `!bet`, or any command you prefer!

### **🎯 Risk Levels**
- Customize risk names (e.g., "Bank Vault" → "Easy Mode")
- Adjust success rates (0-100%)
- Set multiplier ranges for each risk level

### **💬 Messages**
- Fully customize every chat message
- Use placeholders:
  - `{user}` - Username
  - `{amount}` - Bet/win amount
  - `{currency}` - Your loyalty point name
  - `{risk}` - Risk level chosen
  - `{time}` - Cooldown time remaining
  - `{successCount}` - Winners count
  - `{totalCount}` - Total participants

---

## 🎨 **Customization Tips**

### **Change Colors:**
Edit the CSS `:root` variables to match your stream theme:
```css
:root {
  --accent-blue: #5865f2;     /* Header gradient */
  --accent-purple: #9b6bff;   /* Timer & count pill */
  --accent-green: #57f287;    /* Low risk color */
  --accent-orange: #ffa94d;   /* Medium risk color */
  --accent-red: #ed4245;      /* High risk color */
}
```

### **Change Position:**
In CSS, find `#heist-widget` and adjust:
```css
#heist-widget {
  top: 20px;    /* Distance from top */
  right: 20px;  /* Distance from right */
  /* Change to left: 20px for left side */
}
```

### **Hide Visual Completely:**
Set **"Show Visual Overlay"** to **"No - Chat Only"** in settings

---

## 🐛 **Troubleshooting**

### **Widget not showing?**
- Check if **"Show Visual Overlay"** is set to **"Yes"**
- Make sure you pasted all three files (HTML, CSS, JS)
- Check browser console (F12) for errors

### **Points not working?**
- Verify your **JWT Token** is correct and not expired
- Confirm **Account ID** matches your account
- Ensure **"Enable Point Tracking"** is set to **"Yes"**
- Check console logs for API errors

### **Commands not responding?**
- Verify command names in settings (case-sensitive in settings, not in chat)
- Check if another widget is using the same commands
- Look for JavaScript errors in console (F12)

### **Double emotes in chat?**
- Make sure you're using the latest version (v1.0+)
- Messages should contain emotes directly, not separate emote fields

---

## 📞 **Support & Bug Reports**

If you encounter any issues or have feature requests:

📧 **Email:** contact@noticemesenpai.studio

Please include:
- StreamElements username/channel
- Description of the issue
- Console error messages (if any)
- Widget settings (screenshot)

---

## 📝 **Changelog**

### **Version 1.0** (Current)
- ✅ Full loyalty point integration
- ✅ Three customizable risk levels
- ✅ Visual overlay with animations
- ✅ Mod/Streamer cancel command
- ✅ Time reminders (30s/10s)
- ✅ Custom icons & messages
- ✅ Participant count tracking
- ✅ Cooldown system
- ✅ Point refund on cancellation

---

## 🎯 **Credits**

**Created by:** Studio Notice Me Senpai (Studio NMS)  
**Version:** 1.0  
**Website:** [noticemesenpai.studio](https://noticemesenpai.studio)  
**Support:** contact@noticemesenpai.studio

---

### **Enjoy the heist! 🎰💰**

Feel free to customize everything to match your stream's vibe. If you use this widget, a shoutout to **Studio NMS** is always appreciated! 💜
