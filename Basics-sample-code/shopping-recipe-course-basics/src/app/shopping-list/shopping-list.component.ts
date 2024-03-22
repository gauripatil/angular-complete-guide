import { Component } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    ShoppingEditComponent
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

  ingredients: Ingredient[] = [
    new Ingredient("Apple", "10"),
    new Ingredient("Banana", "5")
  ];

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

}
