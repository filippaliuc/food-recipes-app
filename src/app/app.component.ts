import { Component, OnInit, Input, ViewChild, ElementRef,  } from '@angular/core';
import { Todo } from './Todo';
import { getDocs, collection, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { MatChipEditedEvent , MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { db } from 'src/environments/firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  
}
