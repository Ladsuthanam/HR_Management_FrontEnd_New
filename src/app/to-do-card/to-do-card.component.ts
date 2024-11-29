import { Component, Input } from '@angular/core';
import { ITodo } from '../models/todo.model';

export type ITodoType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const ITodoStatus = ['OPEN' , 'PROGRESS' , 'TESTING' ,'DONE'];

@Component({
  selector: 'app-to-do-card',
  standalone:true,
  imports: [],
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.css'
})
export class ToDoCardComponent {
  @Input() type: ITodoType = 'OPEN' ;
  @Input() todo!: ITodo;
}
