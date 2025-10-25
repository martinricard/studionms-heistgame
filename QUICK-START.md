# StreamElements Heist Widget - Quick Start

**NEW**: Field JSON Configuration | **API**: [dev.streamelements.com](https://dev.streamelements.com/)

## 🚀 Quick Setup (5 Minutes)

### 1. Add Widget
1. StreamElements Dashboard → My Overlays
2. Add Widget → Custom Widget → Custom Code
3. Paste `heist-widget.html` into **HTML/CSS** tab
4. Paste `fields.json` into **Fields** tab
5. Click **Save**

### 2. Configure
1. Click widget → Settings gear icon
2. Adjust values (sliders, text fields)
3. Click **Save**

### 3. Test
- Chat: `!heist` (start heist)
- Chat: `!join 100 medium` (join heist)

## 📝 Commands

| Command | Description | Example |
|---------|-------------|---------|
| `!heist` | Start a new heist | `!heist` |
| `!join [amount] [risk]` | Join active heist | `!join 500 high` |

**Risk levels**: `low`, `medium`, `high`

## ⚙️ Field JSON Configuration

### General Settings
- **Min/Max Bet**: Point limits
- **Cooldown**: Minutes between heists per user
- **Join Duration**: Seconds to join

### Risk Settings (Low/Medium/High)
- **Name**: Display name (e.g., "Bank Vault")
- **Success Rate**: % chance (slider 0-100)
- **Multipliers**: Win amount range (sliders)

### Messages
- Customize all chat responses
- Use placeholders: `{user}`, `{amount}`, `{risk}`, `{time}`

## 📊 Recommended Settings

**Balanced** (most streams):
- Min Bet: 50, Max Bet: 10,000
- Cooldown: 5 min, Duration: 60 sec
- Low: 70% @ 1.2-1.6x
- Medium: 50% @ 1.8-2.5x
- High: 30% @ 2.5-4.0x

## 🔧 API Features

- **SE_API.sendMessage()**: Chat responses
- **SE_API.store.get/set()**: Persistent points storage
- **onWidgetLoad**: Loads Field JSON config
- **onEventReceived**: Processes chat commands

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| No settings panel | Paste `fields.json` in **Fields** tab, click Save |
| Commands not working | Ensure overlay is active in OBS |
| Settings not applying | Refresh browser source in OBS |
| Points not tracking | Check browser console (F12) for errors |

## 📚 Documentation

- `README.md` - Full documentation
- `FIELD-JSON-GUIDE.md` - Field JSON tutorial
- `config-examples.md` - Pre-configured setups
- [StreamElements Dev Docs](https://dev.streamelements.com/)

## 💡 Pro Tips

1. **Test first**: Try with small amounts before going live
2. **Balance economy**: Keep expected value around 1.0
3. **Theme it**: Customize messages to match your stream
4. **Adjust live**: Change settings anytime via Field JSON
5. **Monitor**: Watch point economy over a few streams

---

**Files Needed**:
- ✅ `heist-widget.html` → HTML/CSS tab
- ✅ `fields.json` → Fields tab

**That's it!** Configure via Settings panel, no code editing needed! 🎮
