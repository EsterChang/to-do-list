import { createToDoElement } from "./todoView.js";
import { ToDo } from "../models/todo.js";

export function createProjectElement(id, title) {
    const body = document.querySelector("body");
    const projectElement = document.createElement("div");
    projectElement.setAttribute("class", "project");
    projectElement.setAttribute("data-proj-name", title);

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = title;
    projectElement.appendChild(projectTitle);

    body.appendChild(projectElement);

    const addTodoTemplate = document.getElementById("add-todo-template");
    const clone = addTodoTemplate.content.cloneNode(true);
    const form = clone.querySelector(".add-todo-form");
    form.setAttribute("data-project-id", id);
    projectElement.appendChild(clone);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const toDoTitleInput = form.querySelector(".todo-title-input");
        const toDoTitle = toDoTitleInput.value;
        const dueDateInput = form.querySelector(".todo-dueDate-input");
        const dueDate = dueDateInput.value;

        createToDoElement(id, toDoTitle, dueDate);
        const todo = new ToDo(toDoTitle, dueDate);

        localStorage.setItem(`${todo.id}`, toDoTitle);

        form.reset();
    })
}