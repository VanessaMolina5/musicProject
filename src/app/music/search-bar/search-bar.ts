import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBarComponent {
  @Output() searchResults = new EventEmitter<any>();
  searchTerm: string = '';

  constructor(private spotifyService: SpotifyService) {}

  async search() {
    if (this.searchTerm.trim() === '') {
      return;
    }

    try {
      const results = await this.spotifyService.searchTracks(this.searchTerm);
      this.searchResults.emit(results);
    } catch (error) {
      console.error('Error searching tracks', error);
    }
  }
}
