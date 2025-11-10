import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlayerBarComponent } from './music/player-bar/player-bar';
import { MusicContainerComponent } from './music/music-container/music-container';
import { AuthService } from './services/auth.service';
import { SpotifyApiService } from './services/spotify/spotify-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PlayerBarComponent, MusicContainerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'musicProject';
  isAuthenticated = false;
  private deviceId: string | null = null;

  constructor(private authService: AuthService, private spotifyApiService: SpotifyApiService) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.isAuthenticated = true;
      this.spotifyApiService.initPlayer().then((deviceId: string) => {
        this.deviceId = deviceId;
      });
    } else {
      this.isAuthenticated = false;
    }
  }

  login() {
    this.authService.login();
  }
}
