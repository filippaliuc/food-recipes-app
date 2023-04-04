import { Component, OnInit, Input, ViewChild, ElementRef,  } from '@angular/core';
import { Todo } from '../Todo';
import { getDocs, collection, QuerySnapshot, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { MatChipEditedEvent , MatChipInputEvent } from '@angular/material/chips';
import {FormControl, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { db } from 'src/environments/firebase';
import {  Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  @Input() todos: Todo[] = [];

  newTodo: string;
  docSnap: QuerySnapshot<DocumentData>
  recipes: DocumentData[] = [];
  
  @ViewChild('types') types !: ElementRef;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.getRecipesFromFirestore()
  }

  async getRecipesFromFirestore() {
    this.docSnap = await getDocs(collection(db, "recipes"));
    this.showAllRecipes()
  }

  // Functie care arata retetele in functie de filtrele: gustare, desert, etc.
  showRecipes () {  
    this.recipes = []
    var counter = 0
    console.log("showRecipes")
    this.docSnap.forEach((doc) => {                 // parcurge fiecare reteta din firestore
      var ingredients = doc.get("ingrediente");     // ingredientele din campul "ingrediente" din firestore
      var foodCategory = doc.get("categorie");      
      console.log(typeof(doc.data()));
      if(ingredients){
        const recipeContainsAllIngredients = this.todos.every(element => {return ingredients.includes(element.name)});                      //verifica daca ingredientele alese fac parte din ingredientele retetei
        if(recipeContainsAllIngredients && (foodCategory==this.types.nativeElement.value || this.types.nativeElement.value=="toate")){      //verifica daca reteta face parte din categoria aleasa
          this.recipes.push(doc.data())   //adauga in lista de retete
          // console.log(++counter)
        }
      }
    })
  }

  //  Functie care arata toate retetele - apelata la initierea paginii sau la revenirea pe pagina principala
  showAllRecipes() {
    this.recipes = []
    var counter = 0
    console.log("ALL")
    this.docSnap.forEach((doc) => {
      var ingredients = doc.get("ingrediente");
      var foodCategory = doc.get("categorie");
      // console.log(doc.get("imagine"))
      if(ingredients && (foodCategory==this.types.nativeElement.value || this.types.nativeElement.value=="toate")){

        this.recipes.push(doc.data())
        // console.log(++counter)
      } 
    })
  }

  onTypeChange(value: any) {
    this.showRecipes()
  }

  saveTodo() {
    if (this.newTodo) {
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = true
      this.todos.push(todo);
      this.newTodo = '';
      console.log(this.todos)
    } else {
      alert('Introdu ingredientul');
    }
  }

  
  // scoaterea ingredientelor 
  removeIngredients(value: number){
    console.log("remove Ingredients")
    if(this.todos) {
      this.remove(value)
      this.showRecipes()
    } else {
      this.remove(value)
      this.showRecipes()
    }
  }


  done(id: number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }

  // functie care ajuta la a naviga pe pagina cu descrierea retetei alese
  navigateToDetailPage(path: string, recipe: DocumentData){
    this.recipeService.setRecipe(recipe)              //seteaza reteta cu ajutorul serviciului
    this.recipeService.setIngredients(this.todos)     //seteaza ingredientele cu ajutorul serviciului 
    this.router.navigate([path]);                     //navigheaza pe pagina cu detalii
  }
}
