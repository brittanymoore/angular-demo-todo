import { Task } from './../../todo/task';
export class ToDoMock {

    private tasks: Task[];

    constructor() {
        this.tasks = [
            { id: 1, name: 'thing I need to do', complete: true },
            { id: 2, name: 'another thing I need to do', complete: false }
        ];
    }

    // get all tasks
    public getTasks(): Task[] {
        return this.tasks;
    }

    // add a task to the list
    public addTask(task: Task): Task {
        task.id = this.tasks.length + 1;
        this.tasks.push(task);
        return task;
    }

    // update an existing task
    public updateTask(id: number, task: Task): Task {
        // try to find the item in the current list of tasks
        const index = this.tasks.findIndex((t) => {
            return t.id === id; 
        });
        // if the item was found, update it - otherwise create a new item
        if (index) {
            this.tasks[index] = task;
            return task;
        } else {
            this.tasks.push(task);
            return task;
        }
    }

}
