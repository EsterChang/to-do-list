export function createToDoElement(projectId, todoId, title, dueDate, isCompleted=false, buildFromStorage=false) {
    const projectElement = document.querySelector(`.project[data-project-id="${projectId}"]`);
    const todosElement = projectElement.querySelector('.todos');

    const todoElement = document.createElement("div");
    todoElement.className = "todo";
    todoElement.dataset.todoId = todoId;

    createCheckboxInput(todoElement, isCompleted);

    const textDiv = document.createElement("div");
    textDiv.className = "todo-text"
    const titleSpan = document.createElement("span");
    titleSpan.textContent = `${title} `;
    titleSpan.className = "title-span"
    const dueDateSpan = document.createElement("span");
    dueDateSpan.className = "due-date-span"
    dueDateSpan.textContent = `due by: ${dueDate}`;

    textDiv.appendChild(titleSpan);
    textDiv.appendChild(dueDateSpan);
    todoElement.appendChild(textDiv);

    createEditButton(todoElement);
    createDeleteButton(todoElement);

    todosElement.appendChild(todoElement);

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
    const dialog = document.createElement("dialog");

    const addTodoTemplate = document.getElementById("add-todo-template");
    const clone = addTodoTemplate.content.cloneNode(true);
    const form = clone.querySelector(".add-todo-form");

    const toDoTitleInput = form.querySelector(".todo-title-input");
    const dueDateInput = form.querySelector(".todo-dueDate-input")
    
    dialog.id = "edit-todo-dialog";
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.setAttribute("commandfor", dialog.id);
    editButton.command = "show-modal"

    dialog.appendChild(form);
    todoElement.appendChild(editButton);
    todoElement.appendChild(dialog);

    editButton.addEventListener("click", () => {
        toDoTitleInput.value = todoElement.querySelector(".title-span").textContent;
        dueDateInput.value = todoElement.querySelector(".due-date-span").textContent;
    })

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const toDoTitle = toDoTitleInput.value;
        const dueDate = dueDateInput.value;

        editToDoElement(todoElement, toDoTitle, dueDate);

        form.reset();
        dialog.close();
    })
}

function editToDoElement(todoElement, toDoTitle, dueDate) {
    const titleElement = todoElement.querySelector(".title-span");
    const dueDateElement = todoElement.querySelector(".due-date-span");

    titleElement.textContent = toDoTitle;
    dueDateElement.textContent = dueDate;

    editAttributeInLocalStorage(todoElement, "title", toDoTitle);
    editAttributeInLocalStorage(todoElement, "dueDate", dueDate)
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