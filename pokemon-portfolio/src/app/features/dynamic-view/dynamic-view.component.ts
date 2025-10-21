import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services';
import { SiteConfig, ViewConfig } from '../../core/models';
import { PokemonPickerComponent } from '../../shared/components/pokemon-picker/pokemon-picker.component';
import { ItemBagComponent } from '../../shared/components/item-bag/item-bag.component';
import { DialogBoxComponent } from '../../shared/components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-dynamic-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PokemonPickerComponent,
    ItemBagComponent,
    DialogBoxComponent
  ],
  templateUrl: './dynamic-view.component.html',
  styleUrls: ['./dynamic-view.component.scss']
})
export class DynamicViewComponent implements OnInit {
  viewConfig: ViewConfig | null = null;
  componentType: string = '';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const viewId = params['viewId'];
      this.loadViewConfig(viewId);
    });
  }

  private loadViewConfig(viewId: string): void {
    this.isLoading = true;

    // First, get the site config to find the config file for this view
    this.configService.getSiteConfig().subscribe({
      next: (siteConfig: SiteConfig) => {
        const battleOption = siteConfig.battleOptions.find(
          option => option.id === viewId
        );

        if (battleOption) {
          this.componentType = battleOption.component;
          
          // Load the view-specific config
          this.configService.getViewConfig(battleOption.configFile).subscribe({
            next: (viewConfig: ViewConfig) => {
              this.viewConfig = viewConfig;
              this.isLoading = false;
            },
            error: (error) => {
              console.error('Error loading view config:', error);
              this.isLoading = false;
            }
          });
        } else {
          console.error('View not found:', viewId);
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading site config:', error);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
