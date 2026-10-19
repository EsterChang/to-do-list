export function createToDoElement(projectId, title, dueDate) {
    const projectElement = document.querySelector(`[data-project-id="${projectId}"]`);
    console.log(`project elemnt: ${projectElement}`)

    const todoElement = document.createElement("div");
    todoElement.textContent = `${title}, due by: ${dueDate}`;
    projectElement.appendChild(todoElement);
}
