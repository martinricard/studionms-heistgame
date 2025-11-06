# Subscriber Bonus System Guide

## 🌟 Overview

The Subscriber Bonus System rewards your loyal subscribers with enhanced multipliers based on their subscription tier. This feature encourages community support while making heists more rewarding for subs!

---

## 📊 Default Multiplier Values

| Tier | Badge | Default Multiplier | Example (100 points bet @ 2x win) |
|------|-------|-------------------|-----------------------------------|
| **Prime** | Twitch Prime | **1.15x** | 230 points (instead of 200) |
| **Tier 1** | $4.99/month | **1.20x** | 240 points (instead of 200) |
| **Tier 2** | $9.99/month | **1.30x** | 260 points (instead of 200) |
| **Tier 3** | $24.99/month | **1.50x** | 300 points (instead of 200) |

### How It Works
The subscriber multiplier is applied **on top of** the risk multiplier:
```
Final Winnings = Bet Amount × Risk Multiplier × Subscriber Multiplier
```

**Example:**
- User bets: 100 points
- Risk level: Medium (gets 2.0x)
- Tier 3 subscriber: 1.5x bonus
- **Calculation:** 100 × 2.0 × 1.5 = **300 points**
- Without sub bonus: 100 × 2.0 = 200 points
- **Extra reward:** +100 points!

---

## ⚙️ Configuration

### In fields.json

Add these fields to your `fields.json` configuration:

```json
{
  "type": "dropdown",
  "label": "🌟 Enable Subscriber Bonus",
  "value": "true",
  "field": "enableSubBonus",
  "group": "⭐ Subscriber Bonuses",
  "options": {
    "true": "Yes - Enabled",
    "false": "No - Disabled"
  }
},
{
  "type": "number",
  "label": "Prime Subscriber Multiplier",
  "value": 1.15,
  "field": "subPrimeMultiplier",
  "group": "⭐ Subscriber Bonuses",
  "min": 1.0,
  "max": 5.0,
  "step": 0.05
},
{
  "type": "number",
  "label": "Tier 1 Subscriber Multiplier",
  "value": 1.2,
  "field": "subTier1Multiplier",
  "group": "⭐ Subscriber Bonuses",
  "min": 1.0,
  "max": 5.0,
  "step": 0.05
},
{
  "type": "number",
  "label": "Tier 2 Subscriber Multiplier",
  "value": 1.3,
  "field": "subTier2Multiplier",
  "group": "⭐ Subscriber Bonuses",
  "min": 1.0,
  "max": 5.0,
  "step": 0.05
},
{
  "type": "number",
  "label": "Tier 3 Subscriber Multiplier",
  "value": 1.5,
  "field": "subTier3Multiplier",
  "group": "⭐ Subscriber Bonuses",
  "min": 1.0,
  "max": 5.0,
  "step": 0.05
},
{
  "type": "text",
  "label": "Subscriber Bonus Join Message",
  "value": " 🌟 {tier} bonus: {multiplier}x rewards!",
  "field": "msgSubBonus",
  "group": "💬 Messages"
}
```

### Quick Setup

1. **Open StreamElements Widget Settings**
2. **Navigate to "⭐ Subscriber Bonuses" section**
3. **Enable the feature:** Set "Enable Subscriber Bonus" to "Yes"
4. **Adjust multipliers** to your preference
5. **Customize messages** if desired
6. **Save settings**

---

## 💬 Chat Messages

### When a Subscriber Joins

**Standard join message:**
```
JohnDoe joined with 500 points at high risk!
```

**With subscriber bonus:**
```
JohnDoe joined with 500 points at high risk! 🌟 Tier 3 bonus: 1.50x rewards!
```

### When a Subscriber Wins

**Standard success message:**
```
JohnDoe succeeded and won 1000 points!
```

**With subscriber bonus:**
```
JohnDoe succeeded and won 1500 points! (Tier 3 bonus applied!)
```

---

## 🎨 Visual Indicators

Subscribers are shown with colored tier badges in the participant list:

- **🟣 Prime** - Purple badge
- **🔵 Tier 1** - Blue badge  
- **🔴 Tier 2** - Red badge
- **🟣 Tier 3** - Purple badge (darker)

---

## 🔧 Advanced Configuration

### Recommended Multiplier Ranges

**Conservative (Balanced):**
- Prime: 1.10x
- Tier 1: 1.15x
- Tier 2: 1.25x
- Tier 3: 1.35x

**Default (Moderate Reward):**
- Prime: 1.15x
- Tier 1: 1.20x
- Tier 2: 1.30x
- Tier 3: 1.50x

**Generous (High Incentive):**
- Prime: 1.25x
- Tier 1: 1.35x
- Tier 2: 1.50x
- Tier 3: 2.00x

**Extreme (Maximum Reward):**
- Prime: 1.50x
- Tier 1: 2.00x
- Tier 2: 2.50x
- Tier 3: 3.00x

### Balancing Tips

1. **Consider your community size**
   - Smaller channels: Higher multipliers encourage subs
   - Larger channels: Lower multipliers prevent inflation

2. **Monitor economy**
   - Track average winnings per heist
   - Adjust if points become too abundant

3. **Special events**
   - Temporarily increase multipliers during sub-a-thons
   - Create "Happy Hour" periods with boosted bonuses

4. **Fairness**
   - Ensure non-subs still have fun
   - Don't make gap too large between tiers

---

## 📈 Impact Examples

### Low Risk Heist (70% success, 1.2x-1.5x multiplier)

**Bet: 1000 points, Winner gets 1.4x**

| User Type | Base Winnings | With Bonus | Extra Reward |
|-----------|--------------|------------|--------------|
| Non-sub | 1,400 | 1,400 | - |
| Prime | 1,400 | 1,610 | +210 |
| Tier 1 | 1,400 | 1,680 | +280 |
| Tier 2 | 1,400 | 1,820 | +420 |
| Tier 3 | 1,400 | 2,100 | +700 |

### High Risk Heist (30% success, 2.5x-4.0x multiplier)

**Bet: 1000 points, Winner gets 3.5x**

| User Type | Base Winnings | With Bonus | Extra Reward |
|-----------|--------------|------------|--------------|
| Non-sub | 3,500 | 3,500 | - |
| Prime | 3,500 | 4,025 | +525 |
| Tier 1 | 3,500 | 4,200 | +700 |
| Tier 2 | 3,500 | 4,550 | +1,050 |
| Tier 3 | 3,500 | 5,250 | +1,750 |

---

## 🐛 Troubleshooting

### Subscribers not getting bonus

1. **Check if feature is enabled:**
   - Settings → "Enable Subscriber Bonus" = "Yes"

2. **Verify subscriber badge detection:**
   - Check browser console (F12) for log messages
   - Should see: `[Heist Widget] Username has Tier X bonus: Xx multiplier`

3. **Ensure badges are available:**
   - StreamElements needs access to Twitch badge data
   - User must be actively subscribed

### Multipliers not applying

1. **Check multiplier values:**
   - Must be between 1.0 and 5.0
   - Use decimals (1.2, not 120)

2. **Verify calculations:**
   - Console shows: `Awarded X points to Username`
   - Compare to expected calculation

3. **Clear browser cache:**
   - Force refresh (Ctrl+F5 or Cmd+Shift+R)
   - Reload OBS browser source

### Visual badges not showing

1. **Check participant display:**
   - Must be using latest widget version
   - Visual overlay must be enabled

2. **Verify CSS:**
   - Badges use inline styling
   - Should work with all themes

---

## 💡 Creative Ideas

### Sub Train Bonus
When multiple subs join, increase the multiplier temporarily!

### Milestone Rewards
- First sub to join: Extra bonus
- Tier 3 subs: Guaranteed win option

### Sub-Only Heists
Create special high-stakes heists only subs can join

### Loyalty Stacking
Combine sub months with multiplier (6 months = +0.1x extra)

### Special Events
"Sub Appreciation Day" with 2x all sub bonuses

---

## 📊 Analytics

Track these metrics to optimize your system:

- **Subscriber participation rate**
- **Average bonus rewards per tier**
- **Point inflation rate**
- **Sub conversion** (did it encourage more subs?)
- **User satisfaction feedback**

---

## 🎯 Best Practices

✅ **DO:**
- Test with different tier accounts
- Announce the feature to your community
- Adjust based on feedback
- Keep non-sub experience fun
- Monitor for economy balance

❌ **DON'T:**
- Make bonuses too high (economy breaks)
- Punish non-subscribers
- Change values too frequently
- Forget to announce changes
- Ignore community feedback

---

## 🔄 Future Enhancements

Potential additions in future versions:

- **Badge bonuses** (VIP, Moderator perks)
- **Time-based bonuses** (sub age rewards)
- **Gift sub detection** (thank gifters)
- **Streak bonuses** (consecutive heist wins)
- **Leaderboard integration**

---

## 📞 Support

**Questions about subscriber bonuses?**
- Email: contact@noticemesenpai.studio
- Check console logs for debugging
- Review CHANGELOG.md for updates

---

**Happy heisting! 🎰💰**
