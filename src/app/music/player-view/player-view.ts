import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicPlayerService } from '../music-player.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from '../playlist/playlist';

@Component({
  selector: 'app-player-view',
  standalone: true,
  imports: [CommonModule, PlaylistComponent],
  templateUrl: './player-view.html',
  styleUrl: './player-view.css',
})
export class PlayerViewComponent implements OnInit, OnDestroy {
  currentSong: any;
  private subscription: Subscription = new Subscription();

  constructor(private musicPlayerService: MusicPlayerService) { }

  ngOnInit(): void {
    this.subscription.add(this.musicPlayerService.currentSong$.subscribe(song => {
      this.currentSong = song;
      console.log('PlayerViewComponent - currentSong:', this.currentSong);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
