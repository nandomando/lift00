import { Component, OnInit, OnDestroy} from '@angular/core';
import { ExercisesService } from '../exercises.service';
import { Exercise } from '../exercise.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {

  isLoading = false;
  loadedExercises: Exercise[];
  private exerciseDestroySub: Subscription;

  constructor(
    private exerciseService: ExercisesService,
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {

    this.exerciseDestroySub = this.exerciseService.exercises.subscribe(elements => {
      this.loadedExercises = elements;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.exerciseService.fetchExercises().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(exerciseId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'tabs', 'tab', 'list', 'edit', exerciseId]);
  }

  ngOnDestroy() {
    if (this.exerciseDestroySub) {
      this.exerciseDestroySub.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('auth');
  }

  onCancelEx(exerciseId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl.create({
      message: 'Deleting Exercise ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.exerciseService.cancelEx(exerciseId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }


}
