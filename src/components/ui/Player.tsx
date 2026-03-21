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
			<div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-6">
				<div>
					<p className="text-[10px] uppercase tracking-[0.45em] text-amber-300/70">
						Slow CPU mode
					</p>
					<h1 className="font-display text-2xl tracking-[0.08em] text-stone-50 md:text-4xl">
						Living Room Signal
					</h1>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<span className="status-dot bg-emerald-400" />
					<span className="text-xs uppercase tracking-[0.28em] text-stone-300">
						TV-first player
					</span>
				</div>
			</div>

			<div className="grid gap-4 p-3 md:p-4">
				<div className="aspect-video overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
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
						<div className="flex h-full items-center justify-center text-sm text-stone-400">
							Select a title with a valid TMDB id.
						</div>
					)}
				</div>

				<div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-4 md:grid-cols-[minmax(0,1fr)_220px]">
					<div className="space-y-3">
						<div className="flex flex-wrap items-center gap-3">
							<span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-amber-200">
								{selected.badge}
							</span>
							<span className="text-[11px] uppercase tracking-[0.28em] text-stone-400">
								{selected.kind === "tv" ? "Series" : "Movie"} /{" "}
								{selected.year}
							</span>
						</div>

						<div>
							<h2 className="font-display text-3xl leading-none text-stone-50">
								{selected.title}
							</h2>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-stone-300">
								{selected.blurb}
							</p>
						</div>
					</div>

					<div className="rounded-[22px] border border-white/10 bg-black/25 p-3">
						<p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
							Playback controls
						</p>
						{selected.kind === "tv" ? (
							<div className="mt-3 grid grid-cols-2 gap-3">
								<label className="space-y-2">
									<span className="text-xs uppercase tracking-[0.22em] text-stone-400">
										Season
									</span>
									<input
										className="control-input"
										min={1}
										onChange={event =>
											onSeasonChange(
												Math.max(
													1,
													Number(
														event.target.value,
													) || 1,
												),
											)
										}
										type="number"
										value={season}
									/>
								</label>
								<label className="space-y-2">
									<span className="text-xs uppercase tracking-[0.22em] text-stone-400">
										Episode
									</span>
									<input
										className="control-input"
										min={1}
										onChange={event =>
											onEpisodeChange(
												Math.max(
													1,
													Number(
														event.target.value,
													) || 1,
												),
											)
										}
										type="number"
										value={episode}
									/>
								</label>
							</div>
						) : (
							<p className="mt-3 text-sm leading-6 text-stone-300">
								Movies play directly with the VidLink movie embed
								endpoint.
							</p>
						)}

						<div className="mt-4 text-xs leading-5 text-stone-400">
							Embed source uses the VidLink endpoints with TMDB
							required.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
