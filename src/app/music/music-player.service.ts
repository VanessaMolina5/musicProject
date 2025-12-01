import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpotifyTrack } from '../models/spotify-models';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private currentSongSubject: BehaviorSubject<SpotifyTrack | null> = new BehaviorSubject<SpotifyTrack | null>(null);
  public currentSong$: Observable<SpotifyTrack | null> = this.currentSongSubject.asObservable();
  private playlist: SpotifyTrack[] = [];
  private currentIndex: number = -1;

  constructor() { }

  setPlaylist(playlist: SpotifyTrack[], index: number) {
    this.playlist = playlist;
    this.currentIndex = index;
    this.setCurrentSong(this.playlist[this.currentIndex]);
  }

  playSong(song: SpotifyTrack) {
    this.setCurrentSong(song);
  }

  setCurrentSong(song: SpotifyTrack) {
    this.currentSongSubject.next(song);
  }

  getCurrentSong(): SpotifyTrack | null {
    return this.currentSongSubject.value;
  }

  playNext() {
    if (this.playlist.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
      this.setCurrentSong(this.playlist[this.currentIndex]);
    }
  }

  playPrevious() {
    if (this.playlist.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
      this.setCurrentSong(this.playlist[this.currentIndex]);
    }
  }
}
