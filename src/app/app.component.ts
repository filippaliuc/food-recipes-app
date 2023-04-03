import { Component, OnInit, Input, ViewChild, ElementRef,  } from '@angular/core';
import { Todo } from './Todo';
import { getDocs, collection, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from 'src/environments/firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  @Input() todos: Todo[] = [];
  newTodo: string;
  docSnap: QuerySnapshot<DocumentData>
  recipes: DocumentData[] = [];
  
  @ViewChild('types') types !: ElementRef;

  constructor(){}

  ngOnInit() {
    this.getRecipesFromFirestore()
  }

  async getRecipesFromFirestore() {
    this.docSnap = await getDocs(collection(db, "recipes"));
    this.showAllRecipes()
  }

  showRecipes () {
    this.recipes = []
    var counter = 0
    console.log("showRecipes")
    this.docSnap.forEach((doc) => {
      var ingredients = doc.get("ingrediente");
      var foodCategory = doc.get("categorie");
      if(ingredients){
        const recipeContainsAllIngredients = this.todos.every(element => {return ingredients.includes(element.name)});
        if(recipeContainsAllIngredients && (foodCategory==this.types.nativeElement.value || this.types.nativeElement.value=="toate")){
          this.recipes.push(doc.data())
          // console.log(++counter)
        }

        // this.todos.forEach((todo) => {
        //   if(ingredients.includes(todo.name)){
        //     recipeExists++;
        //   } 
        // })
        // if(recipeExists == this.todos.length){
        //   this.recipes.push(doc.data())
        // }
        // doc.get("Ingrediente").forEach((ingredient: string) => {
        //   // console.log(ingredient)
        //   this.todos[0].includes(ingredient)
        // })
      }
    })
  }

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
      alert('Please enter the ingredients');
    }
  }

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
}
