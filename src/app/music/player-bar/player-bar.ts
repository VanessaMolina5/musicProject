import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerService } from '../music-player.service';

@Component({
  selector: 'app-player-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-bar.html',
  styleUrl: './player-bar.css',
})
export class PlayerBarComponent implements OnInit {
  playlist: any[] = [
    {
      title: 'Tu falta de querer',
      artist: 'Mon Laferte',
      albumArt: '/media/Mon Laferte, Vol_ 1 by Mon Laferte on Apple Music.jpg',
      audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      title: 'Circles',
      artist: 'Post Malone',
      albumArt: '/media/GO_OD AM - Mac Miller.jpg',
      audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      title: 'Arrullo de estrellas',
      artist: 'Zoé',
      albumArt: '/media/descarga (2).jpg',
      audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title: 'Lovers rock',
      artist: 'Sade',
      albumArt: '/media/descarga (3).jpg',
      audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    },
    {
      title: 'Me hace falta',
      artist: 'Alejandro Sanz',
      albumArt: '/media/descarga (3).jpg',
      audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
    }
  ];
  currentSongIndex: number = 0;
  currentSong: any;
  isPlaying: boolean = false;
  audio: HTMLAudioElement;
  currentTime: string = '0:00';
  duration: string = '0:00';
  progress: number = 0;

  constructor(private musicPlayerService: MusicPlayerService) {
    this.currentSong = this.playlist[this.currentSongIndex];
    this.audio = new Audio();
    this.audio.src = this.currentSong.audioFile;
    this.audio.load();
    this.musicPlayerService.setCurrentSong(this.currentSong);
  }

  ngOnInit() {
    console.log('currentSong.albumArt on init:', this.currentSong.albumArt);
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
    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.loadSong();
  }

  prevSong() {
    this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadSong();
  }

  loadSong() {
    this.currentSong = this.playlist[this.currentSongIndex];
    this.audio.src = this.currentSong.audioFile;
    this.audio.load();
    this.musicPlayerService.setCurrentSong(this.currentSong);
    console.log('currentSong.albumArt on loadSong:', this.currentSong.albumArt);
    if (this.isPlaying) {
      this.audio.play();
    }
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
