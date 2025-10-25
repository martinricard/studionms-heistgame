# Configuration Examples

This file shows different configuration examples for your heist widget.

**NEW**: With Field JSON, you can now configure these through the Settings panel instead of editing code!

## How to Use These Examples

### Method 1: Field JSON Settings Panel (Recommended)
1. Add the widget with `fields.json`
2. Click widget → Settings
3. Adjust sliders and fields to match values below
4. Save!

### Method 2: Manual Code Edit
1. Open `heist-widget.html`
2. Find the `CONFIG` object
3. Replace values with examples below
4. Save and reload

---

## Conservative Setup (Safe for New Streamers)

**When to use**: Small communities, new to loyalty points, want to minimize risk

### Settings:

### Settings:

**General**:
- Min Bet: 10
- Max Bet: 1000
- Cooldown: 10 minutes
- Join Duration: 90 seconds

**Low Risk** (Convenience Store):
- Success Rate: 80%
- Multiplier: 1.1x - 1.3x

**Medium Risk** (Bank Vault):
- Success Rate: 60%
- Multiplier: 1.4x - 2.0x

**High Risk** (Diamond Heist):
- Success Rate: 40%
- Multiplier: 2.0x - 3.0x

<details>
<summary>View as Code (Manual Edit)</summary>

```javascript
CONFIG = {
  minBet: 10,
  maxBet: 1000,
  cooldownMinutes: 10,
  heistDuration: 90,
  
  lowRiskName: 'Convenience Store',
  lowSuccessRate: 80,
  lowMultiplierMin: 1.1,
  lowMultiplierMax: 1.3,
  
  mediumRiskName: 'Bank Vault',
  mediumSuccessRate: 60,
  mediumMultiplierMin: 1.4,
  mediumMultiplierMax: 2.0,
  
  highRiskName: 'Diamond Heist',
  highSuccessRate: 40,
  highMultiplierMin: 2.0,
  highMultiplierMax: 3.0
};
```
</details>

---

## High Stakes Setup (For Established Communities)

**When to use**: Large active communities, lots of points in circulation, want excitement

### Settings:

**General**:
- Min Bet: 100
- Max Bet: 50000
- Cooldown: 3 minutes
- Join Duration: 45 seconds

**Low Risk** (Bank Robbery):
- Success Rate: 65%
- Multiplier: 1.3x - 1.8x

**Medium Risk** (Casino Heist):
- Success Rate: 45%
- Multiplier: 2.0x - 3.5x

**High Risk** (Fort Knox):
- Success Rate: 25%
- Multiplier: 3.0x - 5.0x

<details>
<summary>View as Code (Manual Edit)</summary>

```javascript
CONFIG = {
  minBet: 100,
  maxBet: 50000,
  cooldownMinutes: 3,
  heistDuration: 45,
  
  lowRiskName: 'Bank Robbery',
  lowSuccessRate: 65,
  lowMultiplierMin: 1.3,
  lowMultiplierMax: 1.8,
  
  mediumRiskName: 'Casino Heist',
  mediumSuccessRate: 45,
  mediumMultiplierMin: 2.0,
  mediumMultiplierMax: 3.5,
  
  highRiskName: 'Fort Knox',
  highSuccessRate: 25,
  highMultiplierMin: 3.0,
  highMultiplierMax: 5.0
};
```
</details>

---

## Balanced Setup (Recommended)

**When to use**: Most streams, good mix of risk and reward, general purpose

### Settings:

**General**:
- Min Bet: 50
- Max Bet: 10000
- Cooldown: 5 minutes
- Join Duration: 60 seconds

**Low Risk** (Safe House):
- Success Rate: 70%
- Multiplier: 1.2x - 1.6x

**Medium Risk** (Museum Heist):
- Success Rate: 50%
- Multiplier: 1.8x - 2.5x

**High Risk** (Federal Reserve):
- Success Rate: 30%
- Multiplier: 2.5x - 4.0x

<details>
<summary>View as Code (Manual Edit)</summary>

```javascript
CONFIG = {
  minBet: 50,
  maxBet: 10000,
  cooldownMinutes: 5,
  heistDuration: 60,
  
  lowRiskName: 'Safe House',
  lowSuccessRate: 70,
  lowMultiplierMin: 1.2,
  lowMultiplierMax: 1.6,
  
  mediumRiskName: 'Museum Heist',
  mediumSuccessRate: 50,
  mediumMultiplierMin: 1.8,
  mediumMultiplierMax: 2.5,
  
  highRiskName: 'Federal Reserve',
  highSuccessRate: 30,
  highMultiplierMin: 2.5,
  highMultiplierMax: 4.0
};
```
</details>

---

## Quick Heist Setup (Fast-Paced)

**When to use**: High-energy streams, frequent heists, lots of viewer activity

### Settings:

**General**:
- Min Bet: 10
- Max Bet: 5000
- Cooldown: 2 minutes
- Join Duration: 30 seconds

**Low Risk** (Quick Grab):
- Success Rate: 75%
- Multiplier: 1.2x - 1.4x

**Medium Risk** (Speed Run):
- Success Rate: 55%
- Multiplier: 1.6x - 2.2x

**High Risk** (All In):
- Success Rate: 35%
- Multiplier: 2.5x - 3.5x

<details>
<summary>View as Code (Manual Edit)</summary>

```javascript
CONFIG = {
  minBet: 10,
  maxBet: 5000,
  cooldownMinutes: 2,
  heistDuration: 30,
  
  lowRiskName: 'Quick Grab',
  lowSuccessRate: 75,
  lowMultiplierMin: 1.2,
  lowMultiplierMax: 1.4,
  
  mediumRiskName: 'Speed Run',
  mediumSuccessRate: 55,
  mediumMultiplierMin: 1.6,
  mediumMultiplierMax: 2.2,
  
  highRiskName: 'All In',
  highSuccessRate: 35,
  highMultiplierMin: 2.5,
  highMultiplierMax: 3.5
};
```
</details>

---

## Custom Messages Example

You can customize all messages in the Settings panel! Here's a themed example:

### Pirate Theme Messages

Use Field JSON Settings panel to change:

- **Heist Start**: `🏴‍☠️ RAID STARTED! Type !join [doubloons] [risk] to join the crew!`
- **Joined**: `⚓ {user} joined with {amount} doubloons at {risk} risk!`
- **Success**: `🏆 {user} plundered {amount} doubloons!`
- **Failure**: `⚔️ {user} walked the plank and lost {amount} doubloons!`

### Cyberpunk Theme Messages

- **Heist Start**: `🤖 HACK INITIATED! Type !join [credits] [risk] to jack in!`
- **Joined**: `💻 {user} connected with {amount} credits at {risk} risk!`
- **Success**: `✅ {user} extracted {amount} credits from the mainframe!`
- **Failure**: `🚨 {user}'s connection was traced - lost {amount} credits!`

<details>
<summary>View Custom Messages as Code</summary>

```javascript
// In CONFIG object, change message fields:
msgHeistStart: '🏴‍☠️ RAID STARTED! Type !join [doubloons] [risk]!',
msgJoined: '⚓ {user} joined with {amount} doubloons at {risk} risk!',
msgSuccess: '🏆 {user} plundered {amount} doubloons!',
msgFailure: '⚔️ {user} walked the plank and lost {amount} doubloons!'
```
</details>

---

## Tips for Choosing Settings

### Success Rate Guidelines
- **Low Risk**: 70-80% (safe bets, small rewards)
- **Medium Risk**: 45-55% (coin flip, medium rewards)
- **High Risk**: 25-35% (risky, big rewards)

### Multiplier Guidelines
- **Low Risk**: 1.1x - 1.6x (10-60% profit)
- **Medium Risk**: 1.5x - 2.5x (50-150% profit)
- **High Risk**: 2.5x - 5.0x (150-400% profit)

### Economy Balance
Expected value should be close to 1.0 for balance:
```
Expected Value = Success Rate × Average Multiplier
```

Examples:
- Low Risk: 0.70 × 1.35 = 0.945 (slightly negative EV)
- Medium Risk: 0.50 × 2.0 = 1.0 (neutral EV)
- High Risk: 0.30 × 3.25 = 0.975 (slightly negative EV)

💡 **Tip**: Slightly negative expected value prevents infinite point growth!

---

## Testing Your Configuration

1. Set up widget with desired configuration
2. Test each risk level multiple times
3. Monitor point economy over a few streams
4. Adjust success rates or multipliers as needed
5. Get viewer feedback!

Remember: You can change settings anytime through the Field JSON Settings panel! 🎛️
