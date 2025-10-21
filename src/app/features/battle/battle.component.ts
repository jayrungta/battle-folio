import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services';
import { SiteConfig, BattleOption } from '../../core/models';
import { BattleMenuComponent } from '../../shared/components/battle-menu/battle-menu.component';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule, RouterModule, BattleMenuComponent],
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  siteConfig: SiteConfig | null = null;
  battleOptions: BattleOption[] = [];

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
}
