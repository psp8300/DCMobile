import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LiveStatusPage } from './live-status.page';
import { LiveStatusPageRoutingModule } from './live-status-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, LiveStatusPageRoutingModule],
  declarations: [LiveStatusPage],
})
export class LiveStatusPageModule {}
