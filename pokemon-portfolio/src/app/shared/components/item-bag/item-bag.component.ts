import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-bag.component.html',
  styleUrls: ['./item-bag.component.scss']
})
export class ItemBagComponent {
  @Input() items: any[] = [];
  @Input() title: string = '';
}
