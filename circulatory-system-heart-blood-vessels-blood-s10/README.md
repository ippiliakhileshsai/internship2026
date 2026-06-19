# Circulatory System - Interactive Educational Website

An interactive educational resource explaining the human circulatory system with animations, interactive quiz, and health tips. Built with vanilla HTML, CSS, and JavaScript using modern glassmorphism design patterns.

## � Project Overview

This project provides a comprehensive educational introduction to the circulatory system, including:
- **Interactive animations** of blood circulation flow
- **Educational content** covering heart structure, blood vessels, and components
- **Interactive quiz** with immediate scoring feedback
- **Health tips** for maintaining cardiovascular wellness
- **Fun facts** about the circulatory system
- **Responsive design** for all device sizes

## 📁 Project Structure

```
CS/
├── index.html              # Main HTML file (site structure and all features)
├── README.md               # This documentation file
├── images/                 # Directory for high-resolution images
│   └── (place images here)
└── assets/                 # Directory for additional resources
    └── (place assets here)
```

## �️ Adding Images

To add high-resolution images to your documentation or content, follow these guidelines:

### Image Path Format (Relative Paths)
When referencing images in HTML, use relative paths from the `index.html` file:

```html
<!-- Image in images/ folder -->
<img src="images/heart-anatomy.png" alt="Heart Anatomy Diagram" />

<!-- Image in assets/ folder -->
<img src="assets/circulatory-diagram.png" alt="Circulatory System Diagram" />
```

### Recommended Image Locations

- **High-resolution diagrams**: Place in `images/` folder
- **Icons and supplementary graphics**: Place in `assets/` folder
- **Screenshot examples**: Place in `images/` folder

### Example Images to Add

Consider adding these types of images to enhance learning:

| Image Type | Suggested Filename | Location |
|---|---|---|
| Heart anatomy diagram | `heart-anatomy.png` | images/ |
| Blood circulation flow | `circulation-flow.png` | images/ |
| Blood vessel types | `vessel-types.png` | images/ |
| Circulatory system overview | `circulatory-system.png` | images/ |

### How to Add Images to HTML

Update `index.html` to include images in appropriate sections. Example:

```html
<!-- In the Heart Structure Section -->
<section id="heart-structure" class="container glass">
  <h3>Heart Structure and Function</h3>
  <img src="images/heart-anatomy.png" alt="Heart with 4 chambers and 4 valves" />
  <p>The heart is a muscular pump with four chambers...</p>
  <!-- rest of content -->
</section>
```

## 📝 Code Structure

### HTML Sections
- **Header**: Site title and tagline
- **Hero**: Featured introduction with SVG heart illustration
- **Introduction**: What and why of the circulatory system
- **Components**: Main parts (heart, blood, vessels)
- **Heart Structure**: Detailed breakdown of chambers and valves
- **Blood Circulation**: Step-by-step animated flow process
- **Blood Vessels**: Types and functions (arteries, veins, capillaries)
- **Health Tips**: Practical cardiovascular wellness advice
- **Interactive Quiz**: Five-question assessment with scoring
- **Fun Facts**: Interesting circulatory system facts
- **Footer**: Copyright and attribution

### CSS Features
- **CSS Variables**: Centralized color and spacing tokens
- **Glassmorphism**: Modern frosted glass card effects
- **Responsive Grid**: Auto-fit card layouts
- **Animations**: Pulsing blood flow animation
- **Gradient Accents**: Modern color gradient UI elements
- **Media Queries**: Mobile and tablet optimization

### JavaScript Features
- **Flow Animation**: Cycles through circulation steps every 2.5 seconds
- **Interactive Quiz**: 
  - Multiple-choice questions
  - Answer selection and visual feedback
  - Score calculation
  - Quiz restart functionality
  - Keyboard accessibility (Enter key support)

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|---|---|---|
| Dark Blue (Primary) | `#0f2040` | Background |
| Dark Blue (Secondary) | `#071022` | Gradient background |
| Coral Red (Accent 1) | `#ff5f6d` | Buttons, highlights |
| Peach Orange (Accent 2) | `#ffc371` | Gradient accent |

### Typography
- **Font**: Inter (imported from Google Fonts)
- **Fallback**: system-ui, Roboto, Helvetica Neue
- **Sizes**: H1 (20px), H2 (34px), body (14-16px implied)

### Spacing & Layout
- **Max Width**: 1100px centered container
- **Padding**: 24px standard (16px mobile)
- **Border Radius**: 14px standard cards, 10-12px buttons
- **Gap/Spacing**: 12-24px between elements

## 🚀 Features Explained

### Interactive Flow Animation
The blood circulation section features an animated pulse that cycles through all 5 steps every 2.5 seconds, highlighting each step in sequence. The animation loops continuously.

### Quiz System
- **5 questions** covering key concepts
- **Multiple choice** answers with keyboard support
- **Visual feedback** on selected answers
- **Score display** at the end
- **Restart functionality** to retake the quiz

### Responsive Design
- **Desktop (900px+)**: Side-by-side hero layout
- **Tablet (900px)**: Stacked hero, repositioned animation
- **Mobile (480px)**: Smaller typography, reduced padding

## 📝 Making Content Updates

### Adding New Sections
1. Add HTML structure in `<main>` with appropriate section ID
2. Use `.container`, `.glass`, and `.grid` classes for styling
3. Add comments before section (<!-- ===== SECTION NAME ===== -->)
4. Add corresponding CSS in `<style>` if needed

### Updating Content
- All content sections are clearly commented
- Inline comments explain CSS variables and properties
- JavaScript functions are documented with purpose

### Customizing Colors
Edit CSS variables in `:root` at top of `<style>` tag:
```css
--accent1: #ff5f6d;  /* Change button colors */
--bg1: #0f2040;      /* Change background */
```

## 🔗 External Dependencies

- **Google Fonts**: Inter font (preconnected for performance)
- **Font Awesome**: Icon library (v6.4.0)
- **CSS**: All custom, no frameworks
- **JavaScript**: Vanilla, no libraries

## 📱 Browser Compatibility

Tested and optimized for:
- Chrome/Edge (modern versions)
- Firefox (modern versions)
- Safari (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ✅ Best Practices Used

- ✓ Semantic HTML markup
- ✓ Comprehensive code comments
- ✓ CSS variable organization
- ✓ Mobile-first responsive design
- ✓ Keyboard accessibility (Tab navigation, Enter key)
- ✓ High contrast text on backgrounds
- ✓ Performance-optimized (no heavy scripts, SVG illustrations)

## 📄 License

Educational content for learning purposes.

---

**Last Updated**: 2026-06-09  
**Version**: 1.0  
**Status**: Ready for image integration and deployment
