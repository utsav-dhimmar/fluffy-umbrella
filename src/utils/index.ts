import type { CatalogItem } from "../data/catalog";
import type { RemotePayload, SearchMode } from "../types";
import { searchTMDB } from "./fetch-movie";
export * from "./fetch-movie";

export function normalizeText(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}

export function dedupeCatalog(items: CatalogItem[]) {
	const map = new Map<string, CatalogItem>();

	for (const item of items) {
		const key =
			item.imdbId ??
			item.tmdbId ??
			`${item.kind}:${item.title}:${item.year}`;

		if (!map.has(key)) {
			map.set(key, item);
		}
	}

	return Array.from(map.values());
}

export async function fetchLatestMatches(
	query: string,
	mode: SearchMode,
	signal: AbortSignal,
) {
	try {
		const searchUrl = new URL("/api/search", window.location.origin);
		searchUrl.searchParams.set("query", query);
		searchUrl.searchParams.set("mode", mode);

		const response = await fetch(searchUrl.toString(), { signal });

		if (!response.ok) {
			throw new Error(`Search failed: ${response.statusText}`);
		}

		const results = (await response.json()) as CatalogItem[];
		return dedupeCatalog(results).slice(0, 12);
	} catch (error) {
		if (error instanceof Error && error.name === "AbortError") {
			return [];
		}
		console.error("Failed to fetch from API, using fallback logic if any.");
		return [];
	}
}

export function buildEmbedUrl(
	item: CatalogItem,
	season: number,
	episode: number,
) {
	if (!item.tmdbId) {
		return "";
	}
	const DEFAULT_OPTION =
		"autoplay=false&primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=false&nextbutton=false";
	if (item.kind === "tv") {
		return (
			`https://vidlink.pro/tv/${item.tmdbId}/${season}/${episode}?` +
			DEFAULT_OPTION
		);
	}

	return `https://vidlink.pro/movie/${item.tmdbId}?` + DEFAULT_OPTION;
}
