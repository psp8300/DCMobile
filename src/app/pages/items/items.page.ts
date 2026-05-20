import { Component, OnInit } from '@angular/core';
import { MockDataService, Item } from '../../services/mock-data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  standalone: false,
})
export class ItemsPage implements OnInit {
  allItems: Item[] = [];
  filteredItems: Item[] = [];
  searchText = '';
  showToast = false;

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.dataService.getItems().subscribe(items => {
      this.allItems = items;
      this.filteredItems = items;
    });
  }

  onSearch(event: any) {
    const q = event.detail.value?.toLowerCase() ?? '';
    this.filteredItems = this.allItems.filter(
      i =>
        i.itemName.toLowerCase().includes(q) ||
        (i.variantName?.toLowerCase().includes(q) ?? false) ||
        (i.listName?.toLowerCase().includes(q) ?? false)
    );
  }

  variantColor(variant: string | undefined): string {
    const map: Record<string, string> = {
      'Phone Call': 'primary',
      'ID Document': 'danger',
      'App/Web': 'tertiary',
      'Bank Credentials': 'warning',
      'Task': 'success',
      'Idea': 'secondary',
    };
    return map[variant ?? ''] ?? 'medium';
  }

  onAdd() {
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2500);
  }
}
