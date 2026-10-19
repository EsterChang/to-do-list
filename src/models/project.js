export class Project {
    constructor(title, todos) {
        this.title = title;
        this.todos = todos;
        this.id = crypto.randomUUID();
    }

    getId() {
        return this.id;
    }

    getTodos() {
        return this.todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}