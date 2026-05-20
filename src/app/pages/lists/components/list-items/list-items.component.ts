import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListItem, Item } from '../../../../services/mock-data.service';

@Component({
  selector: 'app-list-items',
  standalone: false,
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button (click)="dismiss()">
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ list.listName }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="li-content">

      <!-- Empty state -->
      <div class="li-empty" *ngIf="items.length === 0">
        <ion-icon name="cube-outline"></ion-icon>
        <p>No items in this list</p>
      </div>

      <ion-list lines="none" class="li-list" *ngIf="items.length > 0">
        <div class="li-card" *ngFor="let item of items">
          <div class="li-avatar" [style.background]="variantColor(item.variantName) + '18'">
            <ion-icon [name]="variantIcon(item.variantName)" [style.color]="variantColor(item.variantName)"></ion-icon>
          </div>
          <div class="li-body">
            <div class="li-name">{{ item.itemName }}</div>
            <div class="li-variant">{{ item.variantName }}</div>
            <div class="li-value" *ngIf="item.value1">{{ item.value1 }}</div>
            <div class="li-notes" *ngIf="item.notes">{{ item.notes }}</div>
          </div>
        </div>
      </ion-list>

    </ion-content>
  `,
  styles: [`
    .li-content { --background: var(--dc-bg); }
    .li-list { padding: 12px 14px 80px; display: flex; flex-direction: column; gap: 10px; }
    .li-card {
      display: flex; align-items: flex-start; gap: 12px;
      background: var(--dc-card); border-radius: 14px;
      padding: 12px 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .li-avatar {
      width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      ion-icon { font-size: 20px; }
    }
    .li-body { flex: 1; min-width: 0; }
    .li-name    { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
    .li-variant { font-size: 12px; color: var(--ion-color-medium); margin-bottom: 2px; }
    .li-value   { font-size: 13px; color: var(--ion-color-dark); }
    .li-notes   { font-size: 12px; color: var(--ion-color-medium); margin-top: 2px; }
    .li-empty {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 60px 24px; gap: 12px; color: var(--ion-color-medium);
      ion-icon { font-size: 48px; opacity: 0.4; }
      p { margin: 0; font-size: 15px; }
    }
  `],
})
export class ListItemsComponent {
  @Input() list!: ListItem;
  @Input() items: Item[] = [];

  constructor(private modalCtrl: ModalController) {}

  dismiss() { this.modalCtrl.dismiss(); }

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
}
