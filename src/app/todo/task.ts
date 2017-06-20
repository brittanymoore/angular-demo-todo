export class Task {

    public id: number;
    public name: string;
    public complete: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

}
