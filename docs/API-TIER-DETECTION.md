# Event-Based Tier Detection

## Overview

The widget uses **event caching** to detect subscriber tiers. It listens to `subscriber-latest` events and caches tier information, then looks up the cached data when users join heists.

## Why Event Caching?

### The Problem

StreamElements provides tier information (`"1000"`, `"2000"`, `"3000"`, `"prime"`) only in **subscriber-latest events** (when someone subscribes or resubscribes), not in:
- ❌ Message events (chat commands)
- ❌ User API endpoints
- ❌ Points API endpoints

When a user types `!join 200 low`, the widget receives a message event that contains:
- ✅ Username and display name
- ✅ Badge array (shows if they're a subscriber)
- ✅ Chat message text
- ❌ **Tier information** (not included)

### Failed Approaches

We tried multiple detection methods:

1. **badge.version** - This was the subscription duration in months (e.g., "24"), not the tier level
2. **badge.info/description/tier** - These fields are empty in message events
3. **event.tier** - Also empty in message events
4. **StreamElements API** - No public endpoint provides tier information for users

### The Solution: Event Caching

Listen to `subscriber-latest` events and cache tier information in memory:

1. User subscribes/resubscribes → Widget receives `subscriber-latest` event with tier data
2. Widget caches: `{username: "user123", tier: "3000", timestamp: Date.now()}`
3. User types `!join 200 low` → Widget looks up cached tier
4. Widget applies appropriate multiplier based on cached tier

## Implementation

### Cache Structure

```javascript
// Map<username, {tier: string, timestamp: number}>
let subscriberTierCache = new Map();
const TIER_CACHE_DURATION = 60 * 60 * 1000; // 1 hour
```

### Event Listener

```javascript
window.addEventListener('onEventReceived', function(obj) {
  const { listener, event } = obj.detail;
  
  // Listen for subscriber events
  if (listener === 'subscriber-latest') {
    const username = (event.name || event.displayName || '').toLowerCase();
    const tier = event.tier; // '1000', '2000', '3000', or 'prime'
    
    if (username && tier) {
      subscriberTierCache.set(username, {
        tier: tier,
        timestamp: Date.now()
      });
      console.log(`[Heist Widget] Cached tier for ${username}:`, tier);
    }
  }
  
  // ... handle message events ...
});
```

### Tier Lookup

```javascript
const getUserSubscriberTier = (username) => {
  const cached = subscriberTierCache.get(username.toLowerCase());
  
  if (cached && (Date.now() - cached.timestamp) < TIER_CACHE_DURATION) {
    console.log(`[Heist Widget] ${username} tier from cache:`, cached.tier);
    return cached.tier;
  }
  
  console.log(`[Heist Widget] ${username} tier not in cache`);
  return null;
};
```

### Usage in joinHeist()

```javascript
async function joinHeist(username, userId, amount, risk, event) {
  // ... validation checks ...
  
  // Deduct points
  const deducted = await updateStreamElementsPoints(username, -amount);
  if (!deducted) return;
  
  // Get cached tier
  const userTier = getUserSubscriberTier(username);
  
  // Create event data with tier
  const tierEventData = {
    badges: event.data.badges,
    tier: userTier
  };
  
  // Apply multiplier
  const subMultiplier = getSubscriberMultiplier(tierEventData.badges, tierEventData);
  const subTier = getSubscriberTierName(tierEventData.badges, tierEventData);
  
  // Add to heist with bonus
  heistState.participants.push({
    username,
    amount,
    risk,
    subMultiplier,
    subTier
  });
}
```

| Tier Value | Meaning | Example Multiplier |
|------------|---------|-------------------|
| `"prime"` | Prime Gaming subscriber | 1.15x |
| `"1000"` | Tier 1 ($4.99/month) | 1.2x |
| `"2000"` | Tier 2 ($9.99/month) | 1.3x |
| `"3000"` | Tier 3 ($24.99/month) | 1.5x |
| `null` | Not cached/not a subscriber | 1.0x (no bonus) |

## How It Works

### Step 1: Cache Population

When a user subscribes or resubscribes:

```
USER SUBS → subscriber-latest event → Widget caches {username: tier, timestamp}
```

Console output:
```
[Heist Widget] Cached tier for martin_ricard: 3000
```

### Step 2: Tier Lookup

When a user joins a heist:

```
!join command → Get from cache → Apply multiplier → Join with bonus
```

Console output:
```
[Heist Widget] martin_ricard tier from cache: 3000
[Heist Widget] Subscriber tier from event: 3000
[Heist Widget] Tier 3 subscriber bonus: 1.5
```

### Step 3: Cache Expiration

Cache entries expire after 1 hour (configurable):

```javascript
const TIER_CACHE_DURATION = 60 * 60 * 1000; // 1 hour
```

If cached data is older than 1 hour, it's considered stale and returns `null`.

## Performance Considerations

### No API Calls

Unlike API-based approaches, event caching has **zero latency** for heist joins:
- No network requests during !join command
- Instant tier lookup from Map
- No timeout concerns

### Memory Usage

Very lightweight - stores only:
```javascript
{
  "username": {tier: "3000", timestamp: 1234567890},
  "another_user": {tier: "1000", timestamp: 1234567899}
}
```

### Cache Maintenance

- Entries expire after 1 hour (configurable)
- Automatic cleanup on lookup (stale entries ignored)
- No manual clearing needed

## Testing

### Initial Setup Required

**Important**: For tier detection to work, subscribers must sub/resub while the widget is active to populate the cache.

### Console Logs

**When a user subscribes:**
```
[Heist Widget] Cached tier for martin_ricard: 3000
```

**When a subscriber joins a heist:**
```
[Heist Widget] martin_ricard tier from cache: 3000
[Heist Widget] Subscriber tier from event: 3000
[Heist Widget] Tier 3 subscriber bonus: 1.5
[Heist Widget] martin_ricard has Tier 3 bonus: 1.5x multiplier
```

**When tier not cached:**
```
[Heist Widget] username tier not in cache - may need to sub/resub to populate
[Heist Widget] Getting tier name from event: 
[Heist Widget] Could not determine subscriber tier from event data, no bonus applied
```

### Test Cases

1. **Tier 3 Subscriber** (you)
   - Enable `enableSubBonus` and `enableTier3Bonus` in fields
   - **Important**: Resub or wait for sub event to populate cache
   - Type `!join 200 low`
   - Should show "Tier 3" badge
   - Should apply 1.5x multiplier

2. **Non-Subscriber**
   - Type `!join 200 low`
   - Should not show tier badge
   - Should apply 1.0x multiplier (no bonus)

3. **Cached Subscriber**
   - Already subbed before (cache populated)
   - Type `!join 200 low`
   - Should apply correct tier bonus from cache

## Troubleshooting

### "Tier not in cache - may need to sub/resub"

**Cause:**
User hasn't subbed/resubbed since widget was loaded.

**Solution:**
1. Ask the user to resub (if they want to test)
2. Wait for their next automatic subscription renewal
3. Widget will capture the tier on next sub event

### Tier showing wrong value

**Possible causes:**
1. User upgraded/downgraded tier but hasn't resubbed
2. Cache contains old tier info

**Solution:**
User needs to resub for widget to capture new tier.

### No tier detected after subbing

**Possible causes:**
1. Widget wasn't active when they subbed
2. Event listener not registered
3. StreamElements event didn't fire

**Solution:**
1. Check console for "Cached tier" message
2. Refresh widget/overlay
3. Ask user to resub

## Future Enhancements

### 1. Subscriber Event Caching

Listen to subscriber-latest events and cache tier information:

```javascript
window.addEventListener('onEventReceived', (obj) => {
  if (obj.detail.event.type === 'subscriber-latest') {
    const username = obj.detail.event.data.displayName;
    const tier = obj.detail.event.data.tier;
    
    // Cache this for faster lookup
    tierCache.set(username, {
      tier: tier,
      timestamp: Date.now()
    });
  }
});
```

### 2. Bulk API Calls

If multiple users join simultaneously, batch the API calls:

```javascript
const fetchMultipleTiers = async (usernames) => {
  const promises = usernames.map(username => getUserSubscriberTier(username));
  return await Promise.all(promises);
};
```

### 3. Progressive Enhancement

Show basic join message immediately, update with tier info when API returns:

```
// Immediate: "✅ Martin_Ricard joined with 200 Pixels!"
// After API: "✅ Martin_Ricard joined with 200 Pixels! 🌟 Tier 3 bonus: 1.5x rewards!"
```

## Related Files

- **widget/heist-widget.js** - Main implementation
- **widget/fields.json** - Tier multiplier configuration
- **docs/SUBSCRIBER-BONUS-GUIDE.md** - User configuration guide
- **docs/API-MIGRATION.md** - Historical context of API changes

## References

- [StreamElements API Documentation](https://dev.streamelements.com/)
- [Twitch Subscription Tiers](https://help.twitch.tv/s/article/subscription-levels)
