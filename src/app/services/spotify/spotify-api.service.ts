// @ts-nocheck
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyTrack, SpotifySearchResponse } from '../models/spotify-models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient, private authService: AuthService) { }

  search(query: string): Observable<SpotifySearchResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<SpotifySearchResponse>(`${this.apiUrl}/search?q=${query}&type=track`, { headers });
  }

  public initPlayer(): Promise<string> {
    return new Promise((resolve, reject) => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = this.authService.getToken();
        if (!token) {
          reject('No token available');
          return;
        }

        const player = new window.Spotify.Player({
          name: 'Music Project Player',
          getOAuthToken: (cb: (token: string) => void) => {
            cb(token);
          }
        });

        player.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Ready with Device ID', device_id);
          resolve(device_id);
        });

        player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.connect();
      };
    });
  }

  public play(trackUri: string, deviceId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { uris: [trackUri] };
    return this.http.put(`${this.apiUrl}/me/player/play?device_id=${deviceId}`, body, { headers });
  }
}