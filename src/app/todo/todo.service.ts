import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Task } from './task';

@Injectable()
export class ToDoService {

    constructor(
        private http: Http
    ) { }

    // api string for our mock REST service
    private api: string = "/api/tasks";

    // get all tasks
    public getTasks(): Observable<Task[]> {
        return this.http.get(this.api, { headers: this.headers() })
            .map(this.extractHttpData)
            .catch(this.handleError);
    }

    // create a new task
    public addTask(task: Task): Observable<Task> {
        return this.http.post(this.api, JSON.stringify(task), { headers: this.headers() })
            .map(this.extractHttpData)
            .catch(this.handleError);
    }

    // update an existing task
    public updateTask(task: Task): Observable<Task> {
        return this.http.put(this.api + "/" + task.id, JSON.stringify(task), { headers: this.headers() })
            .map(this.extractHttpData)
            .catch(this.handleError);
    }

    // general error handler
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    // extract http data from REST response
    private extractHttpData(res: Response): Object {
        return res.json();
    }

    // generate http header
    private headers(): Headers {
        return new Headers(
            {
                'Accept': 'application/json;odata=verbose'
            }
        );
    }

}