import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  recipes: Recipe[] = [
    new Recipe('Cheeseburger','This is simply a test.','https://barbecuebible.com/wp-content/uploads/2013/05/featured-great-american-hamburger-1024x640.jpg',
      [new Ingredient('Bread', 1),
        new Ingredient("Ground Beef",2)]),
    new Recipe('Pizza','This is simply a test.','https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
      [new Ingredient("Pepperoni",1)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeById(id:number){
    return this.recipes.slice()[id];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  constructor() { }
}

