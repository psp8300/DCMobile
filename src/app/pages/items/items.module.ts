import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsPage } from './items.page';
import { ItemsPageRoutingModule } from './items-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ItemsPageRoutingModule],
  declarations: [ItemsPage],
})
export class ItemsPageModule {}
