export class Project {
    constructor(title, todos) {
        this.title = title;
        this.todos = todos;
    }

    getTodos() {
        return this.todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}