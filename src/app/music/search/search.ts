import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyTrack } from '../../models/spotify-models';
import { MusicPlayerService } from '../music-player.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchResultsComponent {
  @Input() tracks: SpotifyTrack[] = [];

  constructor(private musicPlayerService: MusicPlayerService) {}

  playSong(track: SpotifyTrack) {
    this.musicPlayerService.playSong(track);
  }
}