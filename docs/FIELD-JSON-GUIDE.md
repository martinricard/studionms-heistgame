# Field JSON Setup Guide

This guide explains how to use the Field JSON configuration system in your StreamElements Heist Widget.

## What is Field JSON?

Field JSON is a StreamElements feature that allows you to create a user-friendly settings panel for your custom widgets. Instead of editing code, you can configure everything through a visual interface with sliders, text fields, and number inputs.

## How to Set Up Field JSON

### Step 1: Add the Widget

1. Go to StreamElements Dashboard → My Overlays
2. Click **Add Widget** → **Custom Widget** → **Custom Code**
3. You'll see three tabs: **HTML/CSS**, **JS**, and **Fields**

### Step 2: Add the Code

1. In the **HTML/CSS** tab, paste the entire contents of `heist-widget.html`
2. In the **Fields** tab (Fields JSON), paste the entire contents of `fields.json`
3. Click **Save**

### Step 3: Configure Settings

1. Close the code editor
2. Click on your widget in the overlay editor
3. Click the **Settings** gear icon
4. You'll see organized panels with all configuration options!

## Field Types Explained

### Number Fields
Used for bet limits, cooldowns, and durations:
```json
"minBet": {
  "type": "number",
  "label": "Minimum Bet",
  "value": 10
}
```

### Slider Fields
Used for success rates and multipliers with visual feedback:
```json
"lowSuccessRate": {
  "type": "slider",
  "label": "Low Risk Success Rate (%)",
  "value": 70,
  "min": 0,
  "max": 100,
  "step": 5
}
```

### Text Fields
Used for messages and names:
```json
"lowRiskName": {
  "type": "text",
  "label": "Low Risk Name",
  "value": "Bank Vault"
}
```

## Configuration Groups

Settings are organized into logical groups:

### General Settings
- Min/Max bet amounts
- Cooldown duration
- Join duration

### Low Risk Settings
- Risk name
- Success rate (slider)
- Multiplier range (sliders)

### Medium Risk Settings
- Risk name
- Success rate (slider)
- Multiplier range (sliders)

### High Risk Settings
- Risk name
- Success rate (slider)
- Multiplier range (sliders)

### Messages
- All chat messages with placeholder support

## How It Works

1. When the widget loads, it receives Field JSON data in `onWidgetLoad`
2. The widget reads `obj.detail.fieldData` which contains all your settings
3. These values override the default `CONFIG` object
4. All settings are applied automatically!

## Example: Changing Success Rates

Instead of editing this in code:
```javascript
lowSuccessRate: 70
```

You simply:
1. Click the widget → Settings
2. Find "Low Risk Success Rate (%)" slider
3. Drag to desired percentage
4. Click Save

Done! No code editing required.

## Message Placeholders

When editing message fields, use these placeholders:

| Placeholder | Replaced With |
|------------|---------------|
| `{user}` | Player's username |
| `{amount}` | Points amount |
| `{risk}` | Risk level chosen |
| `{time}` | Time remaining |
| `{min}` | Minimum bet |
| `{max}` | Maximum bet |
| `{successCount}` | Number of winners |
| `{totalCount}` | Total participants |

Example:
```
Input:  "💰 {user} won {amount} points!"
Output: "💰 JohnDoe won 250 points!"
```

## Tips for Configuration

### Balancing Risk Levels

**Conservative** (safer for new communities):
- Low: 80% success, 1.1x-1.3x multiplier
- Medium: 60% success, 1.4x-2.0x multiplier
- High: 40% success, 2.0x-3.0x multiplier

**Balanced** (recommended):
- Low: 70% success, 1.2x-1.6x multiplier
- Medium: 50% success, 1.8x-2.5x multiplier
- High: 30% success, 2.5x-4.0x multiplier

**High Stakes** (established communities):
- Low: 65% success, 1.3x-1.8x multiplier
- Medium: 45% success, 2.0x-3.5x multiplier
- High: 25% success, 3.0x-5.0x multiplier

### Cooldown Settings

- **Fast-paced streams**: 2-3 minutes
- **Normal pace**: 5 minutes (default)
- **Slower pace**: 10-15 minutes

### Join Duration

- **Quick heists**: 30 seconds
- **Standard**: 60 seconds (default)
- **Longer participation**: 90-120 seconds

## Troubleshooting Field JSON

### Settings Panel Not Appearing

**Problem**: No settings panel when clicking the widget

**Solutions**:
1. Make sure you pasted content in the **Fields** tab (not HTML tab)
2. Click **Save** after pasting
3. Close and reopen the widget editor
4. Verify JSON syntax (no trailing commas, proper quotes)

### Settings Not Applying

**Problem**: Changed settings but widget uses old values

**Solutions**:
1. Click **Save** after changing settings
2. Refresh the browser source in OBS
3. Check browser console (F12) for errors
4. Reload the entire overlay

### Invalid JSON Error

**Problem**: Error when saving Fields JSON

**Solutions**:
1. Copy `fields.json` again carefully
2. Ensure no extra commas at end of objects
3. Check all quotes are properly closed
4. Use a JSON validator online to check syntax

## Advanced: Adding Custom Fields

Want to add your own configuration option?

1. Add to `fields.json`:
```json
"myCustomSetting": {
  "type": "number",
  "label": "My Custom Setting",
  "value": 100,
  "group": "Custom Settings"
}
```

2. Use in widget code:
```javascript
window.addEventListener('onWidgetLoad', function(obj) {
  if (obj.detail && obj.detail.fieldData) {
    CONFIG = {...CONFIG, ...obj.detail.fieldData};
    console.log('My setting:', CONFIG.myCustomSetting);
  }
});
```

That's it! Your new field will appear in the settings panel.

## Resources

- [StreamElements Developer Portal](https://dev.streamelements.com/)
- [Custom Widget Documentation](https://dev.streamelements.com/docs/widgets-elements-sdk/9do3bhwlp2fdt-introduction)
- `config-examples.md` - Pre-configured setups
- `README.md` - Full documentation

---

**Pro Tip**: Make small changes and test frequently. The Field JSON system makes it easy to experiment and find the perfect balance for your community!
