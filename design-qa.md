# Design QA

## Visual truth

- Selected reference: `C:\Users\benja\AppData\Local\Temp\codex-clipboard-2b8f9d34-6aef-4fc6-a697-14007e000f80.png`
- Reference size: 1024 × 1536
- Primary implementation state: `http://localhost:4173/`, full page at 1024 × 1536 CSS pixels
- Density normalization: 1:1 CSS-pixel comparison
- Latest user-annotated implementation evidence:
  - `C:\Users\benja\AppData\Local\Temp\codex-clipboard-4007c23f-181e-43f2-b519-0f4fbaadf3ac.png`
  - `C:\Users\benja\AppData\Local\Temp\codex-clipboard-62e09caf-d30b-489a-9dfb-874ce46bea60.png`

## Review history

### Pass 1

- P1: Portrait retained a hard white rectangle instead of integrating with the lavender hero background.
- P1: Page structure and section proportions diverged from the selected reference.
- P2: Contact signature used a low-resolution crop and became visibly blurry when enlarged.
- P2: “Process before tools.” used a synthetic CSS underline rather than the natural handwritten underline.
- P2: The right-hand principle list used serif labels and typeset arrow glyphs.

Implemented fixes:

- Built a transparent portrait cutout with a reference-matched purple suit treatment and a subtle lavender hero background asset.
- Rebalanced the hero, About, Tyria, and Contact section proportions against the 1024 × 1536 reference.
- Rebuilt the exact requested signature lockup as a 1440 × 780 sharpened transparent asset.
- Replaced the synthetic note with a 1440 × 400 transparent crop of the original handwritten note and natural underline.
- Converted principle labels to handwriting and replaced arrow glyphs with curved hand-drawn SVG strokes.

### Pass 2

- Focused browser inspection confirmed the stray serif fragment above “tools” is removed.
- Focused browser inspection confirmed the arrows now use a bowed rising stroke matching the supplied arrow reference.
- Full-page browser inspection confirmed the sharpened signature remains clear at its 310 px display width.
- Responsive check at 390 × 844 found no horizontal page overflow (`scrollWidth` 375 at a 390 px browser viewport).
- Header-to-contact anchor behavior was verified in the running prototype.

### Pass 3

- Removed the hard white divider bands and replaced the independent section fills with a continuous white-to-lavender fog system.
- Added a restrained violet halo around the page frame so the light surface graduates naturally into the dark canvas.
- Rebuilt the portrait alpha from both sides of the original studio background, removing the retained white wedge and rectangular background region.
- Added a soft bottom mask to the portrait so the suit transitions into the About section without a hard crop.
- Upscaled and sharpened the Operating Model card from 474 × 320 to 1896 × 1280, then added a subtle desktop-only edge fade.
- Removed the fixed Contact height; the CTA now remains fully inside the rounded page frame.
- Final desktop and 390 × 844 mobile checks showed no horizontal overflow, no Vite error overlay, and no clipped interactive content.
- Corrected the portrait mask export so the studio background is genuinely transparent (54.2% fully transparent pixels; all four outer background samples have zero alpha).
- Reduced the Operating Model crop's baked-in edge contrast and applied intersecting four-edge masks so its outline and shadow dissolve into the Tyria section while preserving the sharp center content.
- Replaced the diagonal hero artwork with clean radial fog gradients and moved the transition blur from the full section boundary to a 68 px portrait-only backdrop blur at the bottom of the jacket.
- Replaced the rectangular backdrop blur with two aligned transparent portrait layers: a gradually masked sharp layer and a bottom-only blurred layer, eliminating the visible blur box.
- Increased internal vertical spacing across Hero, About, Tyria, and Contact while keeping every section background contiguous; desktop and 390 × 844 mobile checks remain overflow-free.
- Corrected the Operating Model's hard top seam by insetting the card within the Tyria section and replacing intersecting rectangular masks with one continuous elliptical feather.
- Replaced the Operating Model raster crop with a live HTML/CSS card, eliminating its baked-in photographic shadow and retaining only a broad 7%-opacity page-native shadow with fully crisp text.
- Smoothed the Hero/About join by matching both boundary colors to `#f2f1ff`, reducing the portrait blur layer to 24% opacity, and adding a portrait-local lavender wash over the final fade pixels.
- Refined the Operating Model to a middle-ground treatment: live crisp content on a translucent, lightly grained paper surface with a broad 4.5%-opacity ambient shadow.
- Smoothed the Tyria-to-Contact handoff with a shared `#eef0ff` boundary color and a 72 px desktop-only settling gradient at the end of Tyria.

### Pass 4

- The Hero-to-About handoff still collected the dark suit color into a visible horizontal haze below the portrait.

Implemented fix:

- Removed the separate blurred portrait layer entirely. The transparent portrait now uses one progressively lighter alpha mask and a matching lavender color wash over its final pixels, so the jacket dissolves into the hero ground without a dark blur band or a second rectangular transition effect.
- Moved the Tyria handwritten “Clarity → Coordination → Progress” note above the section-settling gradient, preserving its full contrast while the Operating Model card continues to dissolve into the Contact handoff beneath it.
- Removed the faint, low-value text navigation. The header now begins as a clear signature and primary contact action, then fades away on scroll rather than turning into an oversized centered logo pill that competes with the page content.
- Moved the concise Name, Email, optional Phone, and Message form into an accessible “Let’s talk” dialog. Both header and Contact calls to action open the same dialog; Escape, the close control, and clicking the backdrop dismiss it. Its client-side submit flow opens a pre-addressed email to `hello@bkwick.com` with the completed details, without collecting or persisting visitor data on the prototype itself.
- Expanded the desktop frame from a narrow 1120px cap to a fluid layout capped at 1720px, with larger-screen spacing, typography, portrait, and section proportions tuned at 1440px and above. A 1920 × 1080 browser check confirms the composition uses the display confidently without stretching into an ultrawide distortion.
- Centered the wide-screen composition inside a 1420px visual-content area while preserving the larger atmospheric frame; a 1920 × 1080 check confirms the hero and subsequent content no longer feel stranded at the edges.
- Reworked the hero’s responsive breakpoints: 621–820px keeps the copy and right-hand portrait in a deliberate two-column composition, while 430px uses full-width copy followed by a right-anchored portrait. Geometry checks confirm no horizontal overflow at 430px and a clear copy/portrait split at 768px.
- Removed the Contact button’s default browser border/highlight; keyboard focus remains available through `:focus-visible` only.
- Balanced the wide-screen About, Tyria, and Contact compositions into equal inner columns. The principle list, live Operating Model card, and signature now align to the centered content area rather than the outer frame edges; a 1920 × 1080 check confirms the sections retain a stable visual center.
- Rebuilt the narrow-phone hero into a deliberate side-by-side composition: concise three-line headline and portrait share the upper hero, the handwritten Ideas-to-Progress note uses two balanced rows with three arrows, and the supporting principle centers at the base.

## Result

`passed — latest portrait fade refined in the running prototype`

No P0, P1, or P2 fidelity issues remain for the currently selected reference. The generated portrait crop remains an intentional approximation of the reference composition because the supplied headshot has a different original framing.
