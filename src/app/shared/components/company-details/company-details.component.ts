import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent {
  @Input() company: any = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
