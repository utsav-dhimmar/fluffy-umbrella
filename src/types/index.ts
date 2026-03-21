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
