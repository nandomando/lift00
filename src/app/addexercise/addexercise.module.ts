import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddexercisePageRoutingModule } from './addexercise-routing.module';

import { AddexercisePage } from './addexercise.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddexercisePageRoutingModule
  ],
  declarations: [AddexercisePage]
})
export class AddexercisePageModule {}
