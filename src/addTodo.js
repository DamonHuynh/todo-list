import {domManager } from "./domManager";
import {Todo} from "./todoClass";
import {allTodos, organizeByDate, todayTodos, weekTodos} from "./organizeDate";
import calendar from "./icons/calendar.svg";
import remove from "./icons/remove.svg";
import { addExpandLogic, addRemoveLogic } from "./todoController";
import { loadPages, loadTodos } from "./loadPages";

function todoForm(){
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
}

function readForm(){
    let title = domManager.titleForm.value;
    let description = domManager.descriptionForm.value;
    /*replace all - with / so the date will be interpreted in local time */
    let dueDate = domManager.dueDateForm.value.replaceAll("-","/");
    let priority = domManager.priorityForm.value;
    domManager.dialog.close();
    const todo = new Todo(title, description, dueDate, priority);
    return todo;
}

const createTodo = function(todo){
    const addTitle = function() {
        const container = document.createElement("div");
        const title = document.createElement("p");
        title.classList.toggle("title");
        title.textContent = todo.title;
        container.appendChild(title);
        container.classList.add("todo");
        return container;
    }
    const addDescription = function(){
        const description = document.createElement("p");
        description.textContent = todo.description;
        description.classList.toggle("description");
        return description;

    }
    const addDueDate = function() {
        const date = document.createElement("div");
        date.classList.toggle("date");
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
    const addCompleteBtn = function(){
        const complete = document.createElement("div");
        addRemoveLogic(complete);
        complete.classList.toggle("completeBtn");
        return complete;
    }
    const addRemoveBtn = function(){
        const removeContainer = document.createElement("div");
        removeContainer.classList.toggle("removeBtn");
        addRemoveLogic(removeContainer);
        const removeIcon = document.createElement("img");
        removeIcon.src = remove;
        removeContainer.appendChild(removeIcon);
        removeIcon.classList.toggle("removeIcon");
        return removeContainer;
    }
    const addExpandBtn = function(){
        const expandBtn = document.createElement("div");
        addExpandLogic(expandBtn);
        expandBtn.classList.toggle("expandBtn");
        return expandBtn
    }
    return {addTitle, addDescription, addDueDate, addCompleteBtn, addRemoveBtn, addExpandBtn};
}

function combineFields(todo){
    const container = createTodo(todo).addTitle();
    container.appendChild(createTodo(todo).addDescription());
    container.appendChild(createTodo(todo).addDueDate());
    container.appendChild(createTodo(todo).addCompleteBtn());
    container.appendChild(createTodo(todo).addRemoveBtn());
    container.appendChild(createTodo(todo).addExpandBtn());
    
    return container;
}

function addTodo(){
    const todo = readForm();
    organizeByDate(todo);
    if (loadPages().pageTracker == "todos"){
        loadTodos(allTodos);
    }
    if (loadPages().pageTracker == "today"){
        loadTodos(todayTodos);
    }
    if (loadPages().pageTracker == "week"){
        loadTodos(weekTodos);
    }
}

export{todoForm, combineFields};