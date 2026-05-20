import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Item, MockDataService } from '../../../../services/mock-data.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  standalone: false,
})
export class ItemDetailComponent implements OnInit {
  @Input() item!: Item;

  editing   = false;
  editDesc  = '';
  editNotes = '';
  saving    = false;

  variantColors: Record<string, string> = {
    'Phone Call':       '#1A4A7E',
    'ID Document':      '#DC2626',
    'App/Web':          '#7C3AED',
    'Bank Credentials': '#D97706',
    'Task':             '#059669',
    'Idea':             '#0891B2',
  };

  variantIcons: Record<string, string> = {
    'Phone Call':       'call',
    'ID Document':      'card',
    'App/Web':          'globe',
    'Bank Credentials': 'card',
    'Task':             'checkmark-circle',
    'Idea':             'bulb',
  };

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private dataService: MockDataService,
  ) {}

  ngOnInit() {
    this.editDesc  = this.item.itemName;
    this.editNotes = this.item.notes ?? '';
  }

  get variantColor(): string { return this.variantColors[this.item.variantName ?? ''] ?? '#1A4A7E'; }
  get variantIcon(): string  { return this.variantIcons[this.item.variantName ?? '']  ?? 'cube'; }

  startEdit() { this.editing = true; }

  async saveEdit() {
    this.saving = true;
    await new Promise(r => setTimeout(r, 500));
    this.saving = false;
    this.item = { ...this.item, itemName: this.editDesc, notes: this.editNotes };
    this.editing = false;
    const t = await this.toastCtrl.create({ message: 'Updated! (Demo mode)', duration: 1800, color: 'success', icon: 'checkmark-circle-outline', position: 'bottom' });
    t.present();
  }

  cancelEdit() { this.editing = false; this.editDesc = this.item.itemName; this.editNotes = this.item.notes ?? ''; }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Item',
      message: `Delete "${this.item.itemName}"? (Demo mode — not really deleted)`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete', role: 'destructive',
          handler: async () => {
            const t = await this.toastCtrl.create({ message: 'Deleted! (Demo mode)', duration: 1800, color: 'danger', icon: 'trash-outline', position: 'bottom' });
            t.present();
            this.modalCtrl.dismiss({ deleted: true });
          }
        }
      ]
    });
    alert.present();
  }

  dismiss() { this.modalCtrl.dismiss(); }
}
