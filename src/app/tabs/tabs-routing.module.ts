import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab/list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadChildren: () => import('../list/list.module').then( m => m.ListPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../addexercise/addexercise.module').then( m => m.AddexercisePageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
