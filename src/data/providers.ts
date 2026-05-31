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
  }, {
    id: "vidnest",
    name:"Vidnest",
    movieUrl:"https://vidnest.fun/movie/{id}",
    tvUrl:"https://vidnest.fun/tv/{id}/{s}/{e}",
  }, {
    id: "cinezo",
    name:"Cinezo",
    movieUrl:"https://player.cinezo.live/embed/movie/{id}",
    tvUrl:"https://player.cinezo.live/embed/tv/{id}/{s}/{e}",
  },
];

export const DEFAULT_PROVIDER = PROVIDERS[0];
