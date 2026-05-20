import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { MockDataService, ListItem } from '../../services/mock-data.service';
import { ListItemsComponent } from './components/list-items/list-items.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
  standalone: false,
})
export class ListsPage implements OnInit {
  lists: ListItem[] = [];

  constructor(
    private dataService:      MockDataService,
    private alertCtrl:        AlertController,
    private actionSheetCtrl:  ActionSheetController,
    private modalCtrl:        ModalController,
    private toastCtrl:        ToastController,
  ) {}

  ngOnInit() { this.loadLists(); }

  loadLists() {
    this.dataService.getLists().subscribe(l => (this.lists = l));
  }

  // ── FAB: Create list ────────────────────────────────────────────────────────
  async onAdd() {
    const alert = await this.alertCtrl.create({
      header:  'New List',
      message: 'Enter a name for your new list.',
      inputs:  [{ name: 'name', type: 'text', placeholder: 'e.g. Home Project, Tax 2026…' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Create',
          handler: (data) => {
            if (!data.name?.trim()) return false;
            this.dataService.addList(data.name);
            this.loadLists();
            this.showToast('List created!', 'success');
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  // ── Tap card: action sheet ──────────────────────────────────────────────────
  async onTap(list: ListItem) {
    const sheet = await this.actionSheetCtrl.create({
      header: list.listName,
      buttons: [
        {
          text:    'View Items',
          icon:    'list-outline',
          handler: () => this.openItems(list),
        },
        {
          text:    'Rename',
          icon:    'pencil-outline',
          handler: () => this.rename(list),
        },
        {
          text:    'Delete',
          icon:    'trash-outline',
          role:    'destructive',
          handler: () => this.confirmDelete(list),
        },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  // ── View items ──────────────────────────────────────────────────────────────
  async openItems(list: ListItem) {
    const modal = await this.modalCtrl.create({
      component:      ListItemsComponent,
      componentProps: { list, items: this.dataService.getListItems(list.listId) },
      breakpoints:        [0, 0.92],
      initialBreakpoint:   0.92,
    });
    await modal.present();
  }

  // ── Rename ──────────────────────────────────────────────────────────────────
  async rename(list: ListItem) {
    const alert = await this.alertCtrl.create({
      header: 'Rename List',
      inputs: [{ name: 'name', type: 'text', value: list.listName }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            if (!data.name?.trim()) return false;
            this.dataService.renameList(list.listId, data.name);
            this.loadLists();
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  // ── Delete with confirmation ────────────────────────────────────────────────
  async confirmDelete(list: ListItem) {
    const alert = await this.alertCtrl.create({
      header:  'Delete List',
      message: `Delete "${list.listName}"? This cannot be undone.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text:    'Delete',
          role:    'destructive',
          handler: () => {
            this.dataService.deleteList(list.listId);
            this.loadLists();
            this.showToast(`"${list.listName}" deleted`, 'danger');
          },
        },
      ],
    });
    await alert.present();
  }

  private async showToast(message: string, color: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
      icon: color === 'success' ? 'checkmark-circle-outline' : 'trash-outline',
    });
    await t.present();
  }
}
