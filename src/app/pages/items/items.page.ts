import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MockDataService, Item } from '../../services/mock-data.service';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

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

  constructor(private dataService: MockDataService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.dataService.getItems().subscribe(items => {
      this.allItems = items;
      this.filteredItems = items;
    });
  }

  onSearch(event: any) {
    const q = (event.detail.value ?? '').toLowerCase();
    this.filteredItems = this.allItems.filter(i =>
      i.itemName.toLowerCase().includes(q) ||
      (i.variantName?.toLowerCase().includes(q) ?? false) ||
      (i.listName?.toLowerCase().includes(q) ?? false)
    );
  }

  variantColor(v: string | undefined): string {
    const m: Record<string, string> = {
      'Phone Call': '#1A4A7E', 'ID Document': '#DC2626',
      'App/Web': '#7C3AED', 'Bank Credentials': '#D97706',
      'Task': '#059669', 'Idea': '#0891B2',
    };
    return m[v ?? ''] ?? '#6B7280';
  }

  variantIcon(v: string | undefined): string {
    const m: Record<string, string> = {
      'Phone Call': 'call', 'ID Document': 'card',
      'App/Web': 'globe', 'Bank Credentials': 'card',
      'Task': 'checkmark-circle', 'Idea': 'bulb',
    };
    return m[v ?? ''] ?? 'cube';
  }

  async openItem(item: Item) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailComponent,
      componentProps: { item },
      breakpoints: [0, 0.92],
      initialBreakpoint: 0.92,
    });
    modal.present();
  }

  async openCreate() {
    const modal = await this.modalCtrl.create({
      component: CreateItemComponent,
    });
    modal.present();
  }
}
