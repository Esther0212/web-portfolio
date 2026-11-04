
export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  file: string;
  vinylGif?: string;
};

export const musicPlaylist: MusicTrack[] = [
  {
    id: "liljeholmsviken",
    title: "Liljeholmsviken",
    artist: "Vendla",
    file: "Vendla - Liljeholmsviken (Royalty Free Jazz).mp3",
    vinylGif: "Vendla - Liljeholmsviken (Royalty Free Jazz).gif",
  },
  {
    id: "stay-in-bed",
    title: "Stay In Bed",
    artist: "Victor Lundberg",
    file: "Victor Lundberg - Stay In Bed (Royalty Free Jazz).mp3",
    vinylGif: "Victor Lundberg - Stay In Bed (Royalty Free Jazz).gif",
  },
];

export const FALLBACK_VINYL_GIF =
  "Park Vibes - Filo Starquez.gif";

export function getMusicUrl(filename: string) {
  return `/music/${encodeURIComponent(filename)}`;
}

export function getVinylGifUrl(filename: string) {
  return `/vinyl-gif/${encodeURIComponent(filename)}`;
}
