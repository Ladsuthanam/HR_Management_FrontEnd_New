import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: ITodo[]= [
    {
    id:1,
    title: 'Test Title',
    description:'Test description',
    status: 'OPEN',

    },
  ];

  constructor() { }

getAllTodo(){
  return this.todos;
}
}
