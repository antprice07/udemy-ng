import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [
  ]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private slService: ShoppingListService, private recService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  onToShoppingList(){
    for(let ingredient of this.recipe.ingredients){
      this.slService.addIngredient(ingredient);
    }
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete(){
    this.recService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  
  ngOnInit(): void {  
    this.route.params.subscribe((parms : Params) => {
      this.id = +parms['id'];
      this.recipe = this.recService.getRecipeById(this.id);
    });
  }

}
