import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AudioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private audioState = new BehaviorSubject<AudioState>({
    isPlaying: false,
    volume: 0.5,
    isMuted: false
  });

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio(): void {
    this.audio = new Audio();
    this.audio.src = 'assets/sounds/battle.mp3';
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.audio.preload = 'auto';

    // Handle audio events
    this.audio.addEventListener('play', () => {
      this.updateState({ isPlaying: true });
      console.log('🎵 Audio playing');
    });

    this.audio.addEventListener('pause', () => {
      this.updateState({ isPlaying: false });
    });

    this.audio.addEventListener('ended', () => {
      this.updateState({ isPlaying: false });
    });

    this.audio.addEventListener('error', (error) => {
      console.error('Audio error:', error);
      this.updateState({ isPlaying: false });
    });

    // Simulate user interaction hack - create a fake click
    this.simulateUserInteraction();
  }

  private simulateUserInteraction(): void {
    // Try to trick the browser by simulating a user interaction
    setTimeout(() => {
      // Create and dispatch a synthetic click event
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      document.body.dispatchEvent(clickEvent);
      
      // Try to play audio immediately after
      this.play();
    }, 100);
  }

  getAudioState(): Observable<AudioState> {
    return this.audioState.asObservable();
  }

  getCurrentState(): AudioState {
    return this.audioState.value;
  }

  async play(): Promise<void> {
    if (!this.audio) return;

    try {
      await this.audio.play();
      this.updateState({ isPlaying: true });
    } catch (error) {
      console.log('🎵 Autoplay blocked by browser');
    }
  }

  pause(): void {
    if (this.audio) {
      this.audio.pause();
      this.updateState({ isPlaying: false });
    }
  }

  // Removed toggle functionality - audio always plays, only mute controls on/off

  setVolume(volume: number): void {
    if (!this.audio) return;
    
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.audio.volume = clampedVolume;
    this.updateState({ volume: clampedVolume });
  }

  mute(): void {
    if (!this.audio) return;
    
    this.audio.muted = true;
    this.updateState({ isMuted: true });
  }

  unmute(): void {
    if (!this.audio) return;
    
    this.audio.muted = false;
    this.updateState({ isMuted: false });
  }

  toggleMute(): void {
    if (this.getCurrentState().isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  private updateState(updates: Partial<AudioState>): void {
    const currentState = this.audioState.value;
    this.audioState.next({ ...currentState, ...updates });
  }

  // Method to handle user interaction for autoplay
  enableAutoplay(): void {
    if (this.audio) {
      this.unmute();
      this.play();
    }
  }

  // Cleanup
  destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}
