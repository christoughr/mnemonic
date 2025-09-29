# Responsive Design Guidelines for mnemonic.fyi

## Overview
This document outlines the responsive design standards and best practices to ensure a consistent, mobile-first experience across all pages and components.

## Mobile-First Approach
- Always design for mobile first, then enhance for larger screens
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test on actual mobile devices, not just browser dev tools

## Breakpoints
- **Mobile**: Default (0px - 639px)
- **Small**: `sm:` (640px+)
- **Medium**: `md:` (768px+)
- **Large**: `lg:` (1024px+)
- **Extra Large**: `xl:` (1280px+)

## Text Sizing Standards

### Headings
- **H1 (Main titles)**: `text-3xl sm:text-4xl lg:text-6xl`
- **H2 (Section titles)**: `text-lg sm:text-xl lg:text-2xl`
- **H3 (Subsection titles)**: `text-base sm:text-lg lg:text-xl`
- **H4 (Card titles)**: `text-sm sm:text-base lg:text-lg`

### Body Text
- **Large text**: `text-base sm:text-lg lg:text-xl`
- **Regular text**: `text-sm sm:text-base`
- **Small text**: `text-xs sm:text-sm`

## Spacing Standards

### Padding
- **Container padding**: `px-3 sm:px-6 lg:px-8`
- **Section padding**: `py-4 sm:py-6 lg:py-8`
- **Card padding**: `p-4 sm:p-6 lg:p-8`
- **Button padding**: `px-6 sm:px-8 lg:px-12 py-2.5 sm:py-3 lg:py-4`

### Margins
- **Section margins**: `mb-4 sm:mb-6 lg:mb-8`
- **Element margins**: `mb-2 sm:mb-3 lg:mb-4`
- **Grid gaps**: `gap-4 sm:gap-6 lg:gap-8`

## Layout Standards

### Grid Systems
- **Mobile**: Always start with `grid-cols-1`
- **Tablet**: Add `md:grid-cols-2` for 2-column layouts
- **Desktop**: Add `lg:grid-cols-3` for 3-column layouts

### Container Widths
- **Mobile**: Use `w-full` with padding
- **Desktop**: Use `max-w-4xl mx-auto` for content width
- **Full width**: Use `w-full` for full-width sections

## Interactive Elements

### Buttons
- **Minimum touch target**: `min-h-[44px] min-w-[44px]`
- **Mobile padding**: `px-6 py-2.5`
- **Desktop padding**: `px-8 py-3`
- **Text size**: `text-sm sm:text-base lg:text-lg`

### Input Fields
- **Mobile padding**: `px-3 py-2`
- **Desktop padding**: `px-4 py-3`
- **Text size**: `text-base sm:text-lg`
- **Font size**: Always `text-base` to prevent zoom on mobile

### Search Inputs
- **Right padding**: `pr-20 sm:pr-24` to accommodate buttons
- **Button positioning**: `absolute right-1 sm:right-2`
- **Button width**: `min-w-[60px] sm:min-w-[80px]`

## Navigation

### Mobile Navigation
- **Hamburger menu**: Always include for mobile
- **Hidden on desktop**: Use `hidden sm:flex` for desktop nav
- **Touch targets**: Minimum 44px height/width

### Logo Sizing
- **Mobile**: `w-6 h-6`
- **Desktop**: `w-8 h-8`
- **Text size**: `text-sm sm:text-base`

## Performance Optimizations

### Mobile Performance
- **Hide animations**: Use `hidden sm:block` for decorative elements
- **Reduce motion**: Respect `prefers-reduced-motion`
- **Hardware acceleration**: Use `transform: translateZ(0)` for smooth scrolling

### Images and Icons
- **Icon sizes**: `w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8`
- **Responsive images**: Use `w-full h-auto`
- **Aspect ratios**: Maintain consistent ratios across breakpoints

## Common Patterns

### Card Layouts
```jsx
<div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4">
    Title
  </h3>
  <p className="text-sm sm:text-base text-gray-600">
    Content
  </p>
</div>
```

### Form Layouts
```jsx
<div className="space-y-4 sm:space-y-6">
  <div>
    <label className="block text-sm font-medium mb-2">Label</label>
    <input className="w-full px-3 py-2 text-base border rounded-lg" />
  </div>
</div>
```

### Button Groups
```jsx
<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
  <button className="px-6 py-2.5 text-sm sm:text-base">Button 1</button>
  <button className="px-6 py-2.5 text-sm sm:text-base">Button 2</button>
</div>
```

## Testing Checklist

### Mobile Testing
- [ ] All text is readable without zooming
- [ ] Buttons are easily tappable (44px minimum)
- [ ] No horizontal scrolling
- [ ] Forms work properly on mobile keyboards
- [ ] Navigation is accessible and functional

### Desktop Testing
- [ ] Content doesn't look too large or spaced out
- [ ] Grid layouts work properly
- [ ] Hover states work correctly
- [ ] Animations are smooth and purposeful

### Cross-Device Testing
- [ ] Test on actual devices, not just browser dev tools
- [ ] Check both portrait and landscape orientations
- [ ] Verify touch interactions work properly
- [ ] Ensure consistent visual hierarchy across devices

## Common Issues to Avoid

### Text Overlap
- Always provide enough padding for buttons in inputs
- Use proper line-height for multi-line text
- Test with longer text content

### Layout Breaks
- Don't use fixed widths that don't scale
- Always test with different content lengths
- Use flexbox and grid properly

### Performance Issues
- Hide decorative elements on mobile
- Use appropriate image sizes
- Minimize animations on mobile

### Accessibility
- Ensure sufficient color contrast
- Use proper heading hierarchy
- Make interactive elements keyboard accessible

## Tools and Resources

### Development
- Use Tailwind's responsive utilities
- Test with browser dev tools
- Use real devices for final testing

### Design
- Start with mobile wireframes
- Consider touch interactions
- Plan for different content lengths

### Testing
- Test on multiple devices and browsers
- Check both portrait and landscape
- Verify with different user scenarios

## Maintenance

### Regular Reviews
- Test responsive design with each major update
- Review new components for mobile compatibility
- Update guidelines as patterns evolve

### Performance Monitoring
- Monitor Core Web Vitals
- Check mobile performance scores
- Optimize based on real user data

---

**Remember**: Mobile-first design isn't just about screen size—it's about creating the best possible experience for users on any device, with any input method, in any context.
