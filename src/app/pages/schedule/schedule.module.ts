import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SchedulePage } from './schedule.page';
import { SchedulePageRoutingModule } from './schedule-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, SchedulePageRoutingModule],
  declarations: [SchedulePage],
})
export class SchedulePageModule {}
