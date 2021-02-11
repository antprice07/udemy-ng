import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  name: string = '';
  amount: number = 0;
  editMode = false;
  // editedItemIndex: number;
  editItem: Ingredient;

  constructor(
    // private shoplistSvc: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        // this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amt,
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoplistSvc.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editItem = this.shoplistSvc.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editItem.name,
    //       amount: this.editItem.amt,
    //     });
    //   }
    // );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    let ing = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(ing));
    } else {
      // this.shoplistSvc.addIngredient(ing);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ing));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.shoplistSvc.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
