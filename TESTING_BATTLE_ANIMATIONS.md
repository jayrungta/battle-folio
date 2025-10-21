# Testing Gen 1/2 Battle Animations

## Quick Test Guide

### 1. Basic Animation Test
1. Open your browser to `http://localhost:4200` (or your dev server URL)
2. Watch the battle intro sequence
3. **Expected behavior:**
   - White flash (very brief, ~0.1s)
   - Screen expands in choppy circular pattern (spiral wipe)
   - Trainer sprite pops in and shakes rapidly left-right
   - Small bounce up and down
   - Battle interface appears instantly
   - Menu pops in with slight scale bounce
   - All menu options appear together

### 2. Timing Test
**Total animation should take ~1.2 seconds**

Use a stopwatch or count:
- "One-Mississippi" = ~1 second
- Animation should complete just after "One"

**If animations feel too smooth or slow, something's wrong!**

### 3. Skip Functionality Test
1. Reload the page
2. Immediately press ANY KEY or CLICK ANYWHERE
3. **Expected:** Animations skip instantly, menu is ready

### 4. Reduced Motion Test (Accessibility)

**macOS:**
1. System Preferences → Accessibility → Display
2. Enable "Reduce motion"
3. Reload the page
4. **Expected:** All content appears instantly (no animations)

**Windows:**
1. Settings → Ease of Access → Display
2. Enable "Show animations in Windows"  OFF
3. Reload the page
4. **Expected:** All content appears instantly

### 5. Visual Quality Checklist

#### ✅ What Should Look RIGHT:
- [ ] Animations are CHOPPY (not smooth)
- [ ] Trainer SHAKES (not slides smoothly)
- [ ] Menu POPS (not slides up smoothly)
- [ ] White flash is INSTANT (not fade)
- [ ] Everything feels FAST and SNAPPY
- [ ] Spiral wipe has visible "steps" (pixelated edges)

#### ❌ What Would Be WRONG:
- [ ] Smooth, eased animations (looks modern)
- [ ] Trainer glides in smoothly
- [ ] Menu slides up smoothly
- [ ] Animations take 2+ seconds
- [ ] No choppy/stepped movement
- [ ] Feels like modern website animations

### 6. Browser DevTools Test

1. Open DevTools (F12)
2. Go to Console
3. Should see these logs:
   - "Battle start sound would play here"
   - "Menu appear sound would play here"
4. No errors should appear

### 7. Mobile/Responsive Test

1. Open DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
3. Test on various screen sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
4. **Expected:** Animations work on all sizes, trainer sprite scales appropriately

### 8. Performance Test

1. Open DevTools → Performance tab
2. Start recording
3. Reload page
4. Stop recording after animations complete
5. **Check for:**
   - No layout shifts
   - Smooth 60fps rendering
   - No long tasks blocking main thread

## Common Issues & Solutions

### Issue: Animations are too smooth
**Solution:** Check that animations use `steps()` timing function, not `ease` or `ease-in-out`

### Issue: Animations take too long
**Solution:** Verify ANIMATION_TIMINGS.totalDuration is 1200ms (not 2000ms)

### Issue: Menu options appear one by one
**Solution:** All options should use same animation delay (1.15s), not staggered

### Issue: Skip doesn't work
**Solution:** Check that `@HostListener` is bound to both keydown and click events

### Issue: White flash doesn't appear
**Solution:** Check that `showWhiteFlash` boolean is being set to true at 50ms

## Video Reference (Optional)

Compare to actual Pokémon games:
- Search YouTube: "Pokemon Red battle transition"
- Search YouTube: "Pokemon Gold battle intro"
- Your animations should have similar FAST, CHOPPY feel

## What to Look For vs Original Games

### Original Pokémon Red/Blue/Yellow (Gen 1):
- Very fast transitions (~0.5-1s total)
- Choppy spiral wipe effect
- Instant sprite appearances
- Rapid shake effects
- No smooth easing

### Original Pokémon Gold/Silver/Crystal (Gen 2):
- Similar to Gen 1 but slightly more polished
- Still very fast and snappy
- Stepped animations throughout
- Menu elements pop in

### Your Implementation Should:
- Feel closer to Gen 1/2 than modern games
- Be FAST (1.2s total)
- Be CHOPPY (steps, not smooth)
- Have INSTANT appearances (pop, not fade)
- Include white flash for impact

## Success Criteria

✅ **Animation passes if:**
1. Total duration is ~1.2 seconds
2. Animations are visibly choppy/stepped
3. Trainer shakes (not slides)
4. Menu pops (not slides)
5. Skip functionality works
6. Reduced motion is respected
7. No console errors
8. Works on mobile

❌ **Animation fails if:**
1. Animations are smooth and eased
2. Duration is 2+ seconds
3. Trainer slides smoothly in
4. Menu slides up smoothly
5. Feels like modern CSS animations

## Console Commands for Quick Testing

```javascript
// Skip animation manually
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

// Check current animation state (in component)
// Note: This requires Angular DevTools extension
```

## Notes
- Test on latest Chrome/Firefox/Safari
- Animations should feel "retro" and "Game Boy-like"
- When in doubt, make it FASTER and CHOPPIER
- The goal is authenticity to Gen 1/2, not smoothness

