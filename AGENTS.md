# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

The desktop composition should expand confidently on larger screens. Keep a generous full-width frame (up to 1720px) with proportionally increased typography and spacing, while retaining a cap that protects the portrait crop and operating-model card from ultrawide distortion.

On wide screens, center each two-part section's visual weight within the inner content area. Use balanced columns so the About principle list, Tyria operating-model card, and Contact signature do not drift toward the outer page edges.

For responsive hero behavior, keep the headshot on the right through small-tablet and narrow-phone widths; it should sit alongside the concise hero message rather than stacking below it.

For the current mobile composition, keep the portrait visually alongside the hero message instead of stacking it below. Present the handwritten Ideas-to-Progress note as a balanced two-row, three-arrow annotation beneath the heading, with the hero principle centered at the section base.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
