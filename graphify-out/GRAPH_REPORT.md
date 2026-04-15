# Graph Report - .  (2026-04-15)

## Corpus Check
- Corpus is ~15,861 words - fits in a single context window. You may not need a graph.

## Summary
- 131 nodes · 154 edges · 30 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_PRD & Review Documentation|PRD & Review Documentation]]
- [[_COMMUNITY_Generative Palette V2|Generative Palette V2]]
- [[_COMMUNITY_Palette V1 (Legacy)|Palette V1 (Legacy)]]
- [[_COMMUNITY_Accent Color Generation|Accent Color Generation]]
- [[_COMMUNITY_OKLCH Utilities|OKLCH Utilities]]
- [[_COMMUNITY_WCAG Contrast Math|WCAG Contrast Math]]
- [[_COMMUNITY_HSL Conversion|HSL Conversion]]
- [[_COMMUNITY_Background Step UI|Background Step UI]]
- [[_COMMUNITY_Wizard UX Issues|Wizard UX Issues]]
- [[_COMMUNITY_Export Modal|Export Modal]]
- [[_COMMUNITY_Contrast Validation Gaps|Contrast Validation Gaps]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Page Entry Point|Page Entry Point]]
- [[_COMMUNITY_Hue Wheel Picker|Hue Wheel Picker]]
- [[_COMMUNITY_Wizard State Hook|Wizard State Hook]]
- [[_COMMUNITY_Next.js Types|Next.js Types]]
- [[_COMMUNITY_Color Type Definitions|Color Type Definitions]]
- [[_COMMUNITY_Primary Accent Step (Dead)|Primary Accent Step (Dead)]]
- [[_COMMUNITY_Secondary Accent Step (Dead)|Secondary Accent Step (Dead)]]
- [[_COMMUNITY_System Accents Step|System Accents Step]]
- [[_COMMUNITY_Combined Accent Step|Combined Accent Step]]
- [[_COMMUNITY_Color Swatch Component|Color Swatch Component]]
- [[_COMMUNITY_Live Preview Panel|Live Preview Panel]]
- [[_COMMUNITY_Color Lib Index|Color Lib Index]]
- [[_COMMUNITY_Palette V2 Tests|Palette V2 Tests]]
- [[_COMMUNITY_PRD File Structure|PRD File Structure]]
- [[_COMMUNITY_Lock File Conflict|Lock File Conflict]]
- [[_COMMUNITY_File Icon|File Icon]]
- [[_COMMUNITY_Globe Icon|Globe Icon]]
- [[_COMMUNITY_Window Icon|Window Icon]]

## God Nodes (most connected - your core abstractions)
1. `Khaali Colours PRD` - 14 edges
2. `OKLCH Color Space` - 7 edges
3. `generateModePaletteV2()` - 6 edges
4. `createChromaticShade()` - 6 edges
5. `Next.js 15 + React 19 Tech Stack` - 6 edges
6. `generateModePalette()` - 5 edges
7. `createNeutralToken()` - 4 edges
8. `generateThemeV2()` - 4 edges
9. `Color Level System (L0-L3/Muted)` - 4 edges
10. `Tailwind-Compatible CSS Output (OKLCH + HSL Fallback)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Icon: Vercel Logo (White Triangle)` --conceptually_related_to--> `Next.js 15 + React 19 Tech Stack`  [INFERRED]
  public/vercel.svg → PRD.md
- `Icon: Next.js Wordmark` --conceptually_related_to--> `Next.js 15 + React 19 Tech Stack`  [INFERRED]
  public/next.svg → PRD.md
- `Bug: HSL Fallback Missing from CSS Export (FR-16)` --semantically_similar_to--> `Rationale: HSL Fallback for sRGB Compatibility`  [INFERRED] [semantically similar]
  spec/review-2026-04-09.md → PRD.md
- `Bug: Zero Responsiveness (Hardcoded 60/40 Split)` --references--> `Khaali Colours PRD`  [INFERRED]
  spec/review-2026-04-09.md → PRD.md
- `Issue: No Tests Despite vitest Installed` --references--> `Khaali Colours PRD`  [INFERRED]
  spec/review-2026-04-09.md → PRD.md

## Hyperedges (group relationships)
- **Core Color System Specification** — prd_oklch_color_space, prd_neutral_palette_generation, prd_color_level_system, prd_text_color_derivation, prd_accent_color_generation, prd_display_p3_gamut, prd_srgb_fallback [EXTRACTED 0.95]
- **High-Value Bugs Blocking Ship** — review_hsl_fallback_missing, review_huewheel_mouse_only, review_no_responsiveness, review_contrast_not_persistent, review_dead_wizard_components, review_lock_file_conflict [EXTRACTED 1.00]
- **WCAG Accessibility Validation Chain** — prd_wcag_contrast, review_contrast_not_persistent, review_dead_code_contrast [INFERRED 0.85]

## Communities

### Community 0 - "PRD & Review Documentation"
Cohesion: 0.1
Nodes (27): Icon: Next.js Wordmark, Icon: Vercel Logo (White Triangle), Accent Color Generation, Color Level System (L0-L3/Muted), culori Library (Color Math), Display P3 Gamut, Khaali Colours PRD, Live Preview with Sample Components (+19 more)

### Community 1 - "Generative Palette V2"
Cohesion: 0.25
Nodes (15): calculateOptimalChroma(), clampMuted(), clampScale(), createChromaticShade(), createNeutralToken(), formatHslCss(), formatOklchHue(), formatOklchNone() (+7 more)

### Community 2 - "Palette V1 (Legacy)"
Cohesion: 0.27
Nodes (12): calculateDarkModeLevels(), calculateDarkModeText(), calculateLightModeLevels(), calculateLightModeText(), createColorLevel(), createTextColor(), generateLightnessSteps(), generateModePalette() (+4 more)

### Community 3 - "Accent Color Generation"
Cohesion: 0.24
Nodes (8): calculateOptimalChroma(), createAccentColor(), createAccentShade(), createSystemAccent(), createSystemAccentShade(), generateAccentShades(), generateDefaultSystemAccents(), generateSystemAccentShades()

### Community 4 - "OKLCH Utilities"
Cohesion: 0.2
Nodes (2): createNeutral(), createOklch()

### Community 5 - "WCAG Contrast Math"
Cohesion: 0.48
Nodes (5): checkContrast(), findContrastingLightness(), getContrastRatio(), getRelativeLuminance(), suggestTextColor()

### Community 6 - "HSL Conversion"
Cohesion: 0.38
Nodes (3): createHsl(), createNeutralHsl(), oklchToHsl()

### Community 7 - "Background Step UI"
Cohesion: 0.67
Nodes (2): handleScaleBlur(), handleScaleKeyDown()

### Community 8 - "Wizard UX Issues"
Cohesion: 0.5
Nodes (4): Rationale: Progressive Disclosure via Wizard, Step-by-Step Wizard Flow (6 Steps), Issue: Dead Wizard Components (PrimaryAccentStep, SecondaryAccentStep), Bug: HueWheel Mouse-Only (No Touch/Pointer Events)

### Community 9 - "Export Modal"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "Contrast Validation Gaps"
Cohesion: 1.0
Nodes (3): WCAG Contrast Requirements, Bug: Contrast Indicator Not Persistent Bottom Bar, Issue: findContrastingLightness Dead Code

### Community 11 - "Root Layout"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Page Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Hue Wheel Picker"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Wizard State Hook"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Next.js Types"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Color Type Definitions"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Primary Accent Step (Dead)"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Secondary Accent Step (Dead)"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "System Accents Step"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Combined Accent Step"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Color Swatch Component"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Live Preview Panel"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Color Lib Index"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Palette V2 Tests"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "PRD File Structure"
Cohesion: 1.0
Nodes (1): Planned File Structure

### Community 26 - "Lock File Conflict"
Cohesion: 1.0
Nodes (1): Issue: Lock File Conflict (package-lock.json vs pnpm-lock.yaml)

### Community 27 - "File Icon"
Cohesion: 1.0
Nodes (1): Icon: Document/File (16x16)

### Community 28 - "Globe Icon"
Cohesion: 1.0
Nodes (1): Icon: Globe/World (16x16)

### Community 29 - "Window Icon"
Cohesion: 1.0
Nodes (1): Icon: Browser Window (16x16)

## Knowledge Gaps
- **20 isolated node(s):** `Live Preview with Sample Components`, `Planned File Structure`, `Shareable URL with Palette Config (Nice to Have)`, `Rationale: OKLCH for Perceptual Uniformity`, `Rationale: Progressive Disclosure via Wizard` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Root Layout`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Page Entry Point`** (2 nodes): `handleFinish()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hue Wheel Picker`** (2 nodes): `getHueName()`, `HueWheel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Wizard State Hook`** (2 nodes): `useWizard.ts`, `useWizard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Types`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Color Type Definitions`** (1 nodes): `color.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Primary Accent Step (Dead)`** (1 nodes): `PrimaryAccentStep.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Secondary Accent Step (Dead)`** (1 nodes): `SecondaryAccentStep.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `System Accents Step`** (1 nodes): `SystemAccentsStep.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Combined Accent Step`** (1 nodes): `AccentStep.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Color Swatch Component`** (1 nodes): `ColorSwatch.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Live Preview Panel`** (1 nodes): `LivePreview.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Color Lib Index`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Palette V2 Tests`** (1 nodes): `palette-v2.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PRD File Structure`** (1 nodes): `Planned File Structure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Lock File Conflict`** (1 nodes): `Issue: Lock File Conflict (package-lock.json vs pnpm-lock.yaml)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `File Icon`** (1 nodes): `Icon: Document/File (16x16)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Globe Icon`** (1 nodes): `Icon: Globe/World (16x16)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Window Icon`** (1 nodes): `Icon: Browser Window (16x16)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Khaali Colours PRD` connect `PRD & Review Documentation` to `Wizard UX Issues`, `Contrast Validation Gaps`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `Step-by-Step Wizard Flow (6 Steps)` connect `Wizard UX Issues` to `PRD & Review Documentation`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Khaali Colours PRD` (e.g. with `Bug: Zero Responsiveness (Hardcoded 60/40 Split)` and `Issue: No Tests Despite vitest Installed`) actually correct?**
  _`Khaali Colours PRD` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Next.js 15 + React 19 Tech Stack` (e.g. with `Assessment: Pure Static SPA (No API Routes)` and `Icon: Vercel Logo (White Triangle)`) actually correct?**
  _`Next.js 15 + React 19 Tech Stack` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Live Preview with Sample Components`, `Planned File Structure`, `Shareable URL with Palette Config (Nice to Have)` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PRD & Review Documentation` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._