import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar';
import { PlaylistComponent } from '../playlist/playlist';
import { SpotifyTrack } from '../../models/spotify-models';
import { SpotifyApiService } from '../../services/spotify/spotify-api.service';

@Component({
  selector: 'app-music-container',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PlaylistComponent],
  templateUrl: './music-container.html',
  styleUrls: ['./music-container.css']
})
export class MusicContainerComponent {
  searchResults: SpotifyTrack[] = [];

  onSearchResults(results: SpotifyTrack[]) {
    this.searchResults = results;
  }
}