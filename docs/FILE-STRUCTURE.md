# StreamElements File Structure

## Important Note About StreamElements Custom Widgets

StreamElements custom widgets typically require **all code in a single HTML file** when using the Custom Code widget type. External file references (`<link>` and `<script src="">`) may not work in the StreamElements overlay environment.

## Files in This Project

### For Development/Organization (Separate Files):
- `heist-widget.html` - Clean HTML structure
- `heist-widget.css` - Styles
- `heist-widget.js` - JavaScript logic
- `fields.json` - Field JSON configuration

### For StreamElements Deployment (Combined):
You'll need to combine the files into one HTML file for StreamElements:

```html
<!-- Paste everything below into StreamElements HTML/CSS tab -->
<style>
  /* Copy content from heist-widget.css here */
</style>

<div id="heist-widget">
  <!-- HTML content -->
</div>

<script>
  /* Copy content from heist-widget.js here */
</script>
```

## Quick Deployment Guide

### Method 1: Use Combined File (Recommended for StreamElements)

1. Open `heist-widget-combined.html` (if exists)
2. Copy entire contents
3. Paste into StreamElements HTML/CSS tab
4. Copy `fields.json` contents
5. Paste into StreamElements Fields tab
6. Configure and save

### Method 2: Manually Combine Files

1. Create new file or use text editor
2. Add `<style>` tag
3. Copy/paste content from `heist-widget.css` inside `<style>` tags
4. Add HTML content from `heist-widget.html`
5. Add `<script>` tag
6. Copy/paste content from `heist-widget.js` inside `<script>` tags
7. Paste into StreamElements HTML/CSS tab
8. Add `fields.json` to Fields tab

### Method 3: Separate Tabs (If Supported)

Some StreamElements widget types support separate tabs:
- **HTML/CSS tab**: `heist-widget.html` + `heist-widget.css`
- **JS tab**: `heist-widget.js` (if available)
- **Fields tab**: `fields.json`

**Check your widget type** - Custom Code widgets may only have HTML/CSS and Fields tabs.

## File Organization Benefits

Even if StreamElements requires a combined file, keeping files separate has benefits:

✅ **Development**:
- Easier to edit and maintain
- Better syntax highlighting in editors
- Cleaner version control (Git)
- Easier to debug

✅ **Collaboration**:
- Multiple people can work on different parts
- Clear separation of concerns
- Better code reviews

✅ **Reusability**:
- CSS can be reused for other widgets
- JavaScript functions can be extracted
- Easier to create variants

## Creating Combined File

If you need a combined file for StreamElements, run:

```bash
# PowerShell
Get-Content heist-widget.html, heist-widget.css, heist-widget.js | Set-Content heist-widget-combined.html
```

Or manually combine following the structure above.

## Recommendation

**For StreamElements**: Create a combined `heist-widget-combined.html` with all styles and scripts inline.

**For Development**: Keep files separate and combine before deployment.

---

See `README.md` for full setup instructions.
