import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';


@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {
    constructor(private recipeSvc: RecipeService){}

   @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature:string){
        this.featureSelected.emit(feature);
    }
    onSaveData(){
        this.recipeSvc.storeRecipes();
    }

    onFetchData(){
        this.recipeSvc.fetchRecipes().subscribe();
    }

}