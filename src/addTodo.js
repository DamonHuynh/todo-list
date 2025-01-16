import {allTodos, organizeByDate, todayTodos, weekTodos} from "./organizeDate";
import calendar from "./icons/calendar.svg";
import remove from "./icons/remove.svg";
import { addEditLogic, addRemoveLogic } from "./todoController";
import { pageTracker, loadTodos, projectIndex} from "./loadPages";
import { readForm } from "./forms";
import { addToProject, projects } from "./projectsController";


const createTodo = function(){
    const addTitle = function(todo) {
        const container = document.createElement("div");
        const title = document.createElement("p");
        title.classList.toggle("title");
        title.textContent = todo.title;
        container.appendChild(title);
        container.classList.add("todo");
        return container;
    }
    const addDescription = function(todo){
        const description = document.createElement("p");
        description.textContent = todo.description;
        description.classList.toggle("hidden");
        return description;

    }
    const addDueDate = function(todo) {
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
    const addPriority = function(todo){
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
    const container = createTodo().addTitle(todo);
    const completeBtn = createTodo().addCompleteBtn();
    showPriority(todo.priority, completeBtn);
    container.appendChild(createTodo().addDescription(todo));
    container.appendChild(createTodo().addDueDate(todo));
    container.appendChild(createTodo().addPriority(todo));
    container.appendChild(completeBtn);
    container.appendChild(createTodo().addRemoveBtn());
    container.appendChild(createTodo().addExpandBtn());
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
    if (pageTracker == "project"){
        addToProject(projectIndex, todo);
        loadTodos(projects[projectIndex]);
    }
    else{
        organizeByDate(todo);
        if (pageTracker == "todos"){
            loadTodos(allTodos);
        }
        if (pageTracker == "today"){
            loadTodos(todayTodos);
        }
        if (pageTracker == "week"){
            loadTodos(weekTodos);
        }
    }
}

export{combineFields, addTodo, showPriority ,createTodo};