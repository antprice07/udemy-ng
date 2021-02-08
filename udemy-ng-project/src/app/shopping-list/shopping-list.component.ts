import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingreChangedSub: Subscription;

  ingredients: Ingredient[] = [];

  constructor(private shoplistSvc: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoplistSvc.getShoppingList();
    this.ingreChangedSub = this.shoplistSvc.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.ingreChangedSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoplistSvc.startedEditing.next(index);
  }
}
