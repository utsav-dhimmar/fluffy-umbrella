// src/pages/api/items.ts
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	const data = {
		message: "Hello from Astro API!",
		timestamp: new Date().toISOString(),
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const POST: APIRoute = async ({ request }) => {
	// Logic to handle POST requests, e.g., saving data
	const body = await request.json();
	const name = body.name;

	return new Response(
		JSON.stringify({
			message: `Name received: ${name}`,
		}),
		{
			status: 201, // Created
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
};
