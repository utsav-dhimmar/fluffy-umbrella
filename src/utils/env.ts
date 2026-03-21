const isCloudflareRuntime = () => {
	try {
		return typeof globalThis.env !== "undefined";
	} catch {
		return false;
	}
};

export function getEnvVar(key: string): string | undefined {
	if (isCloudflareRuntime()) {
		return (globalThis.env as Record<string, string | undefined>)[key];
	}
	return import.meta.env[key] as string | undefined;
}
