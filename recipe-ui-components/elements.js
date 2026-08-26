// Production/bundler-friendly entry point: statically imports each component's
// self-registering custom-element module (dist-custom-elements output), so
// tools like Rollup/Vite can trace and bundle everything at build time instead
// of relying on Stencil's lazy-loading runtime chunk-splitting (which breaks
// in bundled production builds — see the default `.` export for that variant,
// intended for direct <script type="module"> / unbundled usage instead).
export * from './dist/components/rp-badge.js';
export * from './dist/components/rp-day-slot.js';
export * from './dist/components/rp-empty-state.js';
export * from './dist/components/rp-recipe-card.js';
export * from './dist/components/rp-search-bar.js';
