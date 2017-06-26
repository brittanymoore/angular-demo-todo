import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// mocks
import { ToDoMock } from './models/todo.mock';

// constants
const MOCK_DELAY = 0; // simulate a server delay

// mock instances
const todo = new ToDoMock();

// mock service
export function mockBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {

    backend.connections.subscribe((connection: MockConnection) => {

        setTimeout(() => {

            /* task methods */

            // GET /api/tasks
            if (connection.request.url.match(/\api\/tasks$/) && connection.request.method === RequestMethod.Get) {
                const tasks = todo.getTasks();
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: JSON.stringify(tasks)
                })));
                return;
            }

            // POST /api/tasks
            if (connection.request.url.match(/\api\/tasks$/) && connection.request.method === RequestMethod.Post) {
                const data = JSON.parse(connection.request.getBody());
                const task = todo.addTask(data);
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 201,
                    body: JSON.stringify(task)
                })));
                return;
            }

            // PUT /api/tasks/##
            if (connection.request.url.match(/\api\/tasks\/\d+$/) && connection.request.method === RequestMethod.Put) {
                const match = connection.request.url.match(/\d+$/);
                const id = parseInt(match[0], 10);
                const data = JSON.parse(connection.request.getBody());

                // if ids are both provided and don't match, return 400 Bad Request
                if (data.id && id !== data.id) {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 400 })));
                } else {
                    const task = todo.updateTask(id, data);
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: JSON.stringify(task)
                    })));
                }
                return;
            }

            /* set up the mock backend */
            const realHttp = new Http(realBackend, options);
            realHttp.get(connection.request.url).subscribe((response: Response) => {
                connection.mockRespond(response);
            });

        }, MOCK_DELAY);

    });

    return new Http(backend, options);

}

export let mockBackendProvider = {
    provide: Http,
    deps: [ MockBackend, BaseRequestOptions, XHRBackend ],
    useFactory: mockBackendFactory
};
