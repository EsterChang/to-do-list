export function createToDoElement(projectId, todoId, title, dueDate, isCompleted=false, buildFromStorage=false) {
    const projectElement = document.querySelector(`.project[data-project-id="${projectId}"]`);

    const todoElement = document.createElement("div");
    todoElement.className = "todo";
    todoElement.dataset.todoId = todoId;

    createCheckboxInput(todoElement, isCompleted);

    const textSpan = document.createElement("span");
    textSpan.textContent = `${title}, due by: ${dueDate}`;
    todoElement.appendChild(textSpan);

    createEditButton(todoElement);
    createDeleteButton(todoElement);

    projectElement.appendChild(todoElement);

    if (!buildFromStorage) {
        const projectsArray = JSON.parse(localStorage.getItem("projects")) || [];
        const projectObj = projectsArray.find(project => project.id === projectId);
        projectObj.todos.push({id: `${todoId}`, title: title, dueDate: dueDate, isCompleted: false});
        localStorage.setItem("projects", JSON.stringify(projectsArray));
    }

}


function createCheckboxInput(todoElement, isCompleted) {
    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("class", "todo-checkbox");
    if (isCompleted) {
        checkboxInput.setAttribute("checked", true);
    }

    todoElement.appendChild(checkboxInput);

    checkboxInput.addEventListener("click", () => {
        const todo = getTodoFromLocalStorage(todoElement);
        editAttributeInLocalStorage(todoElement, "isCompleted", !todo.isCompleted);
    })
}

function createEditButton(todoElement) {
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Edit";

    todoElement.appendChild(editButton);

    editButton.addEventListener("click", () => {

    })
}

function createDeleteButton(todoElement) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    todoElement.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        deleteFromLocalStorage(todoElement);
        todoElement.remove();
    })
}

function deleteFromLocalStorage(todoElement) {
    const todoId = todoElement.dataset.todoId;
    const projectElement = todoElement.closest('[data-project-id]')
    let projectId;
    if (projectElement) {
        projectId = projectElement.dataset.projectId;
    }

    const projects = JSON.parse(localStorage.getItem("projects"));
    const project = projects.find(project => project.id === projectId);
    const newTodos = project.todos.filter(todo => todo.id !== todoId);
    project.todos = newTodos;

    localStorage.setItem("projects", JSON.stringify(projects))
}

function getProjectsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("projects"));
}

function getProjectFromLocalStorage(todoElement) {
    const projectElement = todoElement.closest('[data-project-id]')
    let projectId;
    if (projectElement) {
        projectId = projectElement.dataset.projectId;
    }

    const projects = getProjectsFromLocalStorage()
    const project = projects.find(project => project.id === projectId);

    return project;
}

function getTodoFromLocalStorage(todoElement) {
    const todoId = todoElement.dataset.todoId;
    const project = getProjectFromLocalStorage(todoElement);
    const todo = project.todos.find(todo => todo.id === todoId);

    return todo
}

function editAttributeInLocalStorage(todoElement, attribute, value) {
    const projectElement = todoElement.closest('[data-project-id]')
    let projectId;
    if (projectElement) {
        projectId = projectElement.dataset.projectId;
    }
    const todoId = todoElement.dataset.todoId;
    const projects = getProjectsFromLocalStorage();
    const project =  projects.find(project => project.id === projectId);

    const todo = project.todos.find(todo => todo.id === todoId)
    
    todo[attribute] = value;

    
    localStorage.setItem("projects", JSON.stringify(projects))
}