export class ToDo {
    constructor(title, dueDate) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = false;
    }

    edit(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
    }

    updateCompleteStatus() {
        this.isComplete = !this.isComplete;
    }
}