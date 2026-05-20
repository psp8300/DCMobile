import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListsPage } from './lists.page';
import { ListsPageRoutingModule } from './lists-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ListsPageRoutingModule],
  declarations: [ListsPage],
})
export class ListsPageModule {}
