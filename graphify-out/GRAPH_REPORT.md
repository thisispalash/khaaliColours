# Graph Report - .  (2026-04-15)

## Corpus Check
- Corpus is ~33,777 words - fits in a single context window. You may not need a graph.

## Summary
- 355 nodes · 352 edges · 84 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Shell & PRD|App Shell & PRD]]
- [[_COMMUNITY_Color System & Assets|Color System & Assets]]
- [[_COMMUNITY_Palette Generation & State|Palette Generation & State]]
- [[_COMMUNITY_V2 Palette Internals|V2 Palette Internals]]
- [[_COMMUNITY_V1 Accent Engine|V1 Accent Engine]]
- [[_COMMUNITY_Sidebar Controls|Sidebar Controls]]
- [[_COMMUNITY_OKLCH Utilities|OKLCH Utilities]]
- [[_COMMUNITY_Select Component|Select Component]]
- [[_COMMUNITY_Export Pipeline|Export Pipeline]]
- [[_COMMUNITY_WCAG Contrast|WCAG Contrast]]
- [[_COMMUNITY_HSL Fallback|HSL Fallback]]
- [[_COMMUNITY_Popover Component|Popover Component]]
- [[_COMMUNITY_Dialog Component|Dialog Component]]
- [[_COMMUNITY_Dropdown Menu|Dropdown Menu]]
- [[_COMMUNITY_System Color Triangle|System Color Triangle]]
- [[_COMMUNITY_Accordion Component|Accordion Component]]
- [[_COMMUNITY_Table Component|Table Component]]
- [[_COMMUNITY_CSS Variable Bridge|CSS Variable Bridge]]
- [[_COMMUNITY_Alert Dialog|Alert Dialog]]
- [[_COMMUNITY_Command Component|Command Component]]
- [[_COMMUNITY_Page Entry|Page Entry]]
- [[_COMMUNITY_HueWheel Component|HueWheel Component]]
- [[_COMMUNITY_Card Component|Card Component]]
- [[_COMMUNITY_Progress Component|Progress Component]]
- [[_COMMUNITY_Alert Component|Alert Component]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]

## God Nodes (most connected - your core abstractions)
1. `Khaali Colours PRD` - 14 edges
2. `Lighthouse Redesign Spec` - 13 edges
3. `khaaliColors PRD` - 11 edges
4. `OKLCH Color Space` - 10 edges
5. `Neutral Palette Generation (Fibonacci Multipliers)` - 10 edges
6. `Sidebar Component (sticky controls)` - 8 edges
7. `Lighthouse Layout Framework (Header + Sidebar + Main)` - 7 edges
8. `ColorProvider React Context` - 7 edges
9. `generateModePaletteV2()` - 6 edges
10. `createChromaticShade()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Next.js 15 + React 19 Tech Stack` --conceptually_related_to--> `Icon: Vercel Logo (White Triangle)`  [INFERRED]
  PRD.md → public/vercel.svg
- `Next.js 15 + React 19 Tech Stack` --conceptually_related_to--> `Icon: Next.js Wordmark`  [INFERRED]
  PRD.md → public/next.svg
- `Rationale: HSL Fallback for sRGB Compatibility` --semantically_similar_to--> `Bug: HSL Fallback Missing from CSS Export (FR-16)`  [INFERRED] [semantically similar]
  PRD.md → spec/review-2026-04-09.md
- `Contrast Ratio Display Control` --semantically_similar_to--> `Contrast Validation Gaps Community`  [INFERRED] [semantically similar]
  spec/lighthouse-redesign.md → graphify-out/GRAPH_REPORT.md
- `Export Formats (CSS, Tailwind v4, JSON, shadcn)` --semantically_similar_to--> `Export Dialog (4 Formats via Context)`  [INFERRED] [semantically similar]
  PRD.md → spec/lighthouse-redesign.md

## Hyperedges (group relationships)
- **High-Value Bugs Blocking Ship** — review_hsl_fallback_missing, review_huewheel_mouse_only, review_no_responsiveness, review_contrast_not_persistent, review_dead_wizard_components, review_lock_file_conflict [EXTRACTED 1.00]
- **WCAG Accessibility Validation Chain** — prd_wcag_contrast, review_contrast_not_persistent, review_dead_code_contrast [INFERRED 0.85]
- **Color System Specification (OKLCH + Neutrals + Chromatic + System + WCAG)** — prd_oklch_color_space, prd_neutral_palette_generation, prd_chromatic_accent_generation, prd_system_color_linkage, prd_wcag_contrast, prd_nine_neutral_tokens, prd_scale_system [EXTRACTED 0.95]
- **Lighthouse Implementation Pipeline (Init -> Math -> Provider -> UI -> Polish)** — plan_task1_shadcn_init, plan_task2_system_colors, plan_task3_css_variables, plan_task4_color_provider, plan_task7_sidebar_controls, plan_task16_wire_layout, plan_task19_smoke_test [EXTRACTED 0.90]
- **Core Design Rationales (OKLCH + App-as-Preview + No-Wizard + Independent Themes)** — rationale_oklch_over_hsl, rationale_app_is_preview, rationale_no_wizard, rationale_independent_themes, rationale_fibonacci_multipliers, rationale_css_variable_injection [INFERRED 0.80]

## Communities

### Community 0 - "App Shell & PRD"
Cohesion: 0.06
Nodes (40): CLAUDE.md Graphify Rules, Community: App Shell & Layout (16 nodes, cohesion 0.12), God Node: Khaali Colours PRD (14 edges), God Node: Sidebar Component (8 edges), Hue Wheel Picker Community, Knowledge Gap: 50 Isolated Nodes, Khaali Colours PRD (God Node), Graph Report (310 nodes, 279 edges, 83 communities) (+32 more)

### Community 1 - "Color System & Assets"
Cohesion: 0.07
Nodes (38): Community: Color System & Assets (34 nodes, cohesion 0.08), Community: Palette Generation & Sidebar (28 nodes, cohesion 0.08), Icon: Next.js Wordmark, Icon: Vercel Logo (White Triangle), Accent Color Generation, Color Level System (L0-L3/Muted), Display P3 Gamut, Khaali Colours PRD (+30 more)

### Community 2 - "Palette Generation & State"
Cohesion: 0.07
Nodes (35): Contrast Validation Gaps Community, generateModePaletteV2() (God Node), OKLCH Color Space (God Node), ColorProvider React Context, ColorState Interface, ColorState Interface (User Inputs + Computed), 33 shadcn/ui Component Grid, Contrast Ratio Display Control (+27 more)

### Community 3 - "V2 Palette Internals"
Cohesion: 0.2
Nodes (18): calculateOptimalChroma(), clampMuted(), clampScale(), createChromaticShade(), createNeutralToken(), formatHslCss(), formatOklchHue(), formatOklchNone() (+10 more)

### Community 4 - "V1 Accent Engine"
Cohesion: 0.24
Nodes (8): calculateOptimalChroma(), createAccentColor(), createAccentShade(), createSystemAccent(), createSystemAccentShade(), generateAccentShades(), generateDefaultSystemAccents(), generateSystemAccentShades()

### Community 5 - "Sidebar Controls"
Cohesion: 0.18
Nodes (12): Chromatic Accent Section, Base Selection (L0 swatches), Scale Slider Control (2-13), Sidebar Component (sticky controls), System Color Equilateral Triangle Linkage, System Colors UI (3 restricted hue wheels), Theme Toggle Flow (light/dark), Task 2: System Color Linkage Math (+4 more)

### Community 6 - "OKLCH Utilities"
Cohesion: 0.2
Nodes (2): createNeutral(), createOklch()

### Community 7 - "Select Component"
Cohesion: 0.2
Nodes (0): 

### Community 8 - "Export Pipeline"
Cohesion: 0.25
Nodes (0): 

### Community 9 - "WCAG Contrast"
Cohesion: 0.48
Nodes (5): checkContrast(), findContrastingLightness(), getContrastRatio(), getRelativeLuminance(), suggestTextColor()

### Community 10 - "HSL Fallback"
Cohesion: 0.38
Nodes (3): createHsl(), createNeutralHsl(), oklchToHsl()

### Community 11 - "Popover Component"
Cohesion: 0.33
Nodes (0): 

### Community 12 - "Dialog Component"
Cohesion: 0.33
Nodes (0): 

### Community 13 - "Dropdown Menu"
Cohesion: 0.33
Nodes (0): 

### Community 14 - "System Color Triangle"
Cohesion: 0.67
Nodes (5): createSystemTriangle(), getRestrictedRange(), normalize(), rotateTriangle(), shortestDelta()

### Community 15 - "Accordion Component"
Cohesion: 0.4
Nodes (0): 

### Community 16 - "Table Component"
Cohesion: 0.4
Nodes (0): 

### Community 17 - "CSS Variable Bridge"
Cohesion: 0.5
Nodes (2): generateShadcnVariables(), vividAccent()

### Community 18 - "Alert Dialog"
Cohesion: 0.5
Nodes (0): 

### Community 19 - "Command Component"
Cohesion: 0.5
Nodes (0): 

### Community 20 - "Page Entry"
Cohesion: 0.67
Nodes (0): 

### Community 21 - "HueWheel Component"
Cohesion: 1.0
Nodes (2): getHueName(), HueWheel()

### Community 22 - "Card Component"
Cohesion: 0.67
Nodes (0): 

### Community 23 - "Progress Component"
Cohesion: 0.67
Nodes (0): 

### Community 24 - "Alert Component"
Cohesion: 0.67
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 0.67
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Community 52"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Community 53"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Community 54"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Community 55"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (2): Lighthouse Redesign Out of Scope Items, Rationale: Desktop Only (Mobile/Responsive Deferred)

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (1): Planned File Structure

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (1): Issue: Lock File Conflict (package-lock.json vs pnpm-lock.yaml)

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (1): Icon: Document/File (16x16)

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (1): Icon: Globe/World (16x16)

### Community 67 - "Community 67"
Cohesion: 1.0
Nodes (1): Icon: Browser Window (16x16)

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (0): 

### Community 69 - "Community 69"
Cohesion: 1.0
Nodes (0): 

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (0): 

### Community 71 - "Community 71"
Cohesion: 1.0
Nodes (0): 

### Community 72 - "Community 72"
Cohesion: 1.0
Nodes (0): 

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (0): 

### Community 74 - "Community 74"
Cohesion: 1.0
Nodes (0): 

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (0): 

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (1): Task 10: Button & Toggle Sections

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (1): Task 11: Input & Form Sections

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (1): Task 12: Feedback & Status Sections

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (1): Task 13: Overlay & Popup Sections

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (1): Task 14: Layout & Structure Sections

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (1): Task 15: Data Display Sections

### Community 82 - "Community 82"
Cohesion: 1.0
Nodes (1): Shareable URL with Palette Config (Not Started)

### Community 83 - "Community 83"
Cohesion: 1.0
Nodes (1): Community: V2 Palette Internals (18 nodes, cohesion 0.2)

## Knowledge Gaps
- **62 isolated node(s):** `Live Preview with Sample Components`, `Planned File Structure`, `Shareable URL with Palette Config (Nice to Have)`, `Rationale: OKLCH for Perceptual Uniformity`, `Rationale: Progressive Disclosure via Wizard` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 27`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `ColorProvider()`, `ColorProvider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `ScaleSlider()`, `ScaleSlider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `ContrastDisplay()`, `ContrastDisplay.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `ThemeToggle.tsx`, `ThemeToggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (2 nodes): `cn()`, `input-group.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (2 nodes): `cn()`, `input-otp.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (2 nodes): `cn()`, `label.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (2 nodes): `tooltip.tsx`, `TooltipContent()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (2 nodes): `switch.tsx`, `Switch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (2 nodes): `Badge()`, `badge.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (2 nodes): `cn()`, `separator.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (2 nodes): `cn()`, `button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (2 nodes): `toggle.tsx`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (2 nodes): `Checkbox()`, `checkbox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (2 nodes): `Collapsible()`, `collapsible.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (2 nodes): `textarea.tsx`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (2 nodes): `Input()`, `input.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (2 nodes): `AppShell()`, `AppShell.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (2 nodes): `Header()`, `Header.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (2 nodes): `Sidebar()`, `Sidebar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (2 nodes): `ComponentGrid()`, `ComponentGrid.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (2 nodes): `ComponentSection()`, `ComponentSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (2 nodes): `LayoutSections()`, `LayoutSections.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (2 nodes): `FeedbackSections()`, `FeedbackSections.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (2 nodes): `InputSections()`, `InputSections.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (2 nodes): `DataSections()`, `DataSections.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (2 nodes): `ButtonSections()`, `ButtonSections.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (2 nodes): `useColorContext.ts`, `useColorContext()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (2 nodes): `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (2 nodes): `Lighthouse Redesign Out of Scope Items`, `Rationale: Desktop Only (Mobile/Responsive Deferred)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `color.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `ColorSwatch.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `palette-v2.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `Planned File Structure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `Issue: Lock File Conflict (package-lock.json vs pnpm-lock.yaml)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `Icon: Document/File (16x16)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `Icon: Globe/World (16x16)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (1 nodes): `Icon: Browser Window (16x16)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `SystemColors.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `AccentSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `BaseSelection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `slider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (1 nodes): `sonner.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (1 nodes): `OverlaySections.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `system-colors.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `css-variables.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `Task 10: Button & Toggle Sections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `Task 11: Input & Form Sections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `Task 12: Feedback & Status Sections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `Task 13: Overlay & Popup Sections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `Task 14: Layout & Structure Sections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `Task 15: Data Display Sections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `Shareable URL with Palette Config (Not Started)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `Community: V2 Palette Internals (18 nodes, cohesion 0.2)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `khaaliColors PRD` connect `App Shell & PRD` to `Color System & Assets`, `Palette Generation & State`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `Lighthouse Redesign Spec` connect `App Shell & PRD` to `Palette Generation & State`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `Khaali Colours PRD` connect `Color System & Assets` to `Palette Generation & State`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Khaali Colours PRD` (e.g. with `Bug: Zero Responsiveness (Hardcoded 60/40 Split)` and `Issue: No Tests Despite vitest Installed`) actually correct?**
  _`Khaali Colours PRD` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Live Preview with Sample Components`, `Planned File Structure`, `Shareable URL with Palette Config (Nice to Have)` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Shell & PRD` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Color System & Assets` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._