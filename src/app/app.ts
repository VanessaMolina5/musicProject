import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlayerViewComponent } from './music/player-view/player-view';
import { PlayerBarComponent } from './music/player-bar/player-bar';
import { SearchBarComponent } from './music/search-bar/search-bar';
import { MusicPlayerService } from './music/music-player.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, PlayerViewComponent, PlayerBarComponent, SearchBarComponent],
  providers: [MusicPlayerService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('musicProject');
}
