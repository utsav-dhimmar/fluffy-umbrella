import { memo } from "react";
import type { CatalogItem } from "../../data/catalog";
import { buildEmbedUrl } from "../../utils";

export const PlayerPanel = memo(function PlayerPanel({
  episode,
  onEpisodeChange,
  onSeasonChange,
  season,
  selected,
}: {
  episode: number;
  onEpisodeChange: (value: number) => void;
  onSeasonChange: (value: number) => void;
  season: number;
  selected: CatalogItem;
}) {
  const playerUrl = buildEmbedUrl(selected, season, episode);

  return (
    <div className="panel overflow-hidden">
      <div className="grid gap-4 p-3 md:p-4">
        <div className="aspect-video overflow-hidden rounded-lg border border-white/5 bg-black">
          {playerUrl ? (
            <iframe
              allow="autoplay; fullscreen"
              allowFullScreen
              className="h-full w-full"
              loading="eager"
              src={playerUrl}
              title={`${selected.title} player`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              Select a title with a valid TMDB id.
            </div>
          )}
        </div>

        <div className="grid gap-4 rounded-lg border border-white/5  p-4 md:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-accent-muted px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent">
                {selected.badge}
              </span>
              <span className="text-[11px] uppercase tracking-[0.28em] text-muted">
                {selected.kind === "tv" ? "Series" : "Movie"} / {selected.year}
              </span>
            </div>

            <div>
              <h2 className="font-display text-3xl leading-none">
                {selected.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {selected.blurb}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-black/20 p-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Playback controls
            </p>
            {selected.kind === "tv" ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-muted">
                    Season
                  </span>
                  <input
                    className="control-input"
                    min={1}
                    onChange={(event) =>
                      onSeasonChange(
                        Math.max(1, Number(event.target.value) || 1),
                      )
                    }
                    type="number"
                    value={season}
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.22em] text-muted">
                    Episode
                  </span>
                  <input
                    className="control-input"
                    min={1}
                    onChange={(event) =>
                      onEpisodeChange(
                        Math.max(1, Number(event.target.value) || 1),
                      )
                    }
                    type="number"
                    value={episode}
                  />
                </label>
              </div>
            ) : (
            	<p className="mt-3 text-sm leading-6 text-muted">
            		Movies play directly with the vidsrcme movie
            		embed endpoint.
            	</p>
            )}

            <div className="mt-4 text-[10px] leading-4 text-muted opacity-50">
            	Embed source uses the vidsrcme.ru endpoints with
            	TMDB/IMDb required.
            </div>
            </div>

        </div>
      </div>
    </div>
  );
});
