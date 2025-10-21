import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BattleOption } from '../../../core/models';

@Component({
  selector: 'app-battle-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './battle-menu.component.html',
  styleUrls: ['./battle-menu.component.scss']
})
export class BattleMenuComponent {
  @Input() options: BattleOption[] = [];
  @Output() optionSelected = new EventEmitter<BattleOption>();

  onOptionClick(option: BattleOption): void {
    this.optionSelected.emit(option);
  }
}
