import {differenceInCalendarDays} from "date-fns";
import { combineFields } from "./addTodo";
import { cleanArray } from "./todoController";
import { updateLocalStorage } from "./localStorage";

let allTodos = [];
let todayTodos = [];
let weekTodos = [];
let allTodosObj = [];
let todayTodosObj = [];
let weekTodosObj = [];


function organizeByDate(todo, nodeTodo){
    const difference = getDifference(todo.dueDate);
    if (difference == 0){
        todayTodos.push(nodeTodo);
        todayTodosObj.push(todo);
    }
    if (difference < 7){
        weekTodos.push(nodeTodo);
        weekTodosObj.push(todo);
    }
    updateLocalStorage();
}

function getDifference(dueDateString){
    const currentDate = normalizeDate(new Date());
    const dueDate = new Date(dueDateString);
    const difference = differenceInCalendarDays(dueDate, currentDate);
    return difference;
}

function normalizeDate(date){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

function reorganizeTodos(){
    for (let i = 0; i < allTodos.length; i++){
        const element = allTodos[i]
        const dateElement = element.children[2]
        const dueDateString = dateElement.textContent;
        const difference = getDifference(dueDateString);
        if (difference < 7 && weekTodos.indexOf(element) == -1){
            weekTodos.push(element);
        }
        if (difference == 0 && todayTodos.indexOf(element) == -1){
            cleanArray(element, todayTodos, todayTodosObj);
            break;
        }
    }

    for (let i = 0; i < todayTodos.length; i++){
        const element = todayTodos[i]
        const dateElement = element.children[2]
        const dueDateString = dateElement.textContent;
        const difference = getDifference(dueDateString);
        if (difference < 7 && weekTodos.indexOf(element) == -1){
            weekTodos.push(element);
        }
        if (difference !== 0){
            cleanArray(element, todayTodos, todayTodosObj);
            break;
        }
    }
 
    for (let i = 0; i < weekTodos.length; i++){
        const element = weekTodos[i]
        const dateElement = element.children[2]
        const dueDateString = dateElement.textContent;
        const difference = getDifference(dueDateString);
        if (difference == 0 && todayTodos.indexOf(element) == -1){
            todayTodos.push(element)
        }
        if (!(difference < 7)){
            cleanArray(element, weekTodos, weekTodosObj);
            break;
        }
    }
}

function updateAllTodos(allTodosArr){
    allTodos = allTodosArr;
    for (let i = 0; i < allTodos.length; i++){
        organizeByDate(allTodosObj[i], allTodos[i]);
    }
}
function updateAllTodosObj(allTodosArr){
    allTodosObj = structuredClone(allTodosArr);
}


export{organizeByDate, reorganizeTodos,allTodos, todayTodos, weekTodos ,allTodosObj, todayTodosObj, weekTodosObj, updateAllTodos,updateAllTodosObj};

