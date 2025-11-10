# 🎨 Futuristic UI Reference Guide
## For ElectionPH Project Implementation

**Source:** Futuristic-main (Gatsby + Arwes React UI)
**Purpose:** Design reference for ElectionPH WebGIS application
**Generated:** November 2025

---

## 📦 Core Dependencies

### Animation & UI Libraries
- **animejs** (v3.0.1) - Primary animation library for SVG paths, transforms, and transitions
- **howler** (v2.1.1) - Sound management and playback
- **react-jss** (v8.6.1) - CSS-in-JS styling solution
- **polished** (v2.3.1) - Color manipulation utilities (rgba, lighten, etc.)
- **classnames** (v2.2.6) - Dynamic className management

---

## 🎨 Color Palette

### Primary Colors (Text & UI Elements)
```javascript
primary: {
  dark: '#bbbbbb',   // Secondary text, borders
  main: '#eeeeee',   // Primary text
  light: '#ffffff'   // Highlights
}
```

### Secondary Colors (Accent & Interactive)
```javascript
secondary: {
  dark: '#19a0b3',   // Dark cyan accent
  main: '#27e1fa',   // Bright cyan - primary accent color
  light: '#7eecfb'   // Light cyan highlights
}
```

### Tertiary Colors (Warning/Emphasis)
```javascript
tertiary: {
  dark: '#b5a005',   // Dark yellow
  main: '#fae127',   // Bright yellow - hover states
  light: '#feec67'   // Light yellow highlights
}
```

### Background Colors
```javascript
background: {
  dark: '#000000',   // Pure black - base layer
  main: '#02161a',   // Very dark teal - main background
  light: '#043b3b'   // Dark teal - elevated surfaces
}
```

### Text & Links
```javascript
heading: {
  main: '#eeeeee'    // Heading color
}

text: {
  main: '#cccccc'    // Body text color
}

link: {
  dark: '#55cbd0',   // Link hover/active
  main: '#87f7fc',   // Link default
  light: '#aff3f6'   // Link visited/light
}
```

### Opacity Values
```javascript
accent: 0.2,  // For accent overlays
alpha: 0.5    // For transparent backgrounds
```

---

## 🖋️ Typography

### Font Families
```javascript
primary: 'Orbitron, sans-serif',      // Headings, emphasis
secondary: 'Electrolize, sans-serif'  // Body text
```

**Implementation Note:** These are futuristic Google Fonts
- **Orbitron:** Geometric sans-serif with a tech/futuristic feel
- **Electrolize:** Clean, modern sans-serif with digital aesthetics

---

## ⏱️ Animation System

### Core Timing Values
```javascript
animation: {
  time: 250,      // Base animation duration (ms)
  stagger: 50     // Delay between sequential animations (ms)
}
```

### Common Animation Patterns

#### 1. **SVG Path Drawing (Stroke Dashoffset)**
```javascript
// Enter animation
anime({
  targets: paths,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'linear',
  duration: duration
});

// Exit animation
anime({
  targets: paths,
  strokeDashoffset: [anime.setDashoffset, 0],
  direction: 'reverse',
  easing: 'linear',
  duration: duration
});
```

#### 2. **Fade In/Out**
```javascript
// Fade in
anime({
  targets: element,
  opacity: [0, 1],
  easing: 'easeOutCubic',
  duration: 250
});

// Fade out
anime({
  targets: element,
  opacity: [1, 0],
  easing: 'easeInCubic',
  duration: 250
});
```

#### 3. **Slide Animations**
```javascript
// Slide down from top
anime({
  targets: element,
  translateY: ['-100%', 0],
  easing: 'easeOutCubic',
  duration: duration
});
```

#### 4. **Typing Effect (Text Animation)**
```javascript
// Character-by-character reveal
const realDuration = (1000 / 60) * textLength; // 60 FPS
const duration = Math.min(realDuration, 250);

// Two modes:
// TRANSITION: Simple reveal from start to end
// TRANSFORM: Random characters morphing into real text
```

#### 5. **Pulsing/Fading Loop**
```javascript
anime({
  keyframes: [
    { opacity: 1, duration: time / 3 },
    { opacity: 0, duration: time / 5 },
    { opacity: 1, duration: time / 2 }
  ],
  easing: 'easeOutCubic'
});
```

### Common Easing Functions
- `linear` - Constant speed (SVG path drawing)
- `easeOutCubic` - Fast start, slow end (entrances)
- `easeInCubic` - Slow start, fast end (exits)
- `easeInOutQuad` - Smooth acceleration/deceleration (general)

---

## 🔊 Sound System

### Sound Configuration
```javascript
settings: {
  volume: 0.3  // Global volume (30%)
}
```

### Available Sound Effects

| Sound Effect | File | Volume | Usage |
|--------------|------|--------|-------|
| **logo** | `/sounds/logo.mp3` | 0.3 | Logo/brand animation entry |
| **start** | `/sounds/start.mp3` | 0.15 | Background circuit animations |
| **typing** | `/sounds/typing.mp3` | 0.3 | Text character-by-character reveal |
| **fade** | `/sounds/fade.mp3` | 0.3 | Fade in/out transitions |
| **deploy** | `/sounds/deploy.mp3` | 0.3 | Header deployment animation |
| **expand** | `/sounds/expand.mp3` | 0.3 | Panel/section expansions |
| **hover** | `/sounds/hover.mp3` | 0.3 | Button/link hover states |
| **click** | `/sounds/click.mp3` | 0.3 | Button/link clicks |

### Sound Implementation Pattern
```javascript
// Using Howler.js
import { Howl } from 'howler';

const sound = new Howl({
  src: ['/sounds/hover.mp3'],
  volume: 0.3
});

// Play on interaction
element.onMouseEnter(() => sound.play());

// Stop when needed
sound.stop();

// Check if playing
if (!sound.playing()) {
  sound.play();
}
```

---

## 🧩 Component Patterns

### 1. **Background Component**
Animated circuit board pattern background with SVG lines and dots

**Key Features:**
- Radial gradient light effects
- Horizontal striped lines (10px spacing)
- Random dotted vertical/horizontal lines
- Animated circuit paths with traveling lights
- Stand-by animation (pulsing circuit highlights)

**Colors Used:**
```javascript
backgroundColor: color.background.dark  // #000000
radialGradient: rgba(color.secondary.main, 0.1)  // Cyan glow
horizontalLines: color.background.main  // #02161a
dotLines: color.background.light  // #043b3b
circuitLines: color.background.light  // #043b3b
circuitHighlight: color.secondary.main  // #27e1fa (traveling light)
```

**Animation:**
- Circuit paths draw from left to right using strokeDashoffset
- Duration calculated based on path length (max 2000ms)
- Random 2-4 circuits pulse during stand-by mode

---

### 2. **Header Component**
Animated SVG header with geometric shapes (slanted edges)

**Structure:**
- Full-width SVG background with angled bottom edges
- Contains Brand (logo) and Menu components
- Max width: 1000px centered

**Animation Pattern:**
```javascript
// Slide down from top
anime({
  targets: header,
  translateY: ['-100%', 0],
  easing: 'easeOutCubic',
  duration: 1000  // 4x base time on desktop, 2x on mobile
});

// Path sequences:
// 1. Horizontal lines (left + right)
// 2. Diagonal slashes (tertiary color #fae127)
// 3. Center horizontal lines
```

**Colors:**
```javascript
background: rgba(color.background.dark, alpha)  // Semi-transparent black
borderLines: rgba(color.primary.dark, 0.5)  // Gray borders
slashes: color.tertiary.main  // Yellow #fae127
```

**Sound:** `deploy.mp3` plays during slide animation

---

### 3. **Button Component**
SVG-bordered button with corner accent lines

**Structure:**
```html
<button>
  <div class="background" />  <!-- Colored overlay -->
  <svg class="frame">  <!-- Corner borders -->
    <path d="M0,0 L100,0 L100,100" />  <!-- Top-right corner -->
    <path d="M100,100 L0,100 L0,0" />  <!-- Bottom-left corner -->
  </svg>
  <div class="main">
    <Text>{children}</Text>
  </div>
</button>
```

**Style:**
```javascript
color: color.secondary.main  // #27e1fa (cyan)
background: rgba(color.secondary.main, 0.125)  // 12.5% opacity
borderStroke: rgba(color.secondary.dark, 0.5)  // Semi-transparent dark cyan

// Hover state:
color: color.tertiary.main  // #fae127 (yellow)
background: rgba(color.tertiary.main, 0.125)
borderStroke: rgba(color.tertiary.dark, 0.5)
```

**Animation:**
- SVG paths draw on enter using strokeDashoffset
- Fade in background simultaneously
- Reverse on exit

**Interaction:**
- `onMouseEnter`: Play `hover.mp3` sound

---

### 4. **Brand/Logo Component**
Animated SVG text logo with stroke-drawing effect

**Pattern:**
```javascript
// SVG text as outlined paths
<svg viewBox="0 0 1400 92">
  <path d="..." />  // Each letter as a path
</svg>

// Style:
fill: none
stroke: color.heading.main  // #eeeeee
strokeWidth: 12
strokeLinecap: round
strokeLinejoin: round
filter: drop-shadow(0 0 1.5px ${color.secondary.main})  // Cyan glow

// Hover:
stroke: color.secondary.main  // #27e1fa
```

**Animation:**
```javascript
// Staggered letter reveal
anime({
  targets: paths,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'linear',
  delay: (path, index) => index * 50,  // 50ms stagger
  duration: path => path.getTotalLength()  // Based on path length
});
```

**Sound:**
- Entry: `logo.mp3`
- Exit: `fade.mp3`
- Hover: `hover.mp3`

---

### 5. **Text Component**
Animated text with typing/morphing effect

**Two Animation Modes:**

#### TRANSITION (Simple reveal)
```javascript
// Characters appear one by one from left to right
"" → "E" → "El" → "Ele" → "Elek" → "Eleksyon"
```

#### TRANSFORM (Matrix-style)
```javascript
// Random characters morph into real text
"!@#$%^&" → "El#$%^&" → "Elek%^&" → "Eleksyon"
```

**Configuration:**
```javascript
randomCharacters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
duration: Math.min((1000/60) * textLength, 250)  // Character-based, max 250ms
```

**Sound:** `typing.mp3` during animation

**CSS Pattern:**
```javascript
// Hidden state (before animation)
visibility: hidden

// During animation
position: relative
.actualText { visibility: hidden }  // Hide real text
.overlay {
  position: absolute
  top: 0
  left: 0
}
.overlayText { /* Animated text visible here */ }
```

---

### 6. **Fader Component**
Pulsing fade transition wrapper

**Animation Pattern:**
```javascript
// Enter: Pulse in
{ opacity: 1, duration: time / 3 },
{ opacity: 0, duration: time / 5 },
{ opacity: 1, duration: time / 2 }

// Exit: Pulse out
{ opacity: 0, duration: time / 3 },
{ opacity: 1, duration: time / 5 },
{ opacity: 0, duration: time / 2 }
```

**Usage:** Wraps content to add pulsing transition effect
**Sound:** `fade.mp3`

---

## 🎭 Animation State System

### Energy States
Components use an "energy" system to manage animation lifecycle:

```javascript
// States
ENTERING  // Animation starting
ENTERED   // Animation complete, visible
EXITING   // Exit animation starting
EXITED    // Exit complete, hidden

// State object
energy: {
  animate: true,      // Enable/disable animations
  show: true,         // Visibility state
  independent: false, // Ignore parent energy context
  entering: boolean,  // Currently entering
  entered: boolean,   // Fully entered
  exiting: boolean,   // Currently exiting
  exited: boolean,    // Fully exited
  duration: {
    enter: 250,       // Enter duration (ms)
    exit: 250,        // Exit duration (ms)
    stagger: 50       // Stagger delay (ms)
  }
}
```

### Parent-Child Animation Context
```javascript
// Parent component provides energy context
<AnimationContext.Provider value={energy}>
  {children}
</AnimationContext.Provider>

// Child components subscribe to parent energy
const parentEnergy = useContext(AnimationContext);

// Children only animate when parent is entered
canShow() {
  return parentEnergy.entered && this.props.show;
}
```

---

## 🎨 Common CSS Patterns

### 1. **Glowing Effects**
```javascript
// Text glow
filter: `drop-shadow(0 0 1.5px ${color.secondary.main})`

// Box shadow glow
boxShadow: `0 0 1px ${rgba(color.background.main, alpha)}`
```

### 2. **Transitions**
```javascript
// Color transitions
transition: `color ${theme.animation.time}ms ease-out`
transition: `stroke ${theme.animation.time}ms ease-out`
transition: `background ${theme.animation.time}ms ease-out`
```

### 3. **Absolute Positioning Pattern**
```javascript
positioned: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

// Then extend:
root: {
  composes: '$positioned',
  zIndex: 0,
  // ... additional styles
}
```

### 4. **Flexbox Layout**
```javascript
// Vertical stack
{
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}

// Horizontal with space between
{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}
```

### 5. **Responsive Breakpoints**
```javascript
// Mobile-first approach
'@media screen and (min-width: 768px)': {
  // Tablet styles
}

'@media screen and (min-width: 1025px)': {
  // Desktop styles
}
```

---

## 📐 Layout Structure

```
┌──────────────────────────────────────┐
│ Header (Animated SVG border)         │
│ ┌────────┐              ┌─────────┐  │
│ │ Brand  │              │  Menu   │  │
│ └────────┘              └─────────┘  │
├──────────────────────────────────────┤
│                                      │
│ Content Area                         │
│ (Scrollable)                         │
│                                      │
│                                      │
│                                      │
├──────────────────────────────────────┤
│ Footer (Similar SVG border)          │
└──────────────────────────────────────┘

Background: Animated circuit board pattern (fixed)
Max content width: 1000px (centered)
```

---

## 🎯 Implementation Recommendations for ElectionPH

### 1. **Color Adaptation**
Consider adapting the color scheme to match Philippine election themes:
- Keep the futuristic cyan (`#27e1fa`) for interactive elements
- Consider replacing tertiary yellow with Philippine flag colors:
  - Blue: `#0038a8` (for one political party/candidate)
  - Red: `#ce1126` (for another political party/candidate)
  - Yellow: `#fcd116` (for warnings/emphasis)

### 2. **Typography**
- Use **Orbitron** for headings, map title, mode switcher
- Use **Electrolize** for data labels, popup content, legend text

### 3. **Animations to Prioritize**
- **SVG path drawing** for map boundaries when switching modes
- **Typing effect** for loading messages ("Loading Barangay data...")
- **Fade transitions** when switching between modes
- **Circuit background** as main app background (low opacity)

### 4. **Sound Integration**
Suggested sound mapping for ElectionPH:
- `start.mp3` → Map initialization
- `expand.mp3` → Popup opening
- `hover.mp3` → Hovering over regions
- `click.mp3` → Selecting a region / switching modes
- `typing.mp3` → Search bar typing
- `fade.mp3` → Mode transitions

### 5. **Component Priorities**
Implement these components first:
1. **Background** → Main app background with circuit pattern
2. **Button** → For mode switcher (Barangay/Municipality/Provincial)
3. **Text** → For animated labels and titles
4. **Fader** → For chart popup transitions
5. **Brand** → For "ElectionPH" or "eleksyon.ph" logo

### 6. **Performance Considerations**
- Use `animate: false` on mobile devices to reduce CPU usage
- Reduce `initialMaxDuration` for circuit animations on slower devices
- Consider disabling sounds on mobile (or making them opt-in)

---

## 🔧 Technical Setup

### Installing Dependencies
```bash
npm install animejs howler polished classnames
# or
npm install animejs @types/animejs  # if using TypeScript
```

### Basic Animation Setup
```javascript
import anime from 'animejs';

// Simple fade in
anime({
  targets: '.element',
  opacity: [0, 1],
  duration: 250,
  easing: 'easeOutCubic'
});

// SVG path drawing
anime({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'linear',
  duration: 1000
});
```

### Sound Setup
```javascript
import { Howl } from 'howler';

const sounds = {
  hover: new Howl({
    src: ['/sounds/hover.mp3'],
    volume: 0.3
  })
};

// Play on interaction
element.addEventListener('mouseenter', () => {
  sounds.hover.play();
});
```

---

## 📚 Reference Links

- **AnimeJS Documentation:** https://animejs.com/documentation/
- **Howler.js Documentation:** https://howlerjs.com/
- **Polished Documentation:** https://polished.js.org/docs/
- **Orbitron Font:** https://fonts.google.com/specimen/Orbitron
- **Electrolize Font:** https://fonts.google.com/specimen/Electrolize

---

## 🎬 Animation Showcase Examples

### Header Deployment Sequence
```
1. Header slides down from top (-100% → 0)
2. Background path fades in (0 → 1)
3. Left/right border lines draw (strokeDashoffset)
4. Diagonal slashes draw (yellow tertiary color)
5. Center lines draw
Total duration: ~1000ms (desktop)
Sound: deploy.mp3
```

### Logo Reveal Sequence
```
1. Logo plays entry sound (logo.mp3)
2. Each letter's path draws in sequence
3. 50ms stagger between letters
4. Duration based on path length
5. Glow effect visible throughout
Total duration: ~820ms
```

### Text Typing Effect
```
1. Typing sound starts (typing.mp3)
2. Characters appear one-by-one (60 FPS)
3. OR random characters morph to real text
4. Duration: min(textLength * 16.67ms, 250ms)
5. Sound stops when complete
```

### Background Circuit Pulse
```
1. Circuit paths draw on initial load
2. After completion, enter "stand-by mode"
3. Random 2-4 circuits selected
4. Light travels along path (stroke-dasharray animation)
5. Loop continuously with random selection
Sound: start.mp3 on initial load
```

---

**End of Reference Document**
*Use this guide to implement futuristic UI elements in the ElectionPH project while maintaining the core WebGIS functionality.*
