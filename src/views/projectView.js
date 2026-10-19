import { createToDoElement } from "./todoView.js";
import { ToDo } from "../models/todo.js";

export function createProjectElement(projectId, title, buildFromStorage=false) {
    const body = document.querySelector("body");
    const projectElement = document.createElement("div");
    projectElement.setAttribute("class", "project");
    projectElement.setAttribute("data-project-id", projectId);

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = title;
    projectElement.appendChild(projectTitle);

    body.appendChild(projectElement);

    const addTodoTemplate = document.getElementById("add-todo-template");
    const clone = addTodoTemplate.content.cloneNode(true);
    const form = clone.querySelector(".add-todo-form");
    projectElement.appendChild(clone);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const toDoTitleInput = form.querySelector(".todo-title-input");
        const toDoTitle = toDoTitleInput.value;
        const dueDateInput = form.querySelector(".todo-dueDate-input");
        const dueDate = dueDateInput.value;

        const todo = new ToDo(toDoTitle, dueDate);
        createToDoElement(projectId, todo.getId(), toDoTitle, dueDate);

        form.reset();
    })

    if(!buildFromStorage) {
        const projectsArray = JSON.parse(localStorage.getItem("projects")) || [];
        projectsArray.push({id: projectId, title: `${title}`, todos: []});
        localStorage.setItem("projects", JSON.stringify(projectsArray));
    }

}