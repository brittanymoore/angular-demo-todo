import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Task } from './task';
import { ToDoService } from './todo.service';

@Component({
    selector: 'todo',
    templateUrl: 'todo.component.html',
    styleUrls: [ './todo.component.scss' ]
})
export class ToDoComponent implements OnInit {

    public tasks: Task[] = [];
    public tasksLoading: boolean = true;
    public error: any;

    // form properties
    public task: FormGroup;
    private taskModel: Task = {
        name: '',
        complete: false,
        id: null
    };

    constructor(
        public fb: FormBuilder,
        public toDoService: ToDoService
    ) { }

    // on submit, add the new task and reset
    public onSubmit(): void {
        this.addTask(this.task.value);
        this.task.reset();
    }

    // get all tasks
    public getTasks(): void {
        this.toDoService.getTasks()
            .subscribe(
                (tasks) => {
                    this.tasks = tasks;
                    this.tasksLoading = false;
                },
                (error) => { 
                    this.error = <any>error
                }
            );           
    } 

    // add a new task
    public addTask(task: Task): void {
        this.toDoService.addTask(task)
            .subscribe(
                (task) => { 
                    this.tasks.push(task);
                },
                (error) => { this.error = <any>error; }
            );
    }

    // toggle the task's completion status
    public toggleTaskCompletion(task: Task) {
        task.complete = !task.complete;
        this.toDoService.updateTask(task)
            .subscribe(
                (task) => { this.getTasks(); },
                (error) => { this.error = <any>error; }
            );
    }

    // component initialization
    public ngOnInit(): void {
        // set up form
        this.task = this.fb.group({
            name: [ this.taskModel.name, [Validators.required] ]
        });
        // get existing tasks
        this.getTasks();
    }

}