import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivityPage } from './activity.page';
import { ActivityPageRoutingModule } from './activity-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ActivityPageRoutingModule],
  declarations: [ActivityPage],
})
export class ActivityPageModule {}
