import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Task } from './task';

@Injectable()
export class ToDoService {

    private api: string = `${process.env.API_URL}/tasks`;

    constructor(
        private http: HttpClient
    ) { }

    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.api, { headers: this.headers() });
    }

    public addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.api, JSON.stringify(task), { headers: this.headers() });
    }

    public updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(this.api + '/' + task.id, JSON.stringify(task), { headers: this.headers() });
    }

    private headers(): HttpHeaders {
        return new HttpHeaders(
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        );
    }

}
