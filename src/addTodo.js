import { domManager } from "./domManager";
import {Todo} from "./todoClass";
function todoForm(){
    domManager.addBtn.addEventListener("click", () => {
        domManager.form.reset();
        domManager.dialog.showModal();
    });
    domManager.cancelBtn.addEventListener("click", () => {
        domManager.dialog.close()
    });
    domManager.form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTodo(createTodo());
    });
}

function createTodo(){
    let title = domManager.titleForm.value;
    let description = domManager.descriptionForm.value;
    let dueDate = domManager.dueDateForm.value;
    let priority = domManager.priorityForm.value;
    domManager.dialog.close();
    const todo = new Todo(title, description, dueDate, priority);
    return todo;
}

function addTodo(todo){
    const container = document.createElement("div");
    container.classList.add("todo");
    container.textContent = todo.title;
    domManager.content.appendChild(container);
}

export{todoForm};