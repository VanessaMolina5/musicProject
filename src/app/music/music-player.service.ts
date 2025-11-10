import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { SpotifyTrack } from '../models/spotify-models';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private currentSong = new BehaviorSubject<SpotifyTrack | null>(null);
  currentSong$ = this.currentSong.asObservable();

  private playlist: SpotifyTrack[] = [];
  private currentIndex = -1;

  setPlaylist(playlist: SpotifyTrack[], index: number) {
    this.playlist = playlist;
    this.currentIndex = index;
    this.playCurrentSong();
  }

  private playCurrentSong() {
    if (this.currentIndex >= 0 && this.currentIndex < this.playlist.length) {
      this.currentSong.next(this.playlist[this.currentIndex]);
    }
  }

  playNext() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
      this.playCurrentSong();
    }
  }

  playPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.playCurrentSong();
    }
  }
}