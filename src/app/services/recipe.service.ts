import { Injectable, Input } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  @Input() ingredients: Todo[] = [];
  recipe: DocumentData

  constructor() { }

  setRecipe(recipe: DocumentData){
    this.recipe = recipe;
  }

  setIngredients(ingredients: Todo[]){
    this.ingredients = ingredients;
  }

  getRecipe(){
    return this.recipe;
  }

  getIngredients(){
    return this.ingredients;
  }
}
