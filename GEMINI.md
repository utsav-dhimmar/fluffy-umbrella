# Living Room Signal (lol-movies)

A TV-first vidfast.pro player built with **Astro 6**, **React 19**, and **Tailwind CSS 4**. Optimized for lightweight playback on slower machines or smart TV browsers.

## Project Overview

- **Purpose**: A minimalist, high-performance media browser and player shell for movies and TV shows.
- **Main Technologies**:
  - **Framework**: [Astro 6.0](https://astro.build/)
  - **UI Library**: [React 19](https://react.dev/)
  - **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (using `@tailwindcss/vite`)
  - **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) (via `@astrojs/cloudflare` adapter)
  - **API**: The Movie Database (TMDB) for search and metadata.

## Architecture

- **`src/pages/`**: Contains the main entry point (`index.astro`) and API endpoints for searching TMDB (`api/search.ts`) and retrieving items.
- **`src/components/`**: House the interactive UI components. The core experience is driven by `CinemaDeck.tsx`.
- **`src/data/`**: Contains `catalog.ts` with a curated list of "Essential" and "Mindbender" media.
- **`src/utils/`**: Helper logic for environment variables (`env.ts`) and TMDB API integration (`fetch-movie.ts`).
- **`src/types/`**: TypeScript definitions for catalog items, search modes, and TMDB responses.

## Building and Running

### Prerequisites
- Node.js >= 22.12.0
- `pnpm` (recommended)

### Commands
| Command | Action |
| :--- | :--- |
| `pnpm install` | Install project dependencies |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Build the project for production |
| `pnpm preview` | Build and preview the site locally |
| `pnpm deploy` | Build and deploy to Cloudflare via Wrangler |
| `pnpm generate-types` | Update Cloudflare Worker types (`worker-configuration.d.ts`) |

## Development Conventions

- **Environment Variables**: Requires `TMDB_API_KEY` for search functionality.
- **Styling**: Uses Tailwind CSS 4. Direct CSS is located in `src/styles/global.css`.
- **Static vs SSR**: The project uses the Cloudflare adapter. The main index page is static, while API routes are configured for server-side execution (`prerender = false`).
- **Components**: Prefer functional React components with hooks. Use `client:idle` or `client:load` directives in Astro files for interactivity.

## Key Files
- `astro.config.mjs`: Astro and integration (React, Tailwind) configuration.
- `wrangler.toml`: Cloudflare Pages deployment settings.
- `src/data/catalog.ts`: The source of truth for the featured media deck.
- `src/utils/fetch-movie.ts`: Central logic for TMDB search and ID resolution.
