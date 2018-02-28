export class Task {
  public id: number;
  public name: string;
  public complete = false;

  constructor(name: string) {
    this.name = name;
  }
}
