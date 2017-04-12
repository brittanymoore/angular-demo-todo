import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// dependencies
import { ToDoComponent } from './todo.component';
import { ToDoService } from './todo.service';
import { ReactiveFormsModule } from '@angular/forms';

// mocks
class MockToDoService {

    public getTasks() { 
        return Observable.of([]);
    }
    public create(name) { 
        return Observable.of({name: name});
    }
    private handleError() { }
    private extractHttpData() { }
    private headers() { }
}

// tests
describe('TodoComponent', () => {

    let component: ToDoComponent;
    let fixture: ComponentFixture<ToDoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            declarations: [ ToDoComponent ],
            providers: [
                { provide: ToDoService, useClass: MockToDoService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(ToDoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should get tasks from service', () => {
        spyOn(component.toDoService, 'getTasks').and.returnValue(Observable.of([{name: 'a'},{name: 'b'}]));
        component.getTasks();
        expect(component.toDoService.getTasks).toHaveBeenCalledTimes(1);
        expect(component.tasks.length).toBe(2);
    });

    it('should send new task to service', () => {
        spyOn(component.toDoService, 'create').and.callThrough();
        let originalTaskCount = component.tasks.length;
        component.add('test task');
        expect(component.toDoService.create).toHaveBeenCalledWith('test task');
        expect(component.toDoService.create).toHaveBeenCalledTimes(1);
        expect(component.tasks.length).toBe(originalTaskCount+1);
    });

});