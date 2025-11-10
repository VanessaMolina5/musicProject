import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyTrack } from '../../models/spotify-models';
import { MusicPlayerService } from '../music-player.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.html',
  styleUrls: ['./playlist.css']
})
export class PlaylistComponent {
  @Input() tracks: SpotifyTrack[] = [];
  currentIndex: number = -1;

  constructor(private musicPlayerService: MusicPlayerService) {}

  onSongClick(index: number) {
    this.currentIndex = index;
    this.musicPlayerService.setPlaylist(this.tracks, index);
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }
}