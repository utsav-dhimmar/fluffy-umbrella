import { useDeferredValue, useEffect, useState } from "react";
import { curatedCatalog, type CatalogItem } from "../data/catalog";
import { PROVIDERS, DEFAULT_PROVIDER } from "../data/providers";
import type { SearchMode, Provider } from "../types";
import { dedupeCatalog, fetchLatestMatches, normalizeText, useDPadNavigation } from "../utils";
import { PlayerPanel } from "./ui/Player";

const DEFAULT_SELECTION = curatedCatalog[0];

export function CinemaDeck() {
  useDPadNavigation();
  const [searchMode, setSearchMode] = useState<SearchMode>("tv");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CatalogItem>(DEFAULT_SELECTION);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [provider, setProvider] = useState<Provider>(DEFAULT_PROVIDER);
  const [remoteResults, setRemoteResults] = useState<CatalogItem[]>([]);
  const [searchState, setSearchState] = useState<
    "idle" | "searching" | "ready" | "error"
  >("idle");
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = normalizeText(query);
  const localResults = dedupeCatalog(
    curatedCatalog.filter((item) => {
      const modeMatches = searchMode === "all" || item.kind === searchMode;
      const queryMatches =
        !normalizedQuery || normalizeText(item.title).includes(normalizedQuery);

      return modeMatches && queryMatches;
    }),
  ).slice(0, 8);

  useEffect(() => {
    if (deferredQuery.trim().length < 2) {
      setRemoteResults([]);
      setSearchState("idle");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        setSearchState("searching");
        const matches = await fetchLatestMatches(
          deferredQuery,
          searchMode,
          controller.signal,
        );
        setRemoteResults(matches);
        setSearchState("ready");
      } catch {
        if (!controller.signal.aborted) {
          setRemoteResults([]);
          setSearchState("error");
        }
      }
    }, 650);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [deferredQuery, searchMode]);

  const results = dedupeCatalog([...localResults, ...remoteResults]).slice(
    0,
    12,
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-400 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_360px]">
        <PlayerPanel
          episode={episode}
          onEpisodeChange={setEpisode}
          onSeasonChange={setSeason}
          season={season}
          selected={selected}
          provider={provider}
        />

        <aside className="panel flex flex-col">
          <div className="border-b border-white/5 px-4 py-4">
            <p className="text-[10px] uppercase tracking-[0.45em] text-muted">
              Lookup
            </p>
            <h2 className="font-display text-2xl tracking-[0.06em]">
              Search by name
            </h2>
          </div>

          <div className="space-y-4 p-4">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                Title search
              </span>
              <input
                className="search-input"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search series or movies"
                type="text"
                value={query}
              />
            </label>

            <div className="flex gap-2 my-2">
              {(["tv", "all", "movie"] as SearchMode[]).map((mode) => (
                <button
                  className={
                    mode === searchMode ? "mode-chip active" : "mode-chip"
                  }
                  key={mode}
                  onClick={() => setSearchMode(mode)}
                  type="button"
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                Provider
              </span>
              <div className="flex flex-wrap gap-2">
                {PROVIDERS.map((p) => (
                  <button
                    className={
                      p.id === provider.id ? "mode-chip active" : "mode-chip"
                    }
                    key={p.id}
                    onClick={() => setProvider(p)}
                    type="button"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-black/20 p-3 text-xs leading-5 text-muted">
              Lightweight behavior: curated titles render instantly, then TMDB
              search results are fetched after you pause for a moment.
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
            {results.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/10 bg-white/5 p-4 text-sm text-muted">
                No title matched this query yet. Try a broader name or switch
                the filter.
              </div>
            ) : (
              results.map((item) => {
                const isActive =
                  selected.title === item.title && selected.kind === item.kind;

                return (
                  <button
                    className={isActive ? "result-card active" : "result-card"}
                    key={`${item.kind}-${item.imdbId ?? item.tmdbId ?? item.title}`}
                    onClick={() => {
                      setSelected(item);

                      if (item.kind === "tv") {
                        setSeason(1);
                        setEpisode(1);
                      }
                    }}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl leading-none">
                          {item.title}
                        </p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted">
                          {item.kind} / {item.year}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-accent">
                        {item.badge}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {item.blurb}
                    </p>
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-white/5 px-4 py-3 text-xs leading-5 text-muted opacity-60">
            {searchState === "searching" && "Searching TMDB database..."}
            {searchState === "ready" && "Results from TMDB loaded."}
            {searchState === "error" &&
              "TMDB search failed. Curated results are still available."}
            {searchState === "idle" &&
              "Search stays minimal until you start typing."}
          </div>
        </aside>
      </section>
    </div>
  );
}
