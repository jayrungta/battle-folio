import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService, AudioService } from '../../core/services';
import { SiteConfig, BattleOption } from '../../core/models';
import { BattleMenuComponent } from '../../shared/components/battle-menu/battle-menu.component';

type AnimationState = 'loading' | 'transition' | 'challenge' | 'ready';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule, RouterModule, BattleMenuComponent],
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit, AfterViewInit {
  siteConfig: SiteConfig | null = null;
  battleOptions: BattleOption[] = [];
  animationState: AnimationState = 'loading';
  showFlashes: boolean = false;
  trainerSprite: string = 'assets/images/trainers/trainer-sprite.png';
  trainerName: string = '';
  shouldAnimate: boolean = false;
  private static hasPlayedIntro: boolean = false;

  // Animation timing constants - Enhanced retro boot sequence
  private readonly ANIMATION_TIMINGS = {
    loadingScreen: 800,     // 0.8s black loading screen with text
    flashSequence: 400,     // 0.4s for multiple flashes
    spiralWipe: 600,        // 0.6s dramatic spiral transition
    trainerShake: 300,      // 0.3s shake effect
    challengeDisplay: 2000, // 2s to show "wants to battle" message
    menuPopIn: 200,         // 0.2s instant pop
    totalDuration: 4200     // ~4.2s total boot sequence
  };

  constructor(
    private configService: ConfigService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.configService.getSiteConfig().subscribe({
      next: (config) => {
        this.siteConfig = config;
        this.battleOptions = config.battleOptions;
        this.trainerName = config.trainerName || 'TRAINER X';
      },
      error: (error) => {
        console.error('Error loading site config:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    // Check if intro has already been played
    if (BattleComponent.hasPlayedIntro) {
      // Skip straight to ready state without animations
      this.animationState = 'ready';
      this.shouldAnimate = false;
      return;
    }

    // Mark intro as played and enable animations
    BattleComponent.hasPlayedIntro = true;
    this.shouldAnimate = true;

    // Start retro boot sequence
    this.playRetroBootSequence();
  }

  private playRetroBootSequence(): void {
    // Show loading screen with flashing effect (0-400ms)
    setTimeout(() => {
      this.showFlashes = true;
    }, 50);

    // Start dramatic spiral wipe transition (500ms)
    setTimeout(() => {
      this.animationState = 'transition';
      this.playBattleStartSound();
    }, 500);

    // Show challenge message (1100ms)
    setTimeout(() => {
      this.animationState = 'challenge';
    }, 1100);

    // Show battle menu after challenge
    setTimeout(() => {
      this.animationState = 'ready';
      this.playMenuAppearSound();
    }, this.ANIMATION_TIMINGS.challengeDisplay + 1100);
  }

  // Skip animation on any key press
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:click', ['$event'])
  skipAnimation(event: Event): void {
    if (this.animationState !== 'ready') {
      this.animationState = 'ready';
      this.showFlashes = false;
      this.playMenuAppearSound();
    }
  }

  // Sound effects using AudioService
  private playBattleStartSound(): void {
    // Enable background music when battle starts
    this.audioService.enableAutoplay();
  }

  private playMenuAppearSound(): void {
    // Sound effect for menu appearance
    console.log('Menu appear sound would play here');
  }
}
