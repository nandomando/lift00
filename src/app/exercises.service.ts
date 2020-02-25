import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from './exercise.model';

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
      2
    ),
    new Exercise(
      'p2',
      'squat',
      100,
      10,
      5
    ),
    new Exercise(
      'p3',
      'dumbells',
      80,
      4,
      1
    )
  ]);

  constructor() { }

  get exercises() {
    return this._exercises.asObservable();
  }
}
