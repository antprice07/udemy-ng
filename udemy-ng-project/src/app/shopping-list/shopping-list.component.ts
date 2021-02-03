import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[] = [];

  constructor(private shoplistSvc:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoplistSvc.getShoppingList();
    this.shoplistSvc.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    });
  }

}
