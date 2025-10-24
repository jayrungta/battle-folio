import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AudioService, AudioState, ConfigService } from './core/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('pokemon-portfolio');
  
  audioState: AudioState = {
    isPlaying: false,
    volume: 0.5,
    isMuted: false
  };

  constructor(
    private audioService: AudioService,
    private configService: ConfigService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Load site config and set page title
    this.configService.getSiteConfig().subscribe(config => {
      this.titleService.setTitle(config.pageTitle);
    });

    // Subscribe to audio state changes
    this.audioService.getAudioState().subscribe(state => {
      this.audioState = state;
    });

    // Audio will attempt to autoplay, but may require user interaction
    // The service handles this automatically
  }

  ngOnDestroy(): void {
    this.audioService.destroy();
  }

  toggleMute(): void {
    this.audioService.toggleMute();
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.audioService.setVolume(parseFloat(target.value));
  }

  // Handle user interaction to enable autoplay
  onUserInteraction(): void {
    this.audioService.enableAutoplay();
  }

  // Handle any click on the app to enable audio
  onAppClick(): void {
    this.audioService.enableAutoplay();
  }
}
