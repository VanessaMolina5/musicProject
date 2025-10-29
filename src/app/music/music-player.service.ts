import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private currentSongSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentSong$: Observable<any> = this.currentSongSubject.asObservable();

  constructor() { }

  setCurrentSong(song: any) {
    this.currentSongSubject.next(song);
  }

  getCurrentSong(): any {
    return this.currentSongSubject.value;
  }
}