import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ITodoStatus,ToDoCardComponent } from '../to-do-card/to-do-card.component';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/todo.model';
import { SlidePanelComponent } from '../slide-panel/slide-panel.component';
import { FormBuilder,FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-task',
  imports: [RouterOutlet,ToDoCardComponent,SlidePanelComponent,ReactiveFormsModule,],
  templateUrl: './to-do-task.component.html',
  styleUrl: './to-do-task.component.css'
})
export class ToDoTaskComponent implements OnInit {
  todoForm!: FormGroup;
  todos:ITodo[]=[];
  todoStatus = ITodoStatus;
  isSlidePanelOpen= false;
  constructor(private todoService: TodoService,private fb: FormBuilder ){
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(){
    this.todos=this.todoService.getAllTodo();

 }

 openSlidePanel(){
  this.isSlidePanelOpen=true;
 }
 onCloseSlidePanel(){
  this.isSlidePanelOpen = false;
 }
 onSubmit() {
  if (this.todoForm.valid) {
    // Add the new ToDo to the list
    const newTodo: ITodo = this.todoForm.value;
    this.todos.push(newTodo);

    // Close the slide panel
    this.onCloseSlidePanel();

    // Reset the form
    this.todoForm.reset({
      title: '',
      description: '',
      status: 'OPEN',
    });
  } else {
    this.todoForm.markAllAsTouched();
  }
}

}
