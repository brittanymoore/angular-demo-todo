import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Task } from './task';
import { ToDoService } from './todo.service';

@Component({
    selector: 'todo',
    templateUrl: 'todo.component.html',
    styleUrls: [ './todo.component.less' ]
})
export class ToDoComponent implements OnInit {

    public tasks: Task[] = [];
    public tasksLoading: boolean = true;
    public error: any;
    public task: FormGroup;
    private taskModel: Task = {
        name: ''
    }

    constructor(
        public fb: FormBuilder,
        public toDoService: ToDoService
    ) { }

    public onSubmit(): void {
        this.add(this.task.value.name);
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
                    this.error = <any>error
                }
            );           
    } 

    public add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.toDoService.create(name)
            .subscribe(
                (task) => { this.tasks.push(task); },
                (error) => { this.error = <any>error; }
            );
    }   

    public ngOnInit(): void {
        // set up form
        this.task = this.fb.group({
            name: [this.taskModel.name, [Validators.required]]
        });
        // get existing tasks
        this.getTasks();
    }

}