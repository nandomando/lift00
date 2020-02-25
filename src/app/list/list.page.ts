import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../exercises.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  loadedExercises: Exercise[];

  constructor(private exerciseService: ExercisesService) { }

  ngOnInit() {

    this.exerciseService.exercises.subscribe(elements => {
      this.loadedExercises = elements;
    });

  }

  addExercise() {

  }

}
