import {allTodos, organizeByDate, todayTodos, weekTodos} from "./organizeDate";
import calendar from "./icons/calendar.svg";
import remove from "./icons/remove.svg";
import { addEditLogic, addRemoveLogic } from "./todoController";
import { loadPages, loadTodos } from "./loadPages";
import { readForm } from "./forms";
import { domManager } from "./domManager";

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
        description.classList.toggle("hidden");
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
    const addPriority = function(completeBtn){
        const priority = document.createElement("div");
        priority.textContent = todo.priority;
        priority.classList.toggle("hidden");
        return priority;
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
        addEditLogic(expandBtn);
        expandBtn.classList.toggle("expandBtn");
        return expandBtn
    }
    return {addTitle, addDescription, addDueDate, addPriority, addCompleteBtn, addRemoveBtn, addExpandBtn};
}

function combineFields(todo){
    const container = createTodo(todo).addTitle();
    const completeBtn = createTodo(todo).addCompleteBtn();
    showPriority(todo.priority, completeBtn);
    container.appendChild(createTodo(todo).addDescription());
    container.appendChild(createTodo(todo).addDueDate());
    container.appendChild(createTodo(todo).addPriority());
    container.appendChild(completeBtn);
    container.appendChild(createTodo(todo).addRemoveBtn());
    container.appendChild(createTodo(todo).addExpandBtn());
    return container;
}

function showPriority(priority, completeBtn){
    if(priority == 1){
        completeBtn.classList.add("priority1");
        completeBtn.classList.remove("priority2");
        completeBtn.classList.remove("priority3");
    }
    if(priority == 2){
        completeBtn.classList.remove("priority1");
        completeBtn.classList.add("priority2");
        completeBtn.classList.remove("priority3");    }
    if(priority == 3){
        completeBtn.classList.remove("priority1");
        completeBtn.classList.remove("priority2");
        completeBtn.classList.add("priority3");    }
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

export{combineFields, addTodo, showPriority};