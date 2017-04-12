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

    public getTasks(): Observable<Task[]> {
        return this.http.get("getTasks", { headers: this.headers() })
            .map(this.extractHttpData)
            .catch(this.handleError);
    }

    public create(name: string): Observable<Task> {
        let data: Object = {
            name: name
        }
        return this.http.post("addTask", JSON.stringify(data), { headers: this.headers() })
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
                'Accept': 'application/json;odata=verbose'
            }
        );
    }

}