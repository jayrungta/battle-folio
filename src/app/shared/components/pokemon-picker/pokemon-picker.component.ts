import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { PokemonPickerItem } from '../../../core/models';

@Component({
  selector: 'app-pokemon-picker',
  standalone: true,
  imports: [CommonModule, CompanyDetailsComponent],
  templateUrl: './pokemon-picker.component.html',
  styleUrls: ['./pokemon-picker.component.scss']
})
export class PokemonPickerComponent {
  @Input() items: PokemonPickerItem[] = [];
  
  selectedCompany: any = null;
  showDetails = false;

  getPartySlots(): any[] {
    // Return 5 slots for the right side (items 1-5, with null for empty slots)
    const partySlots = [];
    for (let i = 1; i <= 5; i++) {
      partySlots.push(this.items[i] || null);
    }
    return partySlots;
  }

  onCompanyClick(company: any) {
    if (company) {
      this.selectedCompany = company;
      this.showDetails = true;
    }
  }

  onCloseDetails() {
    this.showDetails = false;
    this.selectedCompany = null;
  }
}
