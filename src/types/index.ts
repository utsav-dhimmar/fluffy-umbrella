import type { MediaKind } from "../data/catalog";

export type RemotePayload = {
	result?: Array<{
		imdb_id?: string | null;
		tmdb_id?: string | null;
		title?: string | null;
	}>;
	pages?: number;
};
export type SearchMode = "all" | MediaKind;

export interface Provider {
	id: string;
	name: string;
	movieUrl: string; // template like "https://.../movie/{id}"
	tvUrl: string; // template like "https://.../tv/{id}/{s}/{e}"
}

export interface TMDB_RESPONSE {
	page: number;
	results: Result[];
	total_pages: number;
	total_results: number;
}

export interface Result {
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title?: string;
	original_name?: string;
	overview: string;
	popularity: number;
	poster_path?: string;
	release_date?: string;
	first_air_date?: string;
	title?: string;
	name?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
}
