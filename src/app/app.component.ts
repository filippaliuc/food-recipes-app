import { Component, OnInit, Input,  } from '@angular/core';
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

  constructor(){}

  ngOnInit() {
    this.getRecipesFromFirestore()
  }

  async getRecipesFromFirestore() {
    this.docSnap = await getDocs(collection(db, "recipes"));
  }

  showRecipes () {
    this.recipes = []
    this.docSnap.forEach((doc) => {
      var ingredients = doc.get("ingrediente");
      if(ingredients){
        const recipeContainsAllIngredients = this.todos.every(element => {return ingredients.includes(element.name)});
        if(recipeContainsAllIngredients){
          this.recipes.push(doc.data())
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

  done(id: number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }
}
