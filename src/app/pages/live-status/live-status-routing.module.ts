import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveStatusPage } from './live-status.page';

const routes: Routes = [{ path: '', component: LiveStatusPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveStatusPageRoutingModule {}
