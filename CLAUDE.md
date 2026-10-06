# CLAUDE.md

## `/traiteur` page layout — locked

`src/routes/traiteur/+page.svelte` is a full-bleed, edge-to-edge page (the
"Mille et une Bouchées" catering microsite). Its outer container intentionally
has no wrapping element, max-width, margin, padding, border, or rounded
corners — it spans the full viewport width directly under the site's fixed
navbar, using `-mx-2 md:-mx-20` to cancel the shared `<main>` layout's padding
(the same technique the `Banner` and `MenuBanner` slices use).

Do not modify this page's outer layout, container structure, or top-level
spacing unless the user explicitly asks for a layout change. If a requested
edit would touch the layout wrapper and the user didn't ask for a layout
change, stop and confirm first. Content/text/section edits are fine without
asking.

The site's global `Footer.svelte` (logo, opening hours, social icons) is
intentionally suppressed on `/traiteur` via `hideGlobalFooter` in
`src/routes/+layout.svelte` — the page has its own footer, and the two
stacking together caused overlapping content and a background-color seam.
Don't remove that check without confirming with the user first, since it
also governs whether the global footer appears here.
