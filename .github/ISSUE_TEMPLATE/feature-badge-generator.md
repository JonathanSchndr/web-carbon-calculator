---
name: 'Feature: Embeddable Badge & Widget Generator'
about: Generate badges and widgets that websites can embed to showcase their carbon footprint
title: '[FEATURE] Embeddable Badge & Widget Generator'
labels: 'enhancement, feature'
assignees: ''
---

## Feature Description

Create a badge and widget generation system that allows website owners to display their carbon footprint metrics on their own websites. This promotes transparency and encourages others to measure their environmental impact.

## Problem Statement

Website owners who achieve good eco scores want to:
- Showcase their environmental commitment to visitors
- Build trust through transparency
- Promote sustainability in their industry
- Encourage others to measure their carbon footprint

Currently, there's no easy way to display carbon calculator results on external websites. A badge/widget system would:
- Increase visibility for the carbon calculator project
- Create viral growth (badges link back to the tool)
- Motivate continuous improvement (public accountability)
- Standardize eco-labeling across the web

## Proposed Solution

### Core Features

1. **Static Badge Generator**
   - **Simple Shield-Style Badges** (similar to shields.io):
     ```
     [Eco Grade | A+]  [CO2 | 0.24g/visit]  [Green Hosted | ✓]
     ```
   - Multiple styles:
     - Flat, flat-square, plastic, for-the-badge
     - Different color schemes
     - Light/dark mode variants
   - Formats:
     - SVG (scalable, preferred)
     - PNG (with various sizes)
     - Animated GIF (optional, for special achievements)

2. **Dynamic Widget**
   - **Embedded Mini Dashboard:**
     ```html
     ┌─────────────────────────────┐
     │  🌱 Carbon Footprint        │
     ├─────────────────────────────┤
     │  Grade: A+                  │
     │  CO2: 0.24g per visit       │
     │  Green Hosted ✓             │
     │  Verified: Dec 2025         │
     ├─────────────────────────────┤
     │  Powered by WebCarbonCalc   │
     └─────────────────────────────┘
     ```
   - Real-time or cached data
   - Responsive sizing
   - Customizable themes
   - iframe-based implementation

3. **Badge Customization Interface**
   - **Visual Editor:**
     - Live preview
     - Style selection (flat, gradient, minimal, etc.)
     - Color picker for custom colors
     - Size adjustment
     - Toggle elements (show/hide specific metrics)
     - Label customization ("Eco Score" vs "Carbon Grade")

   - **Code Generation:**
     - HTML snippet (for direct embedding)
     - Markdown (for GitHub READMEs)
     - BBCode (for forums)
     - URL-based badge (direct image link)

4. **Badge Types & Variants**

   **A. Grade Badge:**
   ```
   [Eco Grade: A+]  (green background)
   ```

   **B. CO2 Badge:**
   ```
   [Carbon: 0.24g/visit]  (color based on value)
   ```

   **C. Combined Badge:**
   ```
   [A+ | 0.24g CO2 | ⚡ Green]
   ```

   **D. Achievement Badge:**
   ```
   [Top 5% Cleanest Sites 🌟]
   ```

   **E. Progress Badge:**
   ```
   [↓ 45% Carbon Reduction]
   ```

5. **Widget Features**
   - **Sizes:** Small (150x100), Medium (300x200), Large (400x300)
   - **Themes:** Light, Dark, Auto (matches visitor's OS preference)
   - **Update Frequency:** Real-time, Daily, Weekly, Manual
   - **Click Action:** 
     - Link to full analysis
     - Link to verification page
     - Open methodology explanation

6. **Verification & Trust System**
   - **Verified Badge:** 
     - Special checkmark for verified site owners
     - Prevents spoofing (fake badges with false data)
   - **Verification Process:**
     - Add meta tag or TXT file to website
     - Run verification check
     - Issue verified badge code
   - **Timestamp:** Show when last analyzed
   - **Auto-expiry:** Badges expire after X months (encourage re-analysis)

### Example Code Snippets

**Simple HTML Badge:**
```html
<a href="https://{YOUR_DOMAIN}/verify/example.com">
  <img src="https://{YOUR_DOMAIN}/badge/example.com.svg" 
       alt="Eco Grade A+" />
</a>
```

**Markdown (GitHub README):**
```markdown
[![Eco Grade A+](https://{YOUR_DOMAIN}/badge/example.com.svg)](https://{YOUR_DOMAIN}/verify/example.com)
```

**JavaScript Widget:**
```html
<div id="carbon-widget"></div>
<script src="https://{YOUR_DOMAIN}/widget.js" 
        data-url="example.com" 
        data-theme="light"
        data-size="medium"></script>
```

**Dynamic Badge URL:**
```
https://{YOUR_DOMAIN}/badge/example.com.svg?style=flat&label=Eco%20Score
```

### Technical Considerations

1. **Badge Generation API**
   - Endpoint: `/api/badge/:url.:format`
   - Parameters: style, label, color, logo
   - Caching with appropriate headers
   - SVG templates for different styles

2. **Widget Implementation**
   - Lightweight JavaScript (<10KB)
   - No dependencies (vanilla JS)
   - Async loading (non-blocking)
   - Privacy-conscious (no tracking)

3. **Data Freshness**
   - Cache badge data for performance
   - "Last updated" timestamp on widgets
   - Option to trigger re-analysis
   - Stale data warnings (>90 days old)

4. **Security**
   - CORS headers for iframe widgets
   - CSP-compatible implementation
   - Rate limiting on badge endpoints
   - Prevent badge farming/scraping

5. **CDN & Performance**
   - Host badges on CDN
   - Aggressive caching (SVGs are static)
   - Lazy loading for widgets
   - Fallback for failed loads

### Badge Gallery Examples

```
Style: flat
╔══════════════════╗
║ Eco Grade │ A+   ║  (green gradient)
╚══════════════════╝

Style: flat-square
┌──────────────────┐
│ CO2 │ 0.24g     │  (blue/teal)
└──────────────────┘

Style: for-the-badge
┏━━━━━━━━━━━━━━━━━━┓
┃ 🌱 GREEN HOSTED  ┃  (bold, large)
┗━━━━━━━━━━━━━━━━━━┛

Style: social
┌─────────────────────┐
│ ⭐ A+ │ 124 sites  │  (like social share count)
└─────────────────────┘
```

## Implementation Steps

1. **Phase 1: Badge API**
   - Create badge generation endpoint
   - Implement SVG templating
   - Add basic styles (flat, flat-square)
   - Set up caching

2. **Phase 2: Badge Customizer UI**
   - Build customization interface
   - Add live preview
   - Generate code snippets (HTML, Markdown)
   - Implement download functionality

3. **Phase 3: Verification System**
   - Create verification endpoint
   - Implement meta tag/file checking
   - Issue verified badge variants
   - Add expiry mechanism

4. **Phase 4: Widget Development**
   - Build JavaScript widget
   - Create iframe-based mini dashboard
   - Implement theming system
   - Add responsive sizing

5. **Phase 5: Gallery & Documentation**
   - Create badge gallery page
   - Write implementation guides
   - Add FAQs and troubleshooting
   - Create showcase of sites using badges

6. **Phase 6: Advanced Features**
   - Add achievement badges
   - Implement animated badges
   - Create badge marketplace/discovery
   - Add analytics (how many sites use badges)

## Acceptance Criteria

- [ ] Users can generate badge code for their website
- [ ] At least 3 badge styles available (flat, flat-square, plastic)
- [ ] Badges display correct eco grade and CO2 data
- [ ] Badge API returns proper SVG with caching headers
- [ ] Widget embeds successfully via iframe or JavaScript
- [ ] Customization interface shows live preview
- [ ] Code snippets generated for HTML, Markdown, BBCode
- [ ] Badges are clickable and link to verification page
- [ ] Verification system prevents badge spoofing
- [ ] Badges are responsive and work on mobile
- [ ] Performance: Badge loads in <200ms

## Additional Notes

- **Legal Considerations:**
  - Terms of use for badge usage
  - Require attribution (links back to tool)
  - Prevent misuse (displaying fake data)

- **Marketing Opportunities:**
  - Badge gallery showcasing top sites
  - "Badge of the Month" feature
  - Social media sharing of badge achievements
  - Email campaigns to encourage badge adoption

- **Viral Growth:**
  - Every badge links back to the calculator
  - Increases brand awareness
  - Encourages organic discovery
  - Creates network effect

- **Future Enhancements:**
  - Animated badges for milestones
  - Badges for improvement streaks
  - Industry-specific badges
  - Multi-language badges
  - Custom brand integration (white-label badges)

## Related Features
- Leaderboard feature - "Top 100" achievement badges
- Historical Tracking feature - Progress/improvement badges
- Future verification system - Trust and authenticity for badges
