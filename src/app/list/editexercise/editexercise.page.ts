import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExercisesService } from 'src/app/exercises.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Exercise } from 'src/app/exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editexercise',
  templateUrl: './editexercise.page.html',
  styleUrls: ['./editexercise.page.scss'],
})
export class EditexercisePage implements OnInit {
  exercise: Exercise;
  form: FormGroup;
  exerciseId: string;
  private exerciseSub: Subscription;

  constructor(
    private exerciseService: ExercisesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('exerciseId')) {
        this.navCtrl.navigateBack('/tabs/tab/list');
        return;
      }
      this.exerciseId = paramMap.get('exerciseId');
      this.exerciseSub = this.exerciseService
      .getExercise(paramMap.get('exerciseId'))
      .subscribe(exercise => {
        this.exercise = exercise;
        this.form = new FormGroup({
          name: new FormControl(this.exercise.name, {updateOn: 'blur', validators: [Validators.required]}),
          weigth: new FormControl(this.exercise.weigth, {updateOn: 'blur', validators: [Validators.required]}),
          sets: new FormControl(this.exercise.sets, {updateOn: 'blur', validators: [Validators.required]}),
          reps: new FormControl(this.exercise.reps, {updateOn: 'blur', validators: [Validators.required]})
        });
      });
    });
  }

  update() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating exercise...'
    }).then(loadingEl => {
      loadingEl.present();
      this.exerciseService.updateExe(
        this.exercise.id,
        this.form.value.name,
        this.form.value.weigth,
        this.form.value.sets,
        this.form.value.reps,
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/tabs/tab/list']);
      });
    });
  }

}
