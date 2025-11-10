import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpotifyApiService } from '../../services/spotify/spotify-api.service';
import { SpotifyTrack } from '../../models/spotify-models';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<SpotifyTrack[]>();
  searchTerm: string = '';

  constructor(private spotifyApi: SpotifyApiService) {}

  onSearch() {
    if (this.searchTerm) {
      this.spotifyApi.search(this.searchTerm).subscribe(results => {
        this.search.emit(results.tracks.items);
      });
    } else {
      this.search.emit([]);
    }
  }
}
