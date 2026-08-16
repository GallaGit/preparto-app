---
name: PreParto Liquid Glass
colors:
  surface: '#fff8f7'
  surface-dim: '#e8d6d6'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f0'
  surface-container: '#fceae9'
  surface-container-high: '#f6e4e4'
  surface-container-highest: '#f0dede'
  on-surface: '#221919'
  on-surface-variant: '#524343'
  inverse-surface: '#382e2e'
  inverse-on-surface: '#ffedec'
  outline: '#847373'
  outline-variant: '#d6c2c1'
  surface-tint: '#874f4f'
  primary: '#874f4f'
  on-primary: '#ffffff'
  primary-container: '#e8a2a2'
  on-primary-container: '#6a3738'
  inverse-primary: '#fcb4b4'
  secondary: '#665c5c'
  on-secondary: '#ffffff'
  secondary-container: '#eedfdf'
  on-secondary-container: '#6c6262'
  tertiary: '#5f5e5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#b6b4b0'
  on-tertiary-container: '#464643'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#fcb4b4'
  on-primary-fixed: '#360e10'
  on-primary-fixed-variant: '#6b3839'
  secondary-fixed: '#eedfdf'
  secondary-fixed-dim: '#d1c3c3'
  on-secondary-fixed: '#211a1a'
  on-secondary-fixed-variant: '#4e4545'
  tertiary-fixed: '#e5e2de'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c1a'
  on-tertiary-fixed-variant: '#474744'
  background: '#fff8f7'
  on-background: '#221919'
  surface-variant: '#f0dede'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  margin-mobile: 20px
  margin-desktop: 64px
  gutter: 16px
---

## Brand & Style
The design system for this pregnancy companion app is built on a "Soft Liquid Glass" aesthetic. The brand personality is profoundly calm, nurturing, and premium, designed to provide a reassuring sanctuary for expectant parents. 

The style utilizes a sophisticated evolution of **Glassmorphism**, moving away from high-contrast neon and toward organic, luminous textures. It features translucent layers, high-quality frosted glass effects, and delicate specular highlights that mimic the play of light on soft surfaces. The UI prioritizes negative space and a sense of "airiness" to reduce cognitive load during a transformative life stage.

## Colors
The palette is rooted in warmth and organic softness. 
- **Rose Accent (#E8A2A2):** Used sparingly for primary actions, progress indicators, and meaningful highlights.
- **Warm Blush (#FFF0F0) & Soft Cream (#FDFAF6):** These serve as the foundation of the app, creating a subtle gradient background that feels more natural than pure white.
- **Translucent White (#FFFFFFB3):** The primary material for glass surfaces, providing a light blur effect that allows background colors to bleed through softly.
- **Neutral (#6B5E5E):** A soft, warm grey used for text to ensure high legibility without the harshness of pure black.

This system does not support dark mode to maintain the clean, daylight-inspired sense of serenity.

## Typography
The typography balances editorial elegance with modern clarity. 
- **Playfair Display** provides an authoritative yet graceful serif voice for headlines, creating a premium "journal" feel.
- **Outfit** is used for all functional and body text. Its geometric but soft curves complement the roundedness of the UI elements while maintaining exceptional readability for long-form pregnancy advice.

Ensure that `display-lg` is only used on splash screens or major section headers to maintain the minimalist aesthetic.

## Layout & Spacing
The layout follows a fluid-to-fixed model. On mobile, it utilizes a generous 20px side margin to ensure content doesn't feel cramped against the screen edges. 

The rhythm is "airy," meaning vertical spacing between unrelated sections should default to `xl` (32px) or `xxl` (48px) to reinforce the calm mood. Components should use internal padding of at least `lg` (24px) to ensure touch targets are comfortable and the "liquid" feel is preserved.

## Elevation & Depth
Depth is achieved through material properties rather than traditional shadows.
- **Glass Surfaces:** Use a backdrop-filter (blur: 12px to 20px) combined with the semi-translucent white fill.
- **Borders:** Every glass container must have a 1px solid border in `glass_border_hex` (white at 20% opacity). This creates a "specular highlight" on the edge that defines the shape.
- **Floating Effect:** Use a very soft, large-radius shadow (Blur: 40px, Opacity: 4%) with a hint of the primary rose tint to make cards appear as if they are floating gently above the warm background.
- **Layering:** Avoid stacking more than two layers of glass to prevent the UI from becoming muddy.

## Shapes
The shape language is dominated by **2XL rounded corners (24px)**. This high degree of roundedness is essential to the "Liquid" theme, evoking organic forms rather than industrial ones.
- **Cards & Banners:** Always use 24px (1.5rem).
- **Buttons & Inputs:** Use 16px (1rem) to maintain a cohesive look while providing a distinct functional profile.
- **Selection Indicators:** Use pill-shapes (fully rounded) for small chips or tags.

## Components
- **Navigation Cards:** Large, tappable surfaces with `glass_white` backgrounds, 24px radius, and centered Playfair Display titles. They should feature a subtle 1px white border.
- **Primary Buttons:** Solid `primary_color_hex` with white text. No shadows; instead, use a soft inner glow or a very slight gradient to maintain the liquid feel.
- **Glass Banners:** Used for contextual alerts or tips. These should use a higher blur (24px) and be docked to the top or bottom of the view with zero side margins for a "seamless glass" look.
- **Input Fields:** Semi-translucent white fill with a 1px border that turns `primary_color_hex` on focus. Labels should sit outside the field in `label-sm` style.
- **Progress Indicators:** Soft, rounded tracks using `secondary_color_hex` with a `primary_color_hex` fill.
- **Selection Chips:** Pill-shaped glass elements. When selected, they transition to a soft rose tint rather than a high-contrast state.