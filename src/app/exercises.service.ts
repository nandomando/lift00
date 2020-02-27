import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from './exercise.model';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private _exercises = new BehaviorSubject<Exercise[]>([
    new Exercise(
      'p1',
      'bench press',
      100,
      5,
      2,
      'abc'
    ),
    new Exercise(
      'p2',
      'squat',
      100,
      10,
      5,
      'abc'
    ),
    new Exercise(
      'p3',
      'dumbells',
      80,
      4,
      1,
      'pp'
    )
  ]);


  get exercises() {
    return this._exercises.asObservable();
  }

  constructor(private authService: AuthService) { }


  getExercise(id: string) {
    return this.exercises.pipe(
      take(1),
      map(exercises => {
        return {...exercises.find(element => element.id === id)};
      })
    );
  }

  addExercise(
    name: string,
    weigth: number,
    sets: number,
    reps: number
  ) {
    const newExercise = new Exercise(
      Math.random().toString(),
      name,
      weigth,
      sets,
      reps,
      this.authService.userId
    );
    this.exercises.pipe(
      take(1)).subscribe(exercise => {
        this._exercises.next(exercise.concat(newExercise));
      });

  }
}
