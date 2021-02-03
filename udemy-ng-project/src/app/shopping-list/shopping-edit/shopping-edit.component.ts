import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit {

  name: string = '';
  amount: number = 0;

  constructor(private shoplistSvc:ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(){
    let ing = new Ingredient(this.name,this.amount)
    this.shoplistSvc.addIngredient(ing);
  }

}
