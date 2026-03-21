const isCloudflareRuntime = () => {
	try {
		return typeof globalThis.env !== "undefined";
	} catch {
		return false;
	}
};

export function getEnvVar(key: string, env?: any): string | undefined {
	if (env && env[key]) {
		return env[key];
	}

	if (isCloudflareRuntime()) {
		return (globalThis.env as Record<string, string | undefined>)[key];
	}

	return import.meta.env[key] as string | undefined;
}
