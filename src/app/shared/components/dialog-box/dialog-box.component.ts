import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxItem } from '../../../core/models';
import { ContactFormComponent } from '../contact-form/contact-form.component';

export interface ContactConfig {
  title: string;
  content: string;
}

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  @Input() content: string = '';
  @Input() items: DialogBoxItem[] = [];
  @Input() contact: ContactConfig | null = null;

  private readonly sectionLabels: Record<string, string> = {
    article: 'ARTICLES',
    talk: 'TALKS',
  };

  isFirstOfType(item: DialogBoxItem, index: number): boolean {
    if (!item.type) return false;
    return this.items.findIndex(i => i.type === item.type) === index;
  }

  getSectionLabel(type: string | undefined): string {
    if (!type) return '';
    return this.sectionLabels[type] ?? type.toUpperCase() + 'S';
  }
}
