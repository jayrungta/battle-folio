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
}
