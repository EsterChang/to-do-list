export function createToDoElement(projectId, todoId, title, dueDate, buildFromStorage=false) {
    const projectElement = document.querySelector(`.project[data-project-id="${projectId}"]`);

    const todoElement = document.createElement("div");
    todoElement.className = "todo";
    todoElement.dataset.todoId = todoId;

    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("class", "todo-checkbox");
    todoElement.appendChild(checkboxInput);

    const textSpan = document.createElement("span");
    textSpan.textContent = `${title}, due by: ${dueDate}`;
    todoElement.appendChild(textSpan);

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    todoElement.appendChild(editButton);
    todoElement.appendChild(deleteButton);

    projectElement.appendChild(todoElement);

    if (!buildFromStorage) {
        const projectsArray = JSON.parse(localStorage.getItem("projects")) || [];
        const projectObj = projectsArray.find(project => project.id === projectId);
        projectObj.todos.push({todoId: `${todoId}`, title: title, dueDate: dueDate});
        localStorage.setItem("projects", JSON.stringify(projectsArray));
    }

}
