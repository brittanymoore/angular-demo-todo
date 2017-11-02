import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Task } from './task';
import { ToDoService } from './todo.service';

@Component({
    selector: 'my-todo',
    templateUrl: 'todo.component.html',
    styleUrls: [ './todo.component.scss' ]
})
export class ToDoComponent implements OnInit {

    public tasks: Task[] = [];
    public tasksLoading: boolean = true;
    public error: any;

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

    public ngOnInit(): void {
        this.task = this.fb.group({
            name: [ this.taskModel.name, [Validators.required] ]
        });
        this.getTasks();
    }

    public onSubmit(): void {
        this.addTask(this.task.value);
        this.task.reset();
    }

    public getTasks(): void {
        this.toDoService.getTasks()
            .subscribe(
                (tasks) => {
                    this.tasks = tasks;
                    this.tasksLoading = false;
                },
                (error) => {
                    this.error = <any>error;
                }
            );
    }

    public addTask(task: Task): void {
        console.log(task);
        this.toDoService.addTask(task)
            .subscribe(
                (newTask) => {
                    console.log(newTask);
                    this.tasks.push(newTask);
                },
                (error) => { this.error = <any>error; }
            );
    }

    public toggleTaskCompletion(task: Task) {
        task.complete = !task.complete;
        this.toDoService.updateTask(task)
            .subscribe(
                (updatedTask) => { },
                (error) => { this.error = <any>error; }
            );
    }

}
