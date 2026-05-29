import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WorkdayPage } from './workday.page';
import { WorkdayPageRoutingModule } from './workday-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, WorkdayPageRoutingModule],
  declarations: [WorkdayPage],
})
export class WorkdayPageModule {}
