import { Project } from "./models/project.js";
import { ToDo } from "./models/todo.js";
import { createProjectElement } from "./views/projectView.js";
import { createToDoElement } from "./views/todoView.js";
import "./style.css";

//todo: 
// checkmarks to complete tasks
// localStorage formatting
// render existing tasks in localStorage
// edit todo
// delete todo
// edit project
// delete project

const defaultProject = new Project("default", []);
createProjectElement(defaultProject.getId(), "default");

const addProjectDialog = document.getElementById("add-project-dialog");
const addProjectForm = document.querySelector(".add-project-form");
const projectTitleInput = document.getElementById("project-title-input");

addProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const project = new Project(projectTitleInput.value, []);
    createProjectElement(project.getId(), projectTitleInput.value);

    addProjectDialog.close();
    addProjectForm.reset();
})