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
    this.musicPlayerService.currentSong$.subscribe(song =\u003e {
      if (song) {
        this.currentSong = song;
        if (song.isLocal) {
          this.audio.src = song.url || '';
          this.audio.load();
          this.playPause();
        } else {
          this.isPlaying = false;
          this.audio.pause();
          this.currentTime = '0:00';
          this.duration = this.formatTime(song.duration_ms / 1000);
          this.progress = 0;
        }
      }
    });

    this.audio.addEventListener('timeupdate', () =\u003e {
      this.currentTime = this.formatTime(this.audio.currentTime);
      this.progress = (this.audio.currentTime / this.audio.duration) * 100;
    });

    this.audio.addEventListener('loadedmetadata', () =\u003e {
      this.duration = this.formatTime(this.audio.duration);
    });

    this.audio.addEventListener('ended', () =\u003e {
      this.nextSong();
    });
  }

  playPause() {
    if (!this.currentSong?.isLocal) return;
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextSong() {
    if (!this.currentSong?.isLocal) return;
    this.musicPlayerService.playNext();
  }

  prevSong() {
    if (!this.currentSong?.isLocal) return;
    this.musicPlayerService.playPrevious();
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs \u003c 10 ? '0' : ''}${secs}`;
  }

  seek(event: any) {
    if (!this.currentSong?.isLocal) return;
    const seekTime = (event.target.value / 100) * this.audio.duration;
    this.audio.currentTime = seekTime;
  }
}
