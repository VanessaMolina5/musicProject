import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '02b24740e5fc4b62992c935f124a45e5';
  private redirectUri = 'http://localhost:4200/';
  private scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-library-read',
    'user-library-modify'
  ];

  constructor() { }

  public login() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scopes.join('%20')}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  }

  public getToken(): string | null {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
  }
}