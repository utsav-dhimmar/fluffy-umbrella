import type { APIRoute } from "astro";
import type { SearchMode } from "../../types";
import { searchTMDB } from "../../utils/fetch-movie";

export const prerender = false;

export const GET: APIRoute = async (context) => {
	const { url, locals } = context;
	const query = url.searchParams.get("query");
	const mode = (url.searchParams.get("mode") as SearchMode) || "all";
	const env = (locals as any).runtime?.env;

	if (!query) {
		return new Response(JSON.stringify([]), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const results = await searchTMDB(query, mode, undefined, env);
		return new Response(JSON.stringify(results), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		console.error("API search error:", error);
		return new Response(JSON.stringify({ error: "Search failed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
