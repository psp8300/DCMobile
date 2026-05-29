import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WorkforcePage } from './workforce.page';
import { WorkforcePageRoutingModule } from './workforce-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, WorkforcePageRoutingModule],
  declarations: [WorkforcePage],
})
export class WorkforcePageModule {}
