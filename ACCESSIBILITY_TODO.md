# WCAG 2.2 Accessibility Audit & Implementation Plan
**Brain Eating Machines Website**
**Date:** December 18, 2024

---

## Executive Summary

This document outlines accessibility improvements needed to achieve WCAG 2.2 compliance at Level A, AA, and AAA. The site has a good foundation with semantic HTML, alt text on images, and proper page titles, but requires improvements in keyboard navigation, color contrast, ARIA implementation, and interactive component accessibility.

**Current Status:**
- ✅ Good: Basic HTML structure, alt text, page titles, language attribute
- ⚠️ Needs Work: Keyboard navigation, ARIA attributes, color contrast, focus management
- ❌ Missing: Skip navigation, proper modal/dropdown accessibility, form labels

---

## Level A Requirements (MUST FIX)

### 1. Keyboard Navigation & Focus Management

#### 1.1 Dropdown Navigation (2.1.1 Keyboard, 4.1.2 Name/Role/Value)
**Issue:** Desktop dropdown menus only work with mouse hover, not keyboard accessible.

**Location:** `_includes/navigation.html` + `_layouts/default.html` (lines 91-113)

**Required Changes:**
- Add `tabindex="0"` to dropdown toggle
- Add `role="button"`, `aria-expanded="false"`, `aria-haspopup="true"` to dropdown toggle
- Add keyboard event listeners (Enter, Space to toggle, Escape to close)
- Add `role="menu"` to dropdown container, `role="menuitem"` to links
- Update JavaScript to handle keyboard navigation (arrow keys, Enter, Escape)

**Implementation Priority:** HIGH

---

#### 1.2 Modal Keyboard Access (2.1.1, 2.1.2 No Keyboard Trap)
**Issue:** Schedule detail modal needs proper keyboard support and focus management.

**Location:** `schedule.html` (modal implementation)

**Required Changes:**
- Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby` to modal
- Add keyboard listener for Escape key to close modal
- Trap focus within modal when open (prevent tabbing to background)
- Return focus to triggering element when modal closes
- Ensure all interactive elements in modal are keyboard accessible

**Implementation Priority:** HIGH

---

#### 1.3 Mobile Menu Button (4.1.2 Name/Role/Value)
**Issue:** Mobile menu toggle button lacks accessible name.

**Location:** `_includes/navigation.html` (line 45)

**Required Changes:**
- Add `aria-label="Open navigation menu"` to button
- Add `aria-expanded="false"` attribute (toggle to "true" when open)
- Update JavaScript to toggle aria-expanded

**Implementation Priority:** HIGH

---

#### 1.4 Skip Navigation Link (2.4.1 Bypass Blocks)
**Issue:** Missing skip-to-content link for keyboard users.

**Location:** `_layouts/default.html` (add after `<body>` tag)

**Required Changes:**
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-lego-blue focus:text-white focus:px-4 focus:py-2 focus:rounded">
  Skip to main content
</a>
```
- Add `id="main-content"` to main element (line 39)
- Add sr-only utility class to Tailwind config

**Implementation Priority:** HIGH

---

#### 1.5 Focus Visible Indicators (2.4.7 Focus Visible)
**Issue:** No visible focus indicators defined in CSS.

**Location:** `assets/css/main.css`

**Required Changes:**
- Add focus styles to all interactive elements:
  - Links: `focus:outline-2 focus:outline-offset-2 focus:outline-lego-blue`
  - Buttons: `focus:ring-2 focus:ring-lego-blue focus:ring-offset-2`
  - Form controls: `focus:border-lego-blue focus:ring-2 focus:ring-lego-blue`
- Never use `outline: none` without replacement

**Implementation Priority:** HIGH

---

### 2. Forms & Interactive Elements

#### 2.1 Schedule Filter Labels (3.3.2 Labels or Instructions)
**Issue:** Filter dropdowns lack associated labels.

**Location:** `schedule.html` (filter bar)

**Required Changes:**
- Add `<label for="program-filter">Program:</label>` before each select
- Add `id` attributes to match label `for` attributes
- Style labels appropriately (can be visually hidden if needed with sr-only)

**Implementation Priority:** HIGH

---

#### 2.2 Form Input Purpose (1.3.5 Identify Input Purpose - Level AA)
**Issue:** Any contact forms need autocomplete attributes.

**Location:** Contact page forms (if they exist)

**Required Changes:**
- Add appropriate `autocomplete` attributes (name, email, tel, etc.)
- Example: `<input type="email" autocomplete="email" ...>`

**Implementation Priority:** MEDIUM (if forms exist)

---

### 3. Color & Visual Design

#### 3.1 Color as Sole Indicator (1.4.1 Use of Color)
**Issue:** Status badges use only color to convey information.

**Location:** `schedule.html` (lines 88-111), various colored boxes throughout site

**Required Changes:**
- Add icons or text labels to status badges:
  - "Open" badge: Add ✓ icon
  - "Waitlist" badge: Add ⏳ icon
  - "Full" badge: Add ✕ icon
  - "Coming Soon" badge: Add 📅 icon
- Ensure information isn't conveyed by color alone (e.g., red/green indicators)

**Implementation Priority:** MEDIUM

---

#### 3.2 Link Purpose (2.4.4 Link Purpose in Context)
**Issue:** Some "Learn more" links lack context.

**Location:** Homepage and program cards

**Required Changes:**
- Change generic links to descriptive text:
  - ❌ "Learn more"
  - ✅ "Learn more about After-School Robotics"
- Or add `aria-label="Learn more about [Program Name]"` to maintain visual brevity

**Implementation Priority:** MEDIUM

---

### 4. Structural Elements

#### 4.1 Heading Structure (1.3.1 Info and Relationships)
**Issue:** Need to verify heading hierarchy is logical (h1 → h2 → h3, no skips).

**Required Changes:**
- Audit all pages to ensure:
  - One h1 per page (page title)
  - Headings don't skip levels (h1 → h3)
  - Headings describe section content
- Document heading structure in a site map

**Implementation Priority:** MEDIUM

---

#### 4.2 Page Language (3.1.1 Language of Page)
**Status:** ✅ COMPLIANT - `<html lang="en">` present in `_layouts/default.html` line 2

---

#### 4.3 Page Titles (2.4.2 Page Titled)
**Status:** ✅ COMPLIANT - All pages have descriptive titles via Jekyll front matter

---

---

## Level AA Requirements (SHOULD FIX)

### 5. Color Contrast

#### 5.1 Text Contrast (1.4.3 Contrast Minimum - 4.5:1)
**Issue:** Need to verify all text meets minimum contrast ratios.

**Critical Colors to Test:**
- LEGO Yellow (#FFD700) on white background - **LIKELY FAILS**
- LEGO Blue (#0055BF) on white - needs verification
- White text on LEGO Yellow - **LIKELY FAILS**
- Gray text (#6b7280) on white - needs verification
- Badge text colors (lines 88-111 in schedule.html)

**Required Changes:**
- Test all color combinations using contrast checker tool
- Darken LEGO Yellow for text use (consider #F4B400 or darker)
- Ensure all body text meets 4.5:1 ratio
- Large text (18pt+ or 14pt+ bold) needs 3:1 minimum

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Lighthouse accessibility audit

**Implementation Priority:** HIGH

---

#### 5.2 Non-Text Contrast (1.4.11 Non-text Contrast - 3:1)
**Issue:** UI components and graphical elements need 3:1 contrast ratio.

**Elements to Test:**
- Button borders
- Form input borders
- Focus indicators
- Icons
- LEGO colored blocks in footer
- Program card borders

**Required Changes:**
- Ensure all interactive component boundaries are visible
- Icons should have 3:1 contrast against background
- Add borders to buttons if background contrast insufficient

**Implementation Priority:** MEDIUM

---

### 6. Responsive Design

#### 6.1 Text Resize (1.4.4 Resize Text)
**Issue:** Verify content works at 200% zoom without loss of functionality.

**Required Changes:**
- Test all pages at 200% zoom
- Ensure no horizontal scrolling (except data tables)
- Verify all content remains readable
- Check modal/dropdown behavior at 200% zoom

**Implementation Priority:** MEDIUM

---

#### 6.2 Reflow (1.4.10 Reflow)
**Issue:** Content should work without 2D scrolling at 320px width.

**Required Changes:**
- Test all pages at 320px width (mobile)
- Ensure no horizontal scrolling
- Verify schedule table is responsive or scrollable
- Check navigation, modals work on narrow screens

**Implementation Priority:** MEDIUM

---

#### 6.3 Orientation (1.3.4 Orientation)
**Status:** Needs testing - verify content works in both portrait/landscape

**Required Changes:**
- Test all pages in both orientations
- Don't lock orientation unless essential

**Implementation Priority:** LOW

---

### 7. Content on Hover/Focus (1.4.13)
**Issue:** Dropdown menus appear on hover, need to meet dismissible/hoverable/persistent criteria.

**Location:** `_includes/navigation.html`, `_layouts/default.html` (hover behavior)

**Required Changes:**
- Ensure user can dismiss dropdown without moving mouse (Escape key) ✓ (will be addressed in 1.1)
- Content remains visible when hovering over dropdown itself ✓ (already implemented)
- Content doesn't disappear on accidental mouse movement

**Implementation Priority:** MEDIUM

---

### 8. Navigation & Wayfinding

#### 8.1 Multiple Ways (2.4.5 Multiple Ways)
**Issue:** Only one way to find pages (navigation menu).

**Required Changes:**
- Add sitemap page (`/sitemap`)
- Add breadcrumbs to program pages (optional but helpful)
- Ensure sitemap is linked in footer

**Implementation Priority:** LOW

---

#### 8.2 Headings and Labels (2.4.6)
**Issue:** Verify all headings and form labels are descriptive.

**Required Changes:**
- Audit all headings to ensure they describe content
- Form labels should describe purpose, not just field name
- Avoid generic headings like "Section 1", "Details"

**Implementation Priority:** MEDIUM

---

#### 8.3 Consistent Navigation (3.2.3)
**Status:** ✅ APPEARS COMPLIANT - Navigation appears consistent across pages

**Verification Needed:**
- Confirm navigation order doesn't change between pages
- Ensure footer links are in same order across site

**Implementation Priority:** LOW

---

#### 8.4 Consistent Identification (3.2.4)
**Issue:** Icons and buttons with same function should be identified consistently.

**Required Changes:**
- Register buttons should all have same text/icon
- "Learn more" links should be consistent
- Social icons should have consistent aria-labels

**Implementation Priority:** LOW

---

### 9. Input Assistance

#### 9.1 Error Identification (3.3.1)
**Status:** NEEDS VERIFICATION - Check if any forms exist with validation

**Required Changes (if forms exist):**
- Error messages must be clear and descriptive
- Identify which field has error
- Describe error in text, not just red border
- Example: "Email is required" not just "Invalid"

**Implementation Priority:** HIGH (if forms exist)

---

#### 9.2 Error Suggestions (3.3.3)
**Status:** NEEDS VERIFICATION

**Required Changes (if forms exist):**
- Provide suggestions for fixing errors
- Example: "Email must include @ symbol" not just "Invalid email"

**Implementation Priority:** MEDIUM (if forms exist)

---

### 10. Pointer Gestures & Touch Targets

#### 10.1 Target Size (2.5.8 Target Size Minimum - 24x24px)
**Issue:** Touch targets should be at least 24x24 CSS pixels.

**Elements to Check:**
- Navigation links
- Buttons (primary, secondary, accent)
- Mobile menu toggle
- Dropdown toggles
- Schedule cards
- Modal close button

**Required Changes:**
- Add minimum height/width or padding to ensure 24x24px
- Mobile navigation links: add more padding
- Close buttons: ensure at least 24x24px

**Implementation Priority:** MEDIUM

---

#### 10.2 Pointer Cancellation (2.5.2)
**Status:** ✅ APPEARS COMPLIANT - Click events use standard patterns

**Verification Needed:**
- Ensure click events fire on mouseup, not mousedown
- User can abort by moving pointer away before releasing

**Implementation Priority:** LOW

---

---

## Level AAA Requirements (NICE TO HAVE)

### 11. Enhanced Color Contrast (1.4.6 - 7:1 ratio)
**Goal:** Achieve 7:1 contrast for text, 4.5:1 for large text.

**Benefits:**
- Better readability for users with low vision
- Improved readability in bright sunlight
- Better on lower-quality displays

**Implementation Priority:** LOW

---

### 12. Link Purpose (Link Only) (2.4.9)
**Goal:** Links should be descriptive without surrounding context.

**Current Issues:**
- "Learn more" links need context from surrounding text
- "Register" buttons need program name

**Improvements:**
- "Learn More About After-School Robotics"
- "Register for Summer Camp"

**Implementation Priority:** LOW

---

### 13. Enhanced Target Size (2.5.5 - 44x44px)
**Goal:** Touch targets should be at least 44x44 CSS pixels.

**Changes:**
- Increase button padding
- Larger mobile menu items
- Bigger social media icons

**Implementation Priority:** LOW

---

### 14. Enhanced Focus Appearance (2.4.13)
**Goal:** Focus indicators should be at least 2px thick with 3:1 contrast.

**Changes:**
- Increase focus outline to 2px
- Ensure focus outline contrasts 3:1 with background
- Consider high-visibility focus style (thick colored border)

**Implementation Priority:** LOW

---

---

## Implementation Checklist

### Phase 1: Critical Level A Fixes (Required for Basic Compliance)

- [ ] **1.1** Add keyboard navigation to dropdown menus (ARIA, keyboard events)
- [ ] **1.2** Fix modal keyboard accessibility (role, focus trap, Escape key)
- [ ] **1.3** Add aria-label to mobile menu button
- [ ] **1.4** Add skip navigation link
- [ ] **1.5** Add visible focus indicators to all interactive elements
- [ ] **2.1** Add labels to schedule filter dropdowns
- [ ] **3.1** Add icons/text to color-coded status badges
- [ ] **3.2** Make link text descriptive or add aria-labels
- [ ] **4.1** Audit and fix heading hierarchy across all pages

### Phase 2: Level AA Compliance (Industry Standard)

- [ ] **5.1** Test and fix text color contrast (especially LEGO Yellow)
- [ ] **5.2** Test and fix UI component contrast ratios
- [ ] **6.1** Test text resize at 200% zoom, fix any issues
- [ ] **6.2** Test reflow at 320px width, fix horizontal scrolling
- [ ] **7.0** Verify hover content is dismissible/hoverable/persistent
- [ ] **8.1** Create sitemap page and link in footer
- [ ] **8.2** Audit headings and labels for descriptiveness
- [ ] **9.1** Add proper error handling to any forms (if exist)
- [ ] **10.1** Ensure all touch targets are minimum 24x24px
- [ ] **10.2** Verify pointer cancellation works correctly

### Phase 3: Level AAA Excellence (Optional)

- [ ] **11** Achieve 7:1 contrast ratio for all text
- [ ] **12** Make all links descriptive without context
- [ ] **13** Increase touch targets to 44x44px
- [ ] **14** Enhanced focus indicators (2px, 3:1 contrast)

---

## Testing Strategy

### Automated Testing Tools

1. **Lighthouse (Chrome DevTools)**
   - Run: DevTools → Lighthouse → Accessibility
   - Tests: Contrast, ARIA, form labels, headings
   - Target Score: 90+ (A/AA), 95+ (AAA)

2. **axe DevTools Extension**
   - https://www.deque.com/axe/devtools/
   - More detailed than Lighthouse
   - Catches ARIA issues

3. **WAVE Extension**
   - https://wave.webaim.org/extension/
   - Visual feedback on page
   - Highlights errors and warnings

### Manual Testing Required

1. **Keyboard Navigation**
   - Tab through entire site
   - Test dropdowns, modals with keyboard only
   - Verify focus is visible
   - Test Escape key on modals

2. **Screen Reader Testing**
   - Test with:
     - NVDA (Windows, free)
     - JAWS (Windows, paid)
     - VoiceOver (Mac, built-in): Cmd+F5
     - TalkBack (Android)
   - Verify all content is announced
   - Check ARIA labels are meaningful

3. **Color Contrast**
   - Use WebAIM Contrast Checker
   - Test all color combinations
   - Document ratios in spreadsheet

4. **Zoom & Resize**
   - Test at 200% zoom
   - Test at 320px width
   - Verify no content loss

5. **Touch Targets**
   - Test on actual mobile device
   - Verify buttons are easily tappable
   - Check spacing between targets

---

## Priority Summary

### Immediate Action Required (Week 1)
1. Keyboard navigation for dropdowns
2. Modal accessibility (keyboard, ARIA)
3. Skip navigation link
4. Focus indicators
5. Filter labels
6. Color contrast fixes (especially yellow)

### Short Term (Week 2-3)
1. Status badge icons/text
2. Descriptive link text
3. Heading hierarchy audit
4. Touch target sizes
5. Responsive testing (zoom, mobile)

### Long Term (Month 1-2)
1. Sitemap page
2. Enhanced contrast (AAA)
3. Comprehensive screen reader testing
4. Third-party accessibility audit
5. Staff training on accessibility

---

## Resources

- **WCAG 2.2 Specification:** https://www.w3.org/TR/WCAG22/
- **WCAG Quick Reference:** https://www.w3.org/WAI/WCAG22/quickref/
- **WebAIM:** https://webaim.org/ (excellent tutorials and tools)
- **Deque University:** https://dequeuniversity.com/ (training courses)
- **A11y Project:** https://www.a11yproject.com/ (practical checklist)
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **HTML5 Accessibility:** https://www.html5accessibility.com/

---

## Notes

- This audit is based on code review and WCAG 2.2 guidelines
- Manual testing with assistive technologies is required for full compliance verification
- Regular accessibility testing should be part of the development workflow
- Consider annual third-party accessibility audit for formal WCAG conformance certification
- Keep accessibility in mind when adding new features or content

---

**Next Steps:**
1. Review this document with development team
2. Prioritize fixes based on user impact
3. Begin Phase 1 implementation
4. Set up automated testing in CI/CD pipeline
5. Schedule manual testing sessions
6. Document accessibility statement on website
