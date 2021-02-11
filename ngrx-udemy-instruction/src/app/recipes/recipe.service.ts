import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Store} from '@ngrx/store';
import { Recipe } from './recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  url =
    'https://udemy-ng-recipe-book-5d926-default-rtdb.firebaseio.com/recipes.json';
  recipesChanged = new Subject<Recipe[]>();
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Cheeseburger',
  //     'This is simply a test.',
  //     'https://barbecuebible.com/wp-content/uploads/2013/05/featured-great-american-hamburger-1024x640.jpg',
  //     [new Ingredient('Bread', 1), new Ingredient('Ground Beef', 2)]
  //   ),
  //   new Recipe(
  //     'Pizza',
  //     'This is simply a test.',
  //     'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
  //     [new Ingredient('Pepperoni', 1)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  constructor(private http: HttpClient, private authSvc: AuthService,private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}

  storeRecipes() {
    const recipes = this.getRecipes();
    this.http.put(this.url, recipes).subscribe((res) => {
      console.log(res);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map((res) => {
        return res.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.setRecipes(recipes);
      })
    );
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeById(id: number) {
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
