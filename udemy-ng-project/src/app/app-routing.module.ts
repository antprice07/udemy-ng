import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: 'recipes', component: RecipesComponent, children: [
        {path: ':id/detail', component: RecipeDetailComponent},
    ]},
    {path: 'shopping-list', component: ShoppingListComponent, children: [
        
    ]},
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
]

@NgModule({
 imports: [RouterModule.forRoot(appRoutes)],
 exports: [RouterModule]
})
export class AppRoutingModule {

}