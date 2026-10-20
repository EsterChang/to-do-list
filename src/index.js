import { Project } from "./models/project.js";
import { ToDo } from "./models/todo.js";
import { createProjectElement } from "./views/projectView.js";
import { createToDoElement } from "./views/todoView.js";
import "./style.css";

//todo: 
// checkmarks to complete tasks
// edit todo
// edit project
// delete project

function initializeProjects() {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        projects.forEach(project => {
            createProjectElement(project.id, project.title, true);
            project.todos.forEach(todo => {
                createToDoElement(project.id, todo.id, todo.title, todo.dueDate, todo.isCompleted, true);
            });
        });
    } else {
        const defaultProject = new Project("default", []);
        createProjectElement(defaultProject.getId(), "default");
    }
}

function addProjectButton() {
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
}

function render() {
    addProjectButton();
    initializeProjects();
}

render()
