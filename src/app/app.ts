import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlayerBarComponent } from './music/player-bar/player-bar';
import { SearchBarComponent } from './music/search-bar/search-bar';
import { PlayerViewComponent } from './music/player-view/player-view';
import { SearchResultsComponent } from './music/search/search';
import { SpotifyTrack } from './models/spotify-models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PlayerBarComponent, SearchBarComponent, PlayerViewComponent, SearchResultsComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'musicProject';
  searchResults: SpotifyTrack[] = [];

  onSearchResults(results: any) {
    if (results && results.tracks && results.tracks.items) {
      this.searchResults = results.tracks.items;
    } else {
      this.searchResults = [];
    }
  }
}
