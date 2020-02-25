import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddexercisePage } from './addexercise.page';

const routes: Routes = [
  {
    path: '',
    component: AddexercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddexercisePageRoutingModule {}
