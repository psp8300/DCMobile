import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AttendancePage } from './attendance.page';
import { AttendancePageRoutingModule } from './attendance-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, AttendancePageRoutingModule],
  declarations: [AttendancePage],
})
export class AttendancePageModule {}
