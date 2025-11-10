import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private token: string | null = null;
  private tokenExpiration: number = 0;

  constructor(private http: HttpClient) {}

  hasValidToken(): boolean {
    return !!this.token && Date.now() < this.tokenExpiration;
  }

  getAccessToken(): string | null {
    return this.token;
  }

  getClientCredentialsToken(): Observable<SpotifyTokenResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${environment.spotify.CLIENT_ID}:${environment.spotify.CLIENT_SECRET}`)
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post<SpotifyTokenResponse>(environment.spotify.AUTH_API_URL, body, { headers }).pipe(
      tap(response => {
        this.token = response.access_token;
        this.tokenExpiration = Date.now() + (response.expires_in * 1000);
      })
    );
  }
}