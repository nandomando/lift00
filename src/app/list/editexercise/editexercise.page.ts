import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExercisesService } from 'src/app/exercises.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController
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
    console.log(this.form);
  }

}
