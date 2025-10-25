# Changelog

All notable changes to the StreamElements Heist Widget project.

## [2.1.0] - 2025-10-25

### 🎯 Major Refactor: Separated Files & Professional Field Layout

#### Added
- **Separated File Structure**
  - `heist-widget.html` - Clean HTML with external file references
  - `heist-widget.css` - Complete stylesheet in separate file
  - `heist-widget.js` - Full JavaScript logic in separate file
  - Better code organization and maintainability

- **Professional Field JSON Layout**
  - Emoji icons for visual organization (⚙️ 💬 🎯 ⚡ 🔥 💾)
  - Hidden separator fields for section headers
  - Better grouped settings with clear labels
  - Dropdown menus for yes/no options
  - Improved user experience in settings panel

- **Enhanced Chat Command System**
  - Switched to proper StreamElements listener pattern
  - `listener === 'message'` instead of `event.type === 'message'`
  - Configurable command triggers (customizable `!heist` and `!join`)
  - Better command parsing and validation
  - Matches D2 Loadout Widget command handling pattern

- **New Configuration Options**
  - `commandHeist` - Customize start command (default: !heist)
  - `commandJoin` - Customize join command (default: !join)
  - `enablePointTracking` - Toggle point tracking on/off
  - `enableWelcome` - Toggle welcome message on/off
  - `msgNoParticipants` - Message when no one joins

#### Changed
- **HTML Structure**
  - Now uses `<link>` to load external CSS
  - Now uses `<script>` to load external JavaScript
  - Minimal inline code for better readability

- **JavaScript Improvements**
  - Uses `fieldData` object throughout (not `CONFIG`)
  - Proper event destructuring: `const { listener, event } = obj.detail`
  - Better logging with widget name prefix
  - Staggered result messages (500ms delay between each)
  - Improved error handling and fallbacks

- **Field JSON Organization**
  - ⚙️ Settings - General configuration (min/max bet, cooldown, duration)
  - 💬 Commands - Chat command customization  
  - 🎯 Low Risk - Low risk heist settings
  - ⚡ Medium Risk - Medium risk heist settings
  - 🔥 High Risk - High risk heist settings
  - 💾 Points - Point tracking toggle
  - 💬 Messages - All chat messages with placeholders
  - ℹ️ Info - Version information

- **Message Handling**
  - All messages now use `fieldData` directly
  - Default values set in JavaScript if field empty
  - Better placeholder replacement
  - Staggered result announcements

#### Technical Improvements
- **Code Quality**
  - Professional file comments with version numbers
  - Better function documentation
  - Consistent naming conventions
  - Separation of concerns (HTML/CSS/JS)

- **Event Handling**
  - Matches StreamElements best practices
  - Same pattern as D2 Loadout Widget
  - Better event listener structure
  - Proper object destructuring

- **Configuration Management**
  - Direct use of `fieldData` object
  - No need for CONFIG merging
  - Simpler and more reliable
  - Better default value handling

#### Fixed
- Chat commands not triggering properly
- Configuration not applying correctly
- Code organization issues
- Field JSON layout clarity

### 📝 Documentation
- Updated README.md with separated file structure
- Updated QUICK-START.md with new setup process
- Updated FIELD-JSON-GUIDE.md with professional layout
- Updated API-MIGRATION.md with new patterns
- Updated config-examples.md for clarity

### 🎮 Setup Changes
**New Setup Process**:
1. Paste `heist-widget.html` into HTML/CSS tab
2. Paste `heist-widget.css` into CSS tab (if separated)
3. Paste `heist-widget.js` into JS tab (if separated)
4. Paste `fields.json` into Fields tab
5. Configure via Settings panel

**Note**: StreamElements custom widgets may require all code in one HTML file. Check documentation for combining files if needed.

---

## [2.0.0] - 2025-10-25

### 🎉 Major Update: Field JSON Configuration & New API

#### Added
- **Field JSON Configuration System**
  - `fields.json` file with complete UI configuration
  - Settings panel accessible via widget gear icon
  - Sliders for success rates and multipliers
  - Text fields for custom messages
  - Number inputs for bet limits and cooldowns
  - Organized setting groups (General, Risk Levels, Messages)

- **New StreamElements API Integration**
  - Updated to use https://dev.streamelements.com/
  - Implemented `SE_API.store.get()` for persistent storage
  - Implemented `SE_API.store.set()` for data persistence
  - Added userId tracking for reliable point management
  - Async/await support for API operations

- **Enhanced Points System**
  - Points stored in `SE_API.store` under 'userPointsDB'
  - Persistent across widget reloads
  - Automatic point validation before joining
  - Proper point addition/deduction on heist results

- **Comprehensive Documentation**
  - `QUICK-START.md` - 5-minute setup guide
  - `FIELD-JSON-GUIDE.md` - Configuration tutorial
  - `API-MIGRATION.md` - API update documentation
  - `PROJECT-COMPLETE.md` - Project overview
  - Updated `README.md` with Field JSON instructions
  - Enhanced `config-examples.md` with Field JSON format

#### Changed
- **Configuration System**
  - Changed `CONFIG` from `const` to `let` for dynamic updates
  - Flattened configuration structure for Field JSON compatibility
  - Risk levels now configured via individual fields
  - Messages now use `msg` prefix (e.g., `msgHeistStart`)
  - Success rates now in percentage (0-100) instead of decimal (0.0-1.0)

- **Function Signatures**
  - `joinHeist()` now accepts `userId` parameter
  - `executeHeist()` now async for store operations
  - Added error handling for API calls

- **Code Organization**
  - Added `getRiskLevels()` helper function
  - Improved error messages and logging
  - Better code comments and structure

#### Fixed
- Points not persisting across widget reloads
- User point validation before joining heists
- Cooldown tracking reliability
- Configuration not applying from Field JSON

#### Documentation
- Added 5 comprehensive documentation files
- Updated all code examples
- Added troubleshooting sections
- Included configuration presets
- Created quick reference guides

### Technical Details
- **Breaking Changes**: None for end users (commands work the same)
- **Breaking Changes for Developers**: CONFIG structure changed, see API-MIGRATION.md
- **API Version**: StreamElements Developer API (dev.streamelements.com)
- **Storage**: SE_API.store instead of localStorage
- **Configuration**: Field JSON instead of hardcoded values

---

## [1.0.0] - Initial Release

### Added
- Basic heist game functionality
- Three risk levels (low, medium, high)
- Chat command integration (!heist, !join)
- Cooldown system
- Random outcome generation
- Customizable messages
- Basic configuration via code editing

### Features
- Text-based gameplay in chat
- Timed heist execution (60 seconds)
- Success/failure with multipliers
- Cooldown tracking (in-memory)
- Manual configuration in code

---

## Migration Guide

### From 1.0.0 to 2.0.0

**For Users** (No breaking changes):
- Commands still work the same
- Chat responses identical
- Gameplay unchanged

**For Developers**:
1. Update API reference links
2. Add `fields.json` to widget
3. Update CONFIG structure
4. Make functions async where needed
5. Use SE_API.store for persistence

See [`API-MIGRATION.md`](API-MIGRATION.md) for detailed migration steps.

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version: Incompatible API changes
- **MINOR** version: Backward-compatible functionality additions
- **PATCH** version: Backward-compatible bug fixes

---

## Upgrade Instructions

### Upgrading from v1.0.0 to v2.0.0

1. **Backup your current widget** (if customized)
2. **Replace widget code**:
   - Delete old HTML code
   - Paste new `heist-widget.html`
3. **Add Field JSON**:
   - Paste `fields.json` into Fields tab
4. **Configure settings**:
   - Click widget → Settings
   - Adjust to match your old settings
5. **Test thoroughly**:
   - Try `!heist` and `!join` commands
   - Verify points tracking
   - Check cooldowns

### What You Keep
- ✅ All chat commands work the same
- ✅ Viewer experience unchanged
- ✅ Same gameplay mechanics

### What's New
- ✅ Easy configuration via UI
- ✅ Persistent point storage
- ✅ Better API integration
- ✅ Comprehensive documentation

---

## Future Roadmap

### Planned Features
- [ ] Native SE loyalty points integration option
- [ ] Team heist mode (pool points together)
- [ ] Streak bonuses for consecutive wins
- [ ] Leaderboard tracking
- [ ] Special event modes with boosted rewards
- [ ] Sound effect integration
- [ ] Optional visual overlay notifications
- [ ] Heist history and statistics
- [ ] Multiple heist modes (speed run, endurance, etc.)
- [ ] Custom achievement system

### Under Consideration
- [ ] Multi-language support
- [ ] Webhook integration for external systems
- [ ] Mobile-friendly configuration interface
- [ ] Analytics dashboard
- [ ] Tournament mode

---

## Support & Community

- **Issues**: Check documentation first (README.md, QUICK-START.md)
- **Questions**: [StreamElements Discord](https://discord.com/invite/se)
- **API Docs**: https://dev.streamelements.com/
- **Updates**: Watch this changelog for new versions

---

*Keep this file updated with each release!*
