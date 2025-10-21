import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services';
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
  showWhiteFlash: boolean = false;

  // Animation timing constants - Gen 1/2 style (FAST and SNAPPY)
  private readonly ANIMATION_TIMINGS = {
    whiteFlash: 100,        // 0.1s flash
    spiralWipe: 500,        // 0.5s spiral transition
    trainerShake: 300,      // 0.3s shake effect
    challengeDisplay: 2000, // 2s to show "wants to battle" message
    menuPopIn: 200,         // 0.2s instant pop
    totalDuration: 3000     // 3s total (challenge + menu)
  };

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getSiteConfig().subscribe({
      next: (config) => {
        this.siteConfig = config;
        this.battleOptions = config.battleOptions;
      },
      error: (error) => {
        console.error('Error loading site config:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    // White flash at start
    setTimeout(() => {
      this.showWhiteFlash = true;
    }, 50);

    // Remove flash quickly
    setTimeout(() => {
      this.showWhiteFlash = false;
    }, 150);

    // Start battle transition
    setTimeout(() => {
      this.animationState = 'transition';
      this.playBattleStartSound();
    }, 100);

    // Show challenge message
    setTimeout(() => {
      this.animationState = 'challenge';
    }, 600);

    // Show battle menu after challenge
    setTimeout(() => {
      this.animationState = 'ready';
      this.playMenuAppearSound();
    }, this.ANIMATION_TIMINGS.challengeDisplay + 600);
  }

  // Skip animation on any key press
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:click', ['$event'])
  skipAnimation(event: Event): void {
    if (this.animationState !== 'ready') {
      this.animationState = 'ready';
      this.showWhiteFlash = false;
      this.playMenuAppearSound();
    }
  }

  // Sound effect placeholders for future Phase 6 implementation
  private playBattleStartSound(): void {
    // TODO: Implement in Phase 6
    console.log('Battle start sound would play here');
  }

  private playMenuAppearSound(): void {
    // TODO: Implement in Phase 6
    console.log('Menu appear sound would play here');
  }
}
