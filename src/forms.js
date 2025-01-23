import { domManager } from "./domManager";
import { Todo } from "./todoClass";
import { addTodo } from "./addTodo";
import { editLogic } from "./todoController";
function todoForm(){
    //sets earliest possible date to today
    domManager.dueDateForm.setAttribute('min', createCurrentDateString());
    domManager.addBtn.addEventListener("click", () => {
        domManager.form.reset();
        domManager.dialog.showModal();
    });
    domManager.cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        domManager.dialog.close()
    });
    domManager.form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTodo();
    });
    editLogic();
}

function createCurrentDateString(){
    const date = new Date().toLocaleDateString().split("/");
    if (date[0].length == 1){
        date[0] = "0" + date[0];
    }
    return date[2] + "-" + date[0] + "-" + date[1];
}

function readForm(){
    let title = domManager.titleForm.value;
    let description = domManager.descriptionForm.value;
    /*replace all - with / so the date will be interpreted in local time */
    let dueDate = domManager.dueDateForm.value.replaceAll("-","/");
    let priority = readRadioForm(domManager.priorityForm);
    domManager.dialog.close();
    const todo = new Todo(title, description, dueDate, priority);
    return todo;
}

function readRadioForm(radios){
    let value = 0;
    for (let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            value = radios[i].value;
        }
    }
    return value;
}

export{todoForm, readForm, readRadioForm, createCurrentDateString};