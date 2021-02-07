import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styles: [
  ]
})
export class RecipeStartComponent implements OnInit {

  recipe: Recipe;
  recipeForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null),
      'description': new FormControl(null),
      'imagePath': new FormControl(null),
      'ingredients': new FormArray([])
    });
  }

  onAddRecipe() { }
  
  get Controls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls; 
  }

  onAddIngredient() {
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.recipeForm.get('ingredients')).push(control) 
  }

}
