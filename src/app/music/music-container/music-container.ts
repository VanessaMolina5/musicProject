import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar';
import { SearchResultsComponent } from '../search/search';
import { SpotifyTrack } from '../../models/spotify-models';

@Component({
  selector: 'app-music-container',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SearchResultsComponent],
  templateUrl: './music-container.html',
  styleUrls: ['./music-container.css']
})
export class MusicContainerComponent {
  searchResults: SpotifyTrack[] = [];

  onSearchResults(results: any) {
    this.searchResults = results.tracks.items;
  }
}