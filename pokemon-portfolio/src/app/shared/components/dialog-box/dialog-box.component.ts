import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  @Input() content: string = '';
  @Input() items: any[] = [];
  @Input() title: string = '';
}
