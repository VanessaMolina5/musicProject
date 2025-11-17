import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private clientId = 'TU_CLIENT_ID';
  private clientSecret = 'TU_CLIENT_SECRET';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private searchUrl = 'https://api.spotify.com/v1/search';
  private accessToken: string = '';

  constructor(private http: HttpClient) { }

  private async getAccessToken(): Promise\u003cvoid\u003e {
    if (this.accessToken) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });

    const body = 'grant_type=client_credentials';

    try {
      const response: any = await this.http.post(this.tokenUrl, body, { headers }).toPromise();
      this.accessToken = response.access_token;
    } catch (error) {
      console.error('Error getting access token', error);
    }
  }

  public async searchTracks(query: string): Promise\u003cany\u003e {
    await this.getAccessToken();

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.accessToken
    });

    return this.http.get(`${this.searchUrl}?q=${query}\u0026type=track`, { headers }).toPromise();
  }
}