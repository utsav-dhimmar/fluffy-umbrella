// src/utils/env.ts

export async function getEnvVar(key: string, env?: any): Promise<string | undefined> {
	// 1. If an env object is passed (legacy/explicit), use it
	if (env && env[key]) {
		return env[key];
	}

	// 2. Try the modern Astro 6 + Cloudflare way: cloudflare:workers
	// This only works at runtime/build in workerd
	try {
		// @ts-ignore - cloudflare:workers is only available in workerd
		const { env: cfEnv } = await import("cloudflare:workers");
		if (cfEnv && cfEnv[key]) {
			return cfEnv[key];
		}
	} catch (e) {
		// Ignore if not in workerd environment
	}

	// 3. Fallback to standard Astro env (for local dev without platformProxy or static build)
	return import.meta.env[key] as string | undefined;
}
