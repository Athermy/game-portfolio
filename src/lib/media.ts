// Shown wherever a game or project has no video/gif/gallery image of its own yet.
// Place the actual file at: public/work_in_progress_background.jpg
//
// Astro serves everything in public/ from the site root, so locally that file
// is reached at /work_in_progress_background.jpg. But this site is configured
// with `base: '/game-portfolio'` in astro.config.mjs, so once deployed the
// real URL is /game-portfolio/work_in_progress_background.jpg — a hardcoded
// leading slash would 404 in production. import.meta.env.BASE_URL always
// resolves to the correct prefix for wherever the site is actually deployed.
const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
export const FALLBACK_IMAGE = `${base}work_in_progress_background.jpg`;
