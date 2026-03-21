export type MediaKind = "tv" | "movie";

export type CatalogItem = {
  title: string;
  year: number;
  kind: MediaKind;
  imdbId?: string;
  tmdbId?: string;
  blurb: string;
  badge: string;
};

export const curatedCatalog: CatalogItem[] = [
  {
    title: "Severance",
    year: 2022,
    kind: "tv",
    imdbId: "tt11280740",
    tmdbId: "95396",
    blurb: "Precision sci-fi for the late-night TV slot.",
    badge: "Office Dread",
  },
  {
    title: "The Last of Us",
    year: 2023,
    kind: "tv",
    imdbId: "tt3581920",
    tmdbId: "100088",
    blurb: "Prestige survival drama tuned for the big screen.",
    badge: "Prestige TV",
  },
  {
    title: "Breaking Bad",
    year: 2008,
    kind: "tv",
    imdbId: "tt0903747",
    tmdbId: "1396",
    blurb: "Lean, sharp, and still one of the best rewatches around.",
    badge: "Essential",
  },
  {
    title: "Game of Thrones",
    year: 2011,
    kind: "tv",
    imdbId: "tt0944947",
    tmdbId: "1399",
    blurb: "Use season and episode controls to jump directly in.",
    badge: "Epic TV",
  },
  {
    title: "The Bear",
    year: 2022,
    kind: "tv",
    imdbId: "tt14452776",
    tmdbId: "136315",
    blurb: "Fast, tense, and ideal for a quick episode session.",
    badge: "Kitchen Heat",
  },
  {
    title: "Arcane",
    year: 2021,
    kind: "tv",
    imdbId: "tt11126994",
    tmdbId: "94605",
    blurb: "Stylized animation with excellent TV pacing.",
    badge: "Animated",
  },
  {
    title: "Dark",
    year: 2017,
    kind: "tv",
    imdbId: "tt5753856",
    tmdbId: "70523",
    blurb: "Dense mystery for when you want a full-screen rabbit hole.",
    badge: "Mindbender",
  },
  {
    title: "True Detective",
    year: 2014,
    kind: "tv",
    imdbId: "tt2356777",
    tmdbId: "46648",
    blurb: "Anthology noir with a strong first-night draw.",
    badge: "Crime",
  },
  {
    title: "Dune: Part Two",
    year: 2024,
    kind: "movie",
    imdbId: "tt15239678",
    tmdbId: "693134",
    blurb: "Large-format spectacle when you want to switch to movies.",
    badge: "Scale",
  },
  {
    title: "Oppenheimer",
    year: 2023,
    kind: "movie",
    imdbId: "tt15398776",
    tmdbId: "872585",
    blurb: "A clean movie fallback for the same player shell.",
    badge: "Cinema",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    kind: "movie",
    imdbId: "tt9362722",
    tmdbId: "569094",
    blurb: "Bright, kinetic animation with a strong trailer-night feel.",
    badge: "Animated",
  },
  {
    title: "Blade Runner 2049",
    year: 2017,
    kind: "movie",
    imdbId: "tt1856101",
    tmdbId: "335984",
    blurb: "A good stress test for the widescreen player layout.",
    badge: "Neo-Noir",
  },
];
