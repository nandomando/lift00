import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditexercisePage } from './editexercise.page';

const routes: Routes = [
  {
    path: '',
    component: EditexercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditexercisePageRoutingModule {}
