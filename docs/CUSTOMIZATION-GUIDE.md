# Heist Widget Customization Guide

## Overview
The Heist Widget now includes comprehensive customization options for fonts, colors, and styling. All settings are accessible through the StreamElements widget configuration interface.

---

## 🎨 Font Customization

### Google Fonts Integration
The widget supports **any Google Font** through StreamElements' built-in Google Font picker.

**Settings Location:** `👁️ Visual` group

### Available Font Options

1. **Font Family**
   - Type: Google Font Picker
   - Default: `Roboto`
   - Choose from 1000+ Google Fonts
   - Font is automatically loaded from Google Fonts CDN

2. **Font Weight**
   - Type: Dropdown
   - Default: `400 (Regular)`
   - Options: 100-900 (Thin to Black)
   - Available weights:
     - 100 - Thin
     - 200 - Extra Light
     - 300 - Light
     - 400 - Regular
     - 500 - Medium
     - 600 - Semi Bold
     - 700 - Bold
     - 800 - Extra Bold
     - 900 - Black

3. **Title Font Size**
   - Type: Slider
   - Default: `17px`
   - Range: 12px - 32px
   - Controls "HEIST IN PROGRESS" text size

4. **Timer Font Size**
   - Type: Slider
   - Default: `28px`
   - Range: 18px - 42px
   - Controls countdown timer size

5. **Participant Name Font Size**
   - Type: Slider
   - Default: `15px`
   - Range: 11px - 24px
   - Controls participant list text size

---

## 🌈 Color Customization

All colors can be customized using StreamElements' color picker with RGBA support.

**Settings Location:** `👁️ Visual` group

### Background Colors

1. **Background Dark Color**
   - Default: `rgba(20, 22, 36, 0.98)`
   - Top gradient color of widget background

2. **Background Light Color**
   - Default: `rgba(26, 28, 46, 0.98)`
   - Bottom gradient color of widget background

### Text Colors

3. **Primary Text Color**
   - Default: `rgba(255, 255, 255, 1)` (White)
   - Main text color (titles, participant names)

4. **Secondary Text Color**
   - Default: `rgba(180, 183, 201, 1)` (Light Gray)
   - Secondary text (point amounts, additional info)

### Accent Colors

5. **Accent Blue**
   - Default: `rgba(88, 101, 242, 1)`
   - Used in gradients and highlights

6. **Accent Purple**
   - Default: `rgba(155, 107, 255, 1)`
   - Used in gradients and participant count badge

### Risk Level Colors

7. **Low Risk Color (Green)**
   - Default: `rgba(87, 242, 135, 1)`
   - Color for low-risk heist indicators

8. **Medium Risk Color (Orange)**
   - Default: `rgba(255, 169, 77, 1)`
   - Color for medium-risk heist indicators

9. **High Risk Color (Red)**
   - Default: `rgba(237, 66, 69, 1)`
   - Color for high-risk heist indicators

### UI Elements

10. **Timer Border Color**
    - Default: `rgba(88, 101, 242, 0.4)`
    - Border color around countdown timer

---

## 📝 How to Customize

### Step 1: Access Widget Settings
1. Go to StreamElements Dashboard
2. Navigate to **Streaming Tools** → **My Overlays**
3. Select your overlay with the Heist Widget
4. Click on the Heist Widget layer
5. Click **Settings** to open configuration

### Step 2: Navigate to Visual Settings
1. Scroll to the **👁️ Visual** section
2. You'll see subsections:
   - **🎨 Font Settings**
   - **🎨 Color Customization**

### Step 3: Make Your Changes
- **Fonts:** Select from Google Fonts dropdown or type to search
- **Colors:** Click color swatches to open color picker
- **Sizes:** Drag sliders to adjust font sizes

### Step 4: Preview and Save
- Changes appear **instantly** in the editor preview
- Click **Save** when satisfied with your customization
- Test in a live stream to ensure colors work with your overlay

---

## 🎯 Recommended Presets

### Dark Theme (Default)
```
Background: Dark blue-gray gradient
Text: White/Light gray
Accents: Blue/Purple
```

### Neon Theme
```
Background Dark: rgba(10, 10, 20, 0.95)
Background Light: rgba(20, 10, 30, 0.95)
Accent Blue: rgba(0, 255, 255, 1) (Cyan)
Accent Purple: rgba(255, 0, 255, 1) (Magenta)
Font: Orbitron or Exo 2
```

### Minimal Light Theme
```
Background Dark: rgba(240, 240, 245, 0.98)
Background Light: rgba(250, 250, 255, 0.98)
Primary Text: rgba(20, 20, 30, 1) (Dark)
Secondary Text: rgba(100, 100, 120, 1)
Font: Inter or Poppins
```

### Retro Gaming
```
Background: Dark purple/blue
Font: Press Start 2P or VT323
Accent Colors: Bright green, yellow, cyan
Risk Colors: Bright saturated versions
```

---

## 💡 Tips for Best Results

### Font Selection
- **Readability:** Choose fonts with good legibility at small sizes
- **Weight:** Test different weights to ensure text is readable on stream
- **Performance:** Popular fonts load faster (cached by browsers)

### Popular Font Recommendations
- **Modern:** Roboto, Inter, Poppins, Montserrat
- **Gaming:** Orbitron, Exo 2, Audiowide, Press Start 2P
- **Elegant:** Playfair Display, Lora, Crimson Text
- **Fun:** Fredoka One, Righteous, Rubik Bubbles

### Color Selection
- **Contrast:** Ensure text is readable against backgrounds
- **Brand Matching:** Use colors that match your stream branding
- **Transparency:** Use alpha channel (RGBA) for background opacity
- **Risk Colors:** Keep them distinct (green/orange/red) for clarity

### Testing
1. Test with stream overlay active to check visibility
2. Test on different scenes (gameplay, just chatting, etc.)
3. Ask viewers if text is readable
4. Check recording/VODs to ensure colors appear correctly

---

## 🔧 Technical Details

### CSS Variables
All customizations are applied via CSS custom properties:
```css
:root {
  --font-family: [Your Font], 'Inter', sans-serif;
  --font-weight: [Your Weight];
  --title-font-size: [Your Size]px;
  /* ... and more */
}
```

### Google Fonts Loading
Fonts are loaded dynamically:
```html
<link href="https://fonts.googleapis.com/css2?family=[FontName]:wght@100;200;...;900&display=swap">
```

### Real-Time Updates
- Changes in StreamElements editor appear **immediately**
- No page refresh needed
- Live overlays update on next widget reload

---

## 🆘 Troubleshooting

### Font Not Appearing
- **Issue:** Selected font not displaying
- **Solution:** 
  - Ensure font name is spelled correctly
  - Try a different font to test
  - Check browser console for font loading errors
  - Some fonts may not support all weights

### Colors Not Updating
- **Issue:** Color changes not visible
- **Solution:**
  - Save widget settings and refresh overlay
  - Clear browser cache
  - Check if RGBA format is correct
  - Ensure opacity (alpha) is not set to 0

### Text Too Large/Small
- **Issue:** Font sizes don't fit properly
- **Solution:**
  - Adjust font size sliders
  - Consider reducing widget width in CSS
  - Test with different font weights

### Performance Issues
- **Issue:** Widget loading slowly
- **Solution:**
  - Use popular Google Fonts (they're cached)
  - Avoid overly decorative fonts
  - Keep font weight count reasonable

---

## 📞 Support

If you encounter issues with customization:
- **Email:** contact@noticemesenpai.studio
- **Website:** noticemesenpai.studio
- **Include:** Screenshots of your settings and the issue

---

## 🎉 Share Your Designs

Created an awesome theme? Share it with the community!
Tag us: **@NoticeMeSenpaiStudio**

---

*Studio NMS - Heist Game SE v0.01 (Alpha)*  
*Created with 💜 by Notice Me Senpai Studio*
