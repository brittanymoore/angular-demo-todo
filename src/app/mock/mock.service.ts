import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// mocks
import { ToDoMock } from './models/todo.mock';

// this value will be used as a mock server delay.
const MOCK_DELAY = 0;

export function mockBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {  

    // disable mock backend based on environment variable
    if (!process.env.USE_MOCK) {

        return new Http(realBackend, options);

    } else {

        backend.connections.subscribe((connection: MockConnection) => {

            setTimeout(() => {

                // TODO

                if (connection.request.url.match(/getTasks/) &&
                connection.request.method === RequestMethod.Get) {

                    let mock = new ToDoMock();
                    let tasks = mock.getTasks();

                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: tasks })));

                    return;

                }

                if (connection.request.url.match(/addTask/) &&
                connection.request.method === RequestMethod.Post) {

                    let mock = new ToDoMock();
                    
                    let data = JSON.parse(connection.request.getBody());
                    let newTask = mock.addTask(data.name);

                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: newTask })));

                    return;

                }

                let realHttp = new Http(realBackend, options);
                realHttp.get(connection.request.url).subscribe((response: Response) => { connection.mockRespond(response); });

            }, MOCK_DELAY); // optional mock delay

        });

        return new Http(backend, options);

    } 

}

export let mockBackendProvider = {
    provide: Http,
    deps: [ MockBackend, BaseRequestOptions, XHRBackend ],
    useFactory: mockBackendFactory
}