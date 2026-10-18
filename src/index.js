import { Project } from "./project.js";
import { ToDo } from "./todo.js";
import "./style.css";

const body = document.querySelector("body");

const defaultProjectElement = document.createElement("div");
defaultProjectElement.setAttribute("class", "project");
defaultProjectElement.setAttribute("data-proj-name", "default");
body.appendChild(defaultProjectElement);

const addTodoButtonTemplate = document.getElementById("add-todo-button-template");
const clone = addTodoButtonTemplate.content.cloneNode(true);
defaultProjectElement.appendChild(clone);

const defaultProject = new Project("default", []);

const addTodoForm = document.getElementById("add-todo-form");
const addTodoDialog = document.getElementById("add-todo-dialog");
addTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title");
    const dueDate = document.getElementById("dueDate");

    const todoElement = document.createElement("span");
    todoElement.textContent = `${title.value}, due by: ${dueDate.value}`;
    defaultProjectElement.appendChild(todoElement);

    addTodoDialog.close();
    addTodoForm.reset();
})

