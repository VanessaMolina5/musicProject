export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

export interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
  duration_ms: number;
  uri: string;
  external_urls: {
    spotify: string;
  };
}