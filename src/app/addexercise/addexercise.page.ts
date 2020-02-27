import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExercisesService } from '../exercises.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addexercise',
  templateUrl: './addexercise.page.html',
  styleUrls: ['./addexercise.page.scss'],
})
export class AddexercisePage implements OnInit {

  form: FormGroup;
  constructor(
    private exercisesService: ExercisesService,
    private router: Router,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
      weigth: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
      sets: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
      reps: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]})
    });
  }

  onCreateExercise() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Creating Exercise...'
    }).then(loadingEl => {
      loadingEl.present();
      this.exercisesService.addExercise(
        this.form.value.name,
        +this.form.value.weigth,
        +this.form.value.sets,
        +this.form.value.reps,
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/', 'tabs', 'tab', 'list']);
      });
    });
  }

}
