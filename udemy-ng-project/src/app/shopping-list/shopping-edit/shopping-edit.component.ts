import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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
  editedItemIndex: number;
  editItem: Ingredient;

  constructor(private shoplistSvc: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoplistSvc.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoplistSvc.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amt,
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    let ing = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoplistSvc.updateItem(this.editedItemIndex, ing);
    } else {
      this.shoplistSvc.addIngredient(ing);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.shoplistSvc.deleteIngrediet(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
