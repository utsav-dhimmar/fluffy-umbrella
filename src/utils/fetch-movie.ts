import axios from "axios";
import type { CatalogItem, MediaKind } from "../data/catalog";
import type { SearchMode } from "../types";

export async function searchTMDB(
	query: string,
	mode: SearchMode,
	signal?: AbortSignal,
): Promise<CatalogItem[]> {
	const API_KEY = import.meta.env.TMDB_API_KEY;

	if (!API_KEY) {
		console.warn("TMDB_API_KEY is missing");
		return [];
	}

	const results: CatalogItem[] = [];
	const isNumericId = /^\d+$/.test(query.trim());

	const fetchFromTMDB = async (kind: MediaKind) => {
		const endpoint = kind === "movie" ? "movie" : "tv";

		try {
			if (isNumericId) {
				// Try fetching by ID directly
				const url = `https://api.themoviedb.org/3/${endpoint}/${query.trim()}`;
				const response = await axios.get(url, {
					params: { api_key: API_KEY },
					signal,
				});

				const item = response.data;
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

			// Search by title
			const url = `https://api.themoviedb.org/3/search/${endpoint}`;
			const response = await axios.get(url, {
				params: {
					api_key: API_KEY,
					query,
				},
				signal,
			});

			const tmdbResults = response.data.results || [];

			return tmdbResults.map((item: any): CatalogItem => {
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
			if (!isNumericId || axios.isAxiosError(error)) {
				// Silent fail for ID lookup if it wasn't a valid ID
			}
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
export async function fetchMovies(query: string = "batman") {
	return searchTMDB(query, "movie");
}
