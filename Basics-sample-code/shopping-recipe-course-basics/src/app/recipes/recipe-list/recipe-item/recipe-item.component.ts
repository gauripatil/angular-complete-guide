import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input('recipe')
  recipe!: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected(): void {
    this.recipeSelected.emit();
   }

}
