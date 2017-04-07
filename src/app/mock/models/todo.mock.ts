import { Task } from './../../todo/task';
export class ToDoMock {

    private tasks: Task[] = [
        { id: 1, name: "thing I need to do", complete: true },
        { id: 2, name: "another thing I need to do" }
    ];

    public getTasks(): Task[] {
        return this.tasks;
    }

    public addTask(name: string): Task {
        let id = this.tasks.length + 1;
        let newTask = { id: id, name: name };
        this.tasks.push(newTask);
        return newTask;
    }

}