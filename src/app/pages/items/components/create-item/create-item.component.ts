import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

export interface ItemTypeCard {
  id: number; name: string; icon: string; color: string; description: string;
}

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
  standalone: false,
})
export class CreateItemComponent {

  typeCards: ItemTypeCard[] = [
    { id: 1,  name: 'Activity',     icon: 'flash',           color: '#1A4A7E', description: 'Calls, visits, meetings' },
    { id: 3,  name: 'Contact',      icon: 'person',          color: '#059669', description: 'People & contacts' },
    { id: 4,  name: 'Document',     icon: 'document-text',   color: '#7C3AED', description: 'IDs & certificates' },
    { id: 5,  name: 'Credentials',  icon: 'lock-closed',     color: '#DC2626', description: 'Passwords & logins' },
    { id: 6,  name: 'Note',         icon: 'create',          color: '#D97706', description: 'Quick notes & text' },
    { id: 7,  name: 'HyperLink',    icon: 'link',            color: '#0891B2', description: 'URLs & web links' },
    { id: 8,  name: 'Entity',       icon: 'business',        color: '#374151', description: 'Services & businesses' },
    { id: 9,  name: 'Location',     icon: 'location',        color: '#059669', description: 'Addresses & places' },
    { id: 10, name: 'Knowledge',    icon: 'bulb',            color: '#7C3AED', description: 'Ideas & memories' },
    { id: 2,  name: 'Task',         icon: 'checkmark-circle','color': '#0891B2', description: 'Tasks & work items' },
    { id: 12, name: 'Money',        icon: 'cash',            color: '#D97706', description: 'Expenses & receipts' },
  ];

  selectedType: ItemTypeCard | null = null;
  saving = false;

  // Shared
  description = '';
  notes       = '';
  date        = new Date().toISOString();

  // Activity
  activityVariant = 'Phone Call';
  activityVariants = ['Phone Call','Visit','Online Meeting','Appointment','Offline Meeting'];
  duration = 30;

  // Contact
  contactName  = '';
  contactPhone = '';
  contactEmail = '';
  contactType  = 'Personal';

  // Document
  docName   = '';
  docRef    = '';
  docExpiry = '';

  // Credentials
  credName     = '';
  credUsername = '';
  credPassword = '';
  credEmail    = '';
  credWebsite  = '';
  showCredPw   = false;

  // Note
  noteTitle   = '';
  noteContent = '';

  // HyperLink
  linkUrl  = '';
  linkDesc = '';

  // Entity
  entityName    = '';
  entityWebsite = '';
  entityHours   = '';

  // Location
  locName      = '';
  locMapsLink  = '';
  locDirections= '';

  // Knowledge
  knowledgeTitle   = '';
  knowledgeContent = '';
  knowledgeType    = 'Idea';
  knowledgeTypes   = ['Idea','Memory','Prompt','Learning'];

  // Task
  taskTitle = '';
  taskDesc  = '';
  taskDue   = '';

  // Money
  moneyDesc   = '';
  moneyAmount = '';
  moneyCategory = 'Expense';
  moneyCategories = ['Expense','Income','Transfer','Bill','Receipt'];

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {}

  selectType(type: ItemTypeCard) { this.selectedType = type; }

  back() {
    if (this.selectedType) { this.selectedType = null; }
    else { this.modalCtrl.dismiss(); }
  }

  async save() {
    this.saving = true;
    await new Promise(r => setTimeout(r, 700));
    this.saving = false;
    const toast = await this.toastCtrl.create({
      message: `${this.selectedType?.name} saved! (Demo mode)`,
      duration: 2000,
      color: 'success',
      position: 'bottom',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();
    this.modalCtrl.dismiss({ saved: true });
  }

  dismiss() { this.modalCtrl.dismiss(); }
}
