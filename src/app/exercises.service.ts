import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from './exercise.model';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    ) { }


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
    return this.http
      .post('https://lift00.firebaseio.com/exercises.json', 
        { ...newExercise, id: null})
        .pipe(tap(resData => {
          console.log(resData);
      }));
    // return this.exercises.pipe(
    //   take(1)).subscribe(exercise => {
    //     this._exercises.next(exercise.concat(newExercise));
    //   });

  }

  updateExe(
    exerciseId: string,
    name: string,
    weigth: number,
    sets: number,
    reps: number
  ) {
    return this.exercises.pipe(
      take(1),
      tap(exercises => {
      const updatedExerciseIndex = exercises.findIndex(ex => ex.id === exerciseId);
      const updatedExercises = [...exercises];
      const oldExe = updatedExercises[updatedExerciseIndex];
      updatedExercises[updatedExerciseIndex] = new Exercise(
        oldExe.id,
        name,
        weigth,
        sets,
        reps,
        oldExe.userId
      );
      this._exercises.next(updatedExercises);
    }));
  }

  cancelEx(exerciseId: string) {
    return this.exercises.pipe(
      take(1),
      tap(exercises => {
        this._exercises.next(exercises.filter(element => element.id !== exerciseId));
      })
    );
  }
}
