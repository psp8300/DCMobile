import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
      },
      {
        path: 'lists',
        loadChildren: () => import('../pages/lists/lists.module').then(m => m.ListsPageModule),
      },
      {
        path: 'items',
        loadChildren: () => import('../pages/items/items.module').then(m => m.ItemsPageModule),
      },
      {
        path: 'activity',
        loadChildren: () => import('../pages/activity/activity.module').then(m => m.ActivityPageModule),
      },
      {
        path: 'schedule',
        loadChildren: () => import('../pages/schedule/schedule.module').then(m => m.SchedulePageModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
