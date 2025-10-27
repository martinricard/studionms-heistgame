# API Migration Guide

This document explains the changes from the old StreamElements API to the new one.

## Overview

- **Old Documentation**: https://docs.streamelements.com/api (deprecated)
- **New Documentation**: https://dev.streamelements.com/ (current)

## What Changed in This Widget

### 1. API Documentation Reference

**Before**:
```javascript
// Old API docs at docs.streamelements.com/api
```

**After**:
```javascript
// New API docs at https://dev.streamelements.com/
```

### 2. Points System

**Before** (Not Implemented):
```javascript
// Assumed SE_API.points.add() and SE_API.points.remove()
// These methods were never fully documented
```

**After** (Now Implemented):
```javascript
// Using SE_API.store for persistent storage
const points = await SE_API.store.get('userPointsDB') || {};
pointsDB[userId] = currentPoints + winnings;
await SE_API.store.set('userPointsDB', pointsDB);
```

### 3. User Identification

**Before**:
```javascript
// Only used username
const username = event.data.displayName || event.data.username;
```

**After**:
```javascript
// Now tracks userId for persistent storage
const username = event.data.displayName || event.data.username;
const userId = event.data.userId;
```

### 4. Configuration System

**Before**:
```javascript
// Hardcoded CONFIG object
const CONFIG = {
  minBet: 10,
  // ... etc
};
```

**After**:
```javascript
// Field JSON loaded dynamically
let CONFIG = { /* defaults */ };

window.addEventListener('onWidgetLoad', function(obj) {
  if (obj.detail && obj.detail.fieldData) {
    CONFIG = {...CONFIG, ...obj.detail.fieldData};
  }
});
```

## SE_API Methods Used

### Chat Integration
```javascript
SE_API.sendMessage(message)
```
Sends a message to chat. Works the same in both old and new API.

**Usage**:
```javascript
SE_API.sendMessage('🎮 Heist started!');
```

### Persistent Storage (NEW)
```javascript
await SE_API.store.get(key)
await SE_API.store.set(key, value)
```

Stores data persistently across widget reloads.

**Usage**:
```javascript
// Get data
const data = await SE_API.store.get('myData') || {};

// Set data
await SE_API.store.set('myData', { points: 100 });
```

### Event System
```javascript
window.addEventListener('onEventReceived', handler)
window.addEventListener('onWidgetLoad', handler)
```

These events work the same in both APIs.

## Field JSON Configuration

This is a feature that was always available but is now better documented in the new developer portal.

### Structure
```json
{
  "fieldName": {
    "type": "number|text|slider|dropdown|...",
    "label": "Display Name",
    "value": "default value",
    "group": "Settings Group"
  }
}
```

### Accessing Field Data
```javascript
window.addEventListener('onWidgetLoad', function(obj) {
  const fieldData = obj.detail.fieldData;
  // fieldData contains all values from Fields JSON
});
```

## Migration Checklist

If you're updating from an older version of this widget:

- [x] Update API documentation links to https://dev.streamelements.com/
- [x] Replace hardcoded points system with SE_API.store
- [x] Add userId tracking for persistent user data
- [x] Implement Field JSON configuration
- [x] Add async/await for store operations
- [x] Update error handling for API calls

## Breaking Changes

### None for End Users!

The widget still works the same way from a user perspective:
- `!heist` still starts heists
- `!join [amount] [risk]` still joins heists
- All chat responses work the same

### For Developers

If you were modifying the widget code:

1. **CONFIG is now mutable** (`let` instead of `const`)
2. **Points are tracked internally** (not via external SE loyalty system)
3. **Functions are async** where they interact with SE_API.store
4. **Field JSON required** for Settings panel to work

## Benefits of New API

### 1. Better Documentation
- Clear API reference at https://dev.streamelements.com/
- Examples and tutorials
- Community support

### 2. Persistent Storage
- Store data that survives widget reload
- Track user points reliably
- No external dependencies

### 3. Field JSON Integration
- No code editing for configuration
- User-friendly settings panel
- Organized groups and sliders

### 4. Better Developer Experience
- Async/await support
- Promise-based APIs
- Modern JavaScript patterns

## Testing After Migration

1. **Test chat commands**:
   ```
   !heist
   !join 100 low
   ```

2. **Test configuration**:
   - Change settings in Field JSON panel
   - Reload overlay
   - Verify new settings applied

3. **Test point persistence**:
   - Join heist, win points
   - Reload widget
   - Join another heist (should remember previous points)

4. **Test cooldowns**:
   - Join heist
   - Try joining another immediately
   - Should show cooldown message

## Resources

- [StreamElements Developer Portal](https://dev.streamelements.com/)
- [Custom Widget Tutorial](https://dev.streamelements.com/docs/widgets-elements-sdk/9do3bhwlp2fdt-introduction)
- [Widget API Reference](https://dev.streamelements.com/docs/widgets-elements-sdk/)
- [Discord Support](https://discord.com/invite/se)

## Future Considerations

The new API opens possibilities for:
- Integration with native SE loyalty points system
- Webhook support for external systems
- Better analytics and tracking
- Real-time data synchronization

Stay updated at https://dev.streamelements.com/ for new features!

---

**Questions?** Check the [StreamElements Discord](https://discord.com/invite/se) for community support.
