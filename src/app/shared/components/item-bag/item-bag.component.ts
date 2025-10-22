import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-bag.component.html',
  styleUrls: ['./item-bag.component.scss']
})
export class ItemBagComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];

  selectedIndex: number = -1;
  selectedProject: any = null;

  ngOnInit(): void {
    this.autoSelectFirstProject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && changes['items'].currentValue) {
      this.autoSelectFirstProject();
    }
  }

  private autoSelectFirstProject(): void {
    if (this.items && this.items.length > 0) {
      this.selectProject(0);
    }
  }

  selectProject(index: number): void {
    this.selectedIndex = index;
    this.selectedProject = this.items[index];
  }
}
