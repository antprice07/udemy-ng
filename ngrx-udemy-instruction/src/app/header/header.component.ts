import { EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isLoggedIn = false;
  constructor(
    private recipeSvc: RecipeService,
    private authSvc: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        //   this.isLoggedIn = !user ? false : true;
        this.isLoggedIn = !!user;
      });
  }

  onLogout() {
    this.authSvc.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  onSaveData() {
    this.recipeSvc.storeRecipes();
  }

  onFetchData() {
    this.recipeSvc.fetchRecipes().subscribe();
  }
}
