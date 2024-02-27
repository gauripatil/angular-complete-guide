import { Component } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    RecipesComponent,
    ShoppingListComponent
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

}
