import {domManager } from "./domManager";
import {Todo} from "./todoClass";
import {organizeByDate} from "./organizeDate";
import calendar from "./icons/calendar.svg";
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
       createTodo(readForm()).addTodo();
    });
}

function readForm(){
    let title = domManager.titleForm.value;
    let description = domManager.descriptionForm.value;
    /*replace all - with / so the date will be interpreted in local time */
    let dueDate = domManager.dueDateForm.value.replaceAll("-","/");
    let priority = domManager.priorityForm.value;
    domManager.dialog.close();
    const todo = new Todo(title, description, dueDate, priority);
    organizeByDate(todo);
    return todo;
}

const createTodo = function(todo){
    const addTitle = function() {
        const container = document.createElement("div");
        container.textContent = todo.title;
        container.classList.add("todo");
        return container;
    }
    const addDescription = function(){
        const description = document.createElement("p");
        description.textContent = todo.description;
        return description;

    }
    const addDueDate = function() {
        const date = document.createElement("div");
        if (todo.dueDate !== ""){
            const calendarIcon = document.createElement("img");
            calendarIcon.src = calendar;
            calendarIcon.classList.toggle("calendarIcon");
            const dueDate = document.createElement("p");
            dueDate.textContent = todo.dueDate;
            date.appendChild(calendarIcon);
            date.appendChild(dueDate);
        }
        return date;
    }
    const addPriority = function(){
        //todo
    }
    const combineFields = function(){
        const container = addTitle();
        container.appendChild(addDescription());
        container.appendChild(addDueDate());
        return container;
    }
    const addTodo = function(){
        domManager.content.appendChild(combineFields());
    }
    return {addTodo};
}



export{todoForm};