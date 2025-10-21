import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-picker.component.html',
  styleUrls: ['./pokemon-picker.component.scss']
})
export class PokemonPickerComponent {
  @Input() items: any[] = [];
  @Input() title: string = '';

  getPartySlots(): any[] {
    // Return 5 slots for the right side (items 1-5, with null for empty slots)
    const partySlots = [];
    for (let i = 1; i <= 5; i++) {
      partySlots.push(this.items[i] || null);
    }
    return partySlots;
  }
}
