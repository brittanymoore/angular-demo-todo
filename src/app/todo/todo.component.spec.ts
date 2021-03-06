import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Task } from './task';

// dependencies
import { ReactiveFormsModule } from '@angular/forms';
import { ToDoComponent } from './todo.component';
import { ToDoService } from './todo.service';

// mocks
class MockToDoService {
  public getTasks() {
    return Observable.of([]);
  }
  public addTask(task) {
    return Observable.of({ task });
  }
  public updateTask(task: Task) {
    return Observable.of({ task });
  }
  private handleError() {}
  private extractHttpData() {}
  private headers() {}
}

// tests
describe('TodoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [ToDoComponent],
        providers: [{ provide: ToDoService, useClass: MockToDoService }],
      }).compileComponents();
    }),
  );

  beforeEach(
    async(() => {
      fixture = TestBed.createComponent(ToDoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get tasks from service', () => {
    spyOn(component.toDoService, 'getTasks').and.returnValue(
      Observable.of([{ name: 'a' }, { name: 'b' }]),
    );
    component.getTasks();
    expect(component.toDoService.getTasks).toHaveBeenCalledTimes(1);
    expect(component.tasks.length).toBe(2);
  });

  it('should send new task to service', () => {
    spyOn(component.toDoService, 'addTask').and.callThrough();
    const originalTaskCount = component.tasks.length;
    const task = new Task('test task');
    component.addTask(task);
    expect(component.toDoService.addTask).toHaveBeenCalledWith(task);
    expect(component.toDoService.addTask).toHaveBeenCalledTimes(1);
    expect(component.tasks.length).toBe(originalTaskCount + 1);
  });
});
