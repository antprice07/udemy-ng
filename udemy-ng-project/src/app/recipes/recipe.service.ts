import { Injectable,EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected= new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test','This is simply a test.','https://barbecuebible.com/wp-content/uploads/2013/05/featured-great-american-hamburger-1024x640.jpg',
      [new Ingredient('Bread', 1),
        new Ingredient("French Fries",20)]),
    new Recipe('Another Test','This is simply a test.','https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
      [new Ingredient("meat",1)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeById(id:number){
    return this.recipes.slice()[id];
  }

  constructor() { }
}

