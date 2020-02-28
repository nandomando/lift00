import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from './exercise.model';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';


interface ExerciseFetch {
  name: string;
  reps: number;
  sets: number;
  userId: string;
  weigth: number;
}

@Injectable({
  providedIn: 'root'
})

export class ExercisesService {

  private _exercises = new BehaviorSubject<Exercise[]>([]);

  get exercises() {
    return this._exercises.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    ) { }

    fetchExercises() {
      return this.http.get<{[key: string]: ExerciseFetch}>(`https://lift00.firebaseio.com/exercises.json?orderBy="userId"&equalTo="${
        this.authService.userId}"`)
      .pipe(map(resData => {
        const Exercisearr = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            Exercisearr.push(new Exercise(
              key,
              resData[key].name,
              resData[key].weigth,
              resData[key].sets,
              resData[key].reps,
              resData[key].userId,
              )
            );
          }
        }
        return Exercisearr;
      }),
      tap(exercises => {
        this._exercises.next(exercises);
      })
      );
    }


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
    let generatedId: string;
    const newExercise = new Exercise(
      Math.random().toString(),
      name,
      weigth,
      sets,
      reps,
      this.authService.userId
    );
    return this.http
      .post<{name: string}>('https://lift00.firebaseio.com/exercises.json',
        { ...newExercise, id: null})
        .pipe(
          switchMap( resData => {
            generatedId = resData.name;
            return this.exercises;
          }),
          take(1),
          tap(exercises => {
            newExercise.id = generatedId;
            this._exercises.next(exercises.concat(newExercise));
          })
          );
  }

  updateExe(
    exerciseId: string,
    name: string,
    weigth: number,
    sets: number,
    reps: number
  ) {
    let updatedExercises: Exercise[];
    return this.exercises.pipe(
      take(1),
      switchMap(exercises => {
          const updatedExerciseIndex = exercises.findIndex(ex => ex.id === exerciseId);
          updatedExercises = [...exercises];
          const oldExe = updatedExercises[updatedExerciseIndex];
          updatedExercises[updatedExerciseIndex] = new Exercise(
            oldExe.id,
            name,
            weigth,
            sets,
            reps,
            oldExe.userId
          );
          return  this.http.put(`https://lift00.firebaseio.com/exercises/${exerciseId}.json`,
            { ...updatedExercises[updatedExerciseIndex], id: null }
          );
      }), tap(() => {
        this._exercises.next(updatedExercises);
      })
      );
    }

  cancelEx(exerciseId: string) {
    return this.http
    .delete(`https://lift00.firebaseio.com/exercises/${exerciseId}.json`
    ).pipe(
      switchMap(() => {
        return this.exercises;
    }),
    take(1),
    tap(exercises => {
      this._exercises.next(exercises.filter(element => element.id !== exerciseId));
    })
    );
  }
}

  // cancelEX
  // return this.exercises.pipe(
  //   take(1),
  //   tap(exercises => {
  //     this._exercises.next(exercises.filter(element => element.id !== exerciseId));
  //   })
  // );


// [
//   new Exercise(
//     'p1',
//     'bench press',
//     100,
//     5,
//     2,
//     'abc'
//   ),
//   new Exercise(
//     'p2',
//     'squat',
//     100,
//     10,
//     5,
//     'abc'
//   ),
//   new Exercise(
//     'p3',
//     'dumbells',
//     80,
//     4,
//     1,
//     'pp'
//   )
// ]