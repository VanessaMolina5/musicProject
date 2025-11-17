import { Injectable } from '@angular/core';
import { SpotifyTrack } from '../models/spotify-models';

@Injectable({
  providedIn: 'root'
})
export class LocalMusicService {
  private localTracks: SpotifyTrack[] = [
    {
      name: 'Amor Completo',
      artists: [{ name: 'Mon Laferte' }],
      album: {
        name: 'Mon Laferte, Vol. 1',
        images: [{ url: 'assets/media/Mon Laferte, Vol_ 1 by Mon Laferte on Apple Music.jpg', height: 300, width: 300 }]
      },
      duration_ms: 240000,
      uri: '',
      external_urls: { spotify: '' },
      isLocal: true,
      url: 'assets/music/Mon Laferte - Amor Completo.mp3'
    },
    {
      name: 'GO:OD AM',
      artists: [{ name: 'Mac Miller' }],
      album: {
        name: 'GO:OD AM',
        images: [{ url: 'assets/media/GO_OD AM - Mac Miller.jpg', height: 300, width: 300 }]
      },
      duration_ms: 200000,
      uri: '',
      external_urls: { spotify: '' },
      isLocal: true,
      url: 'assets/music/Mac Miller - GO_OD AM.mp3'
    },
    {
      name: 'Tu falta de querer',
      artists: [{ name: 'Mon Laferte' }],
      album: {
        name: 'Mon Laferte, Vol. 1',
        images: [{ url: 'assets/media/descaraga (2).jpg', height: 300, width: 300 }]
      },
      duration_ms: 220000,
      uri: '',
      external_urls: { spotify: '' },
      isLocal: true,
      url: 'assets/music/Mon Laferte - Tu Falta De Querer.mp3'
    },
    {
      name: 'Si tu me quisieras',
      artists: [{ name: 'Mon Laferte' }],
      album: {
        name: 'Mon Laferte, Vol. 1',
        images: [{ url: 'assets/media/descaraga (3).jpg', height: 300, width: 300 }]
      },
      duration_ms: 210000,
      uri: '',
      external_urls: { spotify: '' },
      isLocal: true,
      url: 'assets/music/Mon Laferte - Si Tu Me Quisieras.mp3'
    }
  ];

  constructor() { }

  getLocalMusic(): SpotifyTrack[] {
    return this.localTracks;
  }
}