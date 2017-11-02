import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Task } from './task';

@Injectable()
export class ToDoService {

    private api: string = `${process.env.API_URL}/tasks`;

    constructor(
        private http: Http
    ) { }

    public getTasks(): Observable<Task[]> {
        return this.http.get(this.api, { headers: this.headers() })
            .map(this.extractHttpData)
            .catch(this.handleError);
    }

    public addTask(task: Task): Observable<Task> {
        return this.http.post(this.api, JSON.stringify(task), { headers: this.headers() })
            .map(this.extractHttpData)
            .catch(this.handleError);
    }

    public updateTask(task: Task): Observable<Task> {
        return this.http.put(this.api + '/' + task.id, JSON.stringify(task), { headers: this.headers() })
            .map(this.extractHttpData)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    private extractHttpData(res: Response): Object {
        return res.json();
    }

    private headers(): Headers {
        return new Headers(
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        );
    }

}
