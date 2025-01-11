import { domManager } from "./domManager";
import {Todo} from "./todoClass";
function addTodo(){
    domManager.addBtn.addEventListener("click", () => {
        domManager.form.reset();
        domManager.dialog.showModal();
    });
    domManager.cancelBtn.addEventListener("click", () => {
        domManager.dialog.close()
    });
}

function createTodo(){
    let todo;
    domManager.form.addEventListener("submit", (event) => {
        event.preventDefault();
        let title = titleForm.value;
        let description = descriptionForm.value;
        let dueDate = dueDateForm.value;
        let priority = priorityForm.value;
        domManager.dialog.close();
        todo = new Todo(title, description, dueDate, priority);
    });
    return todo;
}


export{addTodo, createTodo};