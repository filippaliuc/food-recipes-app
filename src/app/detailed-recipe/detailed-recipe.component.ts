import {Component , OnInit , ChangeDetectionStrategy} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DocumentData } from 'firebase/firestore'
import { RecipeService } from '../services/recipe.service';
import { Todo } from '../Todo';

@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.css']
})

export class DetailedRecipeComponent implements OnInit{

  recipe: DocumentData;
  ingredients: Todo[]
  constructor(
    private recipeService: RecipeService
  ) { }

  // la deschiderea paginii se executa ce e mai jos
  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipe()                // ia reteta din serviciu setata in homepage
    this.ingredients = this.recipeService.getIngredients()      // ia ingredientele din serviciu setate in homepage
    console.log(this.ingredients)
  }
}
