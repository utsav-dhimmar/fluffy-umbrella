import type { CatalogItem, MediaKind } from "../data/catalog";
import type { Result, SearchMode, TMDB_RESPONSE } from "../types";
import { getEnvVar } from "./env";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function searchTMDB(
	query: string,
	mode: SearchMode,
	signal?: AbortSignal,
	env?: any,
): Promise<CatalogItem[]> {
	const API_KEY = await getEnvVar("TMDB_API_KEY", env);

	if (!API_KEY) {
		throw new Error("TMDB_API_KEY is missing");
	}

	const results: CatalogItem[] = [];
	const isNumericId = /^\d+$/.test(query.trim());

	const fetchFromTMDB = async (kind: MediaKind) => {
		const endpoint = kind === "movie" ? "movie" : "tv";

		try {
			if (isNumericId) {
				// Try fetching by ID directly
				const url = new URL(
					`${TMDB_BASE_URL}/${endpoint}/${query.trim()}`,
				);
				url.searchParams.append("api_key", API_KEY);

				const response = await fetch(url.toString(), { signal });
				if (response.ok) {
					const item = (await response.json()) as Result;
					if (item && item.id) {
						const title = item.title || item.name || "Unknown Title";
						const releaseDate =
							item.release_date || item.first_air_date || "";
						const year = releaseDate
							? new Date(releaseDate).getFullYear()
							: 0;

						return [
							{
								title,
								year,
								kind,
								tmdbId: String(item.id),
								blurb: item.overview || `A TMDB ${kind} result.`,
								badge:
									kind === "movie" ? "TMDB Movie" : "TMDB Series",
							},
						];
					}
				}
			}

			// Search by title
			const url = new URL(`${TMDB_BASE_URL}/search/${endpoint}`);
			url.searchParams.append("api_key", API_KEY);
			url.searchParams.append("query", query);

			const response = await fetch(url.toString(), { signal });
			if (!response.ok) return [];

			const data = (await response.json()) as TMDB_RESPONSE;
			const tmdbResults = data.results || [];

			return tmdbResults.map((item: Result): CatalogItem => {
				const title = item.title || item.name || "Unknown Title";
				const releaseDate =
					item.release_date || item.first_air_date || "";
				const year = releaseDate
					? new Date(releaseDate).getFullYear()
					: 0;

				return {
					title,
					year,
					kind,
					tmdbId: String(item.id),
					blurb: item.overview || `A TMDB ${kind} result.`,
					badge: kind === "movie" ? "TMDB Movie" : "TMDB Series",
				};
			});
		} catch (error) {
			// If searching by ID fails, we don't necessarily want to log it as an error if it was just a guess
			return [];
		}
	};

	if (mode === "movie" || mode === "all") {
		const movies = await fetchFromTMDB("movie");
		results.push(...movies);
	}

	if (mode === "tv" || mode === "all") {
		const series = await fetchFromTMDB("tv");
		results.push(...series);
	}

	return results;
}

// Keep fetchMovies for backward compatibility if needed, but update it to use searchTMDB
export async function fetchMovies(query: string = "batman", env?: any) {
	return searchTMDB(query, "movie", undefined, env);
}
