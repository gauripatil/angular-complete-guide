import { Component } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeItemComponent
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe("A Test Recipe", "A Test Recipe Description", "https://static.toiimg.com/photo/77151731.cms"),
    new Recipe("A Test Recipe", "A Test Recipe Description", "https://static.toiimg.com/photo/77151731.cms"),
    new Recipe("A Test Recipe", "A Test Recipe Description", "https://static.toiimg.com/photo/77151731.cms")
  ];

}
