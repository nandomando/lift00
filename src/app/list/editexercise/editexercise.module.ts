import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditexercisePageRoutingModule } from './editexercise-routing.module';

import { EditexercisePage } from './editexercise.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditexercisePageRoutingModule
  ],
  declarations: [EditexercisePage]
})
export class EditexercisePageModule {}
