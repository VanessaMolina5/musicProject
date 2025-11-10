import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicPlayerService } from '../music-player.service';
import { SpotifyTrack } from '../../models/spotify-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-bar.html',
  styleUrl: './player-bar.css',
})
export class PlayerBarComponent implements OnInit {
  currentSong: SpotifyTrack | null = null;
  isPlaying: boolean = false;
  audio: HTMLAudioElement;
  currentTime: string = '0:00';
  duration: string = '0:00';
  progress: number = 0;

  constructor(private musicPlayerService: MusicPlayerService) {
    this.audio = new Audio();
  }

  ngOnInit() {
    this.musicPlayerService.currentSong$.subscribe((song: SpotifyTrack | null) => {
      if (song) {
        this.currentSong = song;
        this.audio.src = song.external_urls.spotify; // Esto no funcionará directamente, es solo un ejemplo
        this.audio.load();
        this.playPause();
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.formatTime(this.audio.currentTime);
      this.progress = (this.audio.currentTime / this.audio.duration) * 100;
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.formatTime(this.audio.duration);
    });

    this.audio.addEventListener('ended', () => {
      this.nextSong();
    });
  }

  playPause() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextSong() {
    this.musicPlayerService.playNext();
  }

  prevSong() {
    this.musicPlayerService.playPrevious();
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  seek(event: any) {
    const seekTime = (event.target.value / 100) * this.audio.duration;
    this.audio.currentTime = seekTime;
  }
}
