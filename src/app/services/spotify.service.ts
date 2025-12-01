import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private clientId = environment.spotify.clientId;
  private clientSecret = environment.spotify.clientSecret;
  private tokenUrl = environment.spotify.AUTH_API_URL;
  private searchUrl = 'https://api.spotify.com/v1/search';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  private async getAccessToken(): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });

    const body = 'grant_type=client_credentials';

    try {
      const response: any = await firstValueFrom(this.http.post(this.tokenUrl, body, { headers }));
      this.accessToken = response.access_token;
    } catch (error) {
      console.error('Error getting access token', error);
    }
  }

  public async searchTracks(query: string): Promise<any> {
    await this.getAccessToken();

    if (!this.accessToken) {
      throw new Error('Access token not available');
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.accessToken
    });

    return firstValueFrom(this.http.get(`${this.searchUrl}?q=${encodeURIComponent(query)}&type=track`, { headers }));
  }
}
