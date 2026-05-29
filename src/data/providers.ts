import type { Provider } from "../types";

export const PROVIDERS: Provider[] = [
	{
		id: "vidfast",
		name: "Vidfast",
		movieUrl: "https://vidfast.pro/movie/{id}",
		tvUrl: "https://vidfast.pro/tv/{id}/{s}/{e}",
	},
	{
		id: "vidsrc",
		name: "Vidsrc",
		movieUrl: "https://vsembed.ru/embed/movie/{id}",
		tvUrl: "https://vsembed.ru/embed/tv/{id}/{s}/{e}",
	},
	{
		id: "vidzee",
		name: "Vidzee",
		movieUrl: "https://player.vidzee.wtf/embed/movie/{id}",
		tvUrl: "https://player.vidzee.wtf/embed/tv/{id}/{s}/{e}",
	},
];

export const DEFAULT_PROVIDER = PROVIDERS[0];
