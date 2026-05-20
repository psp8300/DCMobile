import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsPage } from './items.page';
import { ItemsPageRoutingModule } from './items-routing.module';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ItemsPageRoutingModule],
  declarations: [ItemsPage, CreateItemComponent, ItemDetailComponent],
})
export class ItemsPageModule {}
