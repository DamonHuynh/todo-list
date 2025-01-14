import {differenceInCalendarDays} from "date-fns";
import { combineFields } from "./addTodo";
import { cleanArray } from "./todoController";

const allTodos = [];
const todayTodos = [];
const weekTodos = [];

function organizeByDate(todo){
    const difference = getDifference(todo.dueDate);
    const nodeTodo = combineFields(todo);
    allTodos.push(nodeTodo);
    if (difference == 0){
        todayTodos.push(nodeTodo);
    }
    if (difference < 7){
        weekTodos.push(nodeTodo);
    }
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
        if (difference < 7 & weekTodos.indexOf(element) == -1){
            weekTodos.push(element);
        }
        if (difference == 0 ){
            cleanArray(element, todayTodos);
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
        if (difference == 0 && todayTodos.indexOf(element) == -1){
            todayTodos.push(element)
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
            cleanArray(element, weekTodos);
            break;
        }
    }
}

export{organizeByDate, reorganizeTodos,allTodos, todayTodos, weekTodos};

