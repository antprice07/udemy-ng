import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recSvc: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parms: Params) => {
      this.id = +parms['id'];
      this.editMode = parms['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.recSvc.updateRecipe(this.id, newRecipe);
    } else {
      this.recSvc.addRecipe(this.recipeForm.value);
      //if the format of the form is the same, no need to make the constant, but here is an example of what is happening here
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recImagePath = '';
    let recDesc = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recSvc.getRecipeById(this.id);
      recipeName = recipe.name;
      recImagePath = recipe.imagePath;
      recDesc = recipe.description;
      if (recipe['ingredients']) {
        for (let ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amt: new FormControl(ing.amt, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recImagePath, Validators.required),
      description: new FormControl(recDesc, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onIngEx(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get Controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amt: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
}
