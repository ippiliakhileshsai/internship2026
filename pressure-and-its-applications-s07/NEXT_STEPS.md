## Current state (as of session resume)

All 6 simulation cards in learn.html are working:
1. Sharp vs Blunt (hold-to-push, heatmap)
2. Pascal Hydraulic Lift (slider)
3. Underwater Diver (depth slider)
4. Boyle's Law (piston drag)
5. Blood Pressure (beat button + stress slider)
6. Bernoulli Wing (airspeed slider)

## Fixes applied this session
- Removed stray `S` character at top of index.html (file corruption from prior cutoff)
- Fixed Card 6 speed bars: top bar now shows 1.3× speed, bottom 0.85× speed (both were identical before due to t*1.3*100/1.3 = t*100 cancellation)

## Orphaned files (no longer used by current learn.html)
- css/learn.css  — was for the old text-heavy learn module
- js/learn.js    — same; references SVG IDs that don't exist in current learn.html

## Possible next steps
- Decide whether to delete or repurpose learn.js / learn.css
- Add a 7th simulation card (e.g. Archimedes buoyancy or Altitude pressure)?
- Add a 3rd nav tab (e.g. Quiz page)?
