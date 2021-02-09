import { EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isLoggedIn = false;
  constructor(private recipeSvc: RecipeService, private authSvc: AuthService) {}

  ngOnInit() {
    this.userSub = this.authSvc.user.subscribe((user) => {
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
