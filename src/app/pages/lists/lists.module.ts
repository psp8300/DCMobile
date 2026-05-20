import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListsPage } from './lists.page';
import { ListsPageRoutingModule } from './lists-routing.module';
import { ListItemsComponent } from './components/list-items/list-items.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ListsPageRoutingModule],
  declarations: [ListsPage, ListItemsComponent],
})
export class ListsPageModule {}
