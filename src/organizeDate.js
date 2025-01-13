import {differenceInCalendarDays} from "date-fns";
import { combineFields } from "./addTodo";


const allTodos = [];
const todayTodos = [];
const weekTodos = [];

function organizeByDate(todo){
    const difference = getDifference(todo);
    const nodeTodo = combineFields(todo);
    allTodos.push(nodeTodo);
    if (difference == 0){
        todayTodos.push(nodeTodo);
    }
    if (difference < 7){
        weekTodos.push(nodeTodo);
    }
}

function getDifference(todo){
    const currentDate = normalizeDate(new Date());
    const dueDate = new Date(todo.dueDate);
    const difference = differenceInCalendarDays(dueDate, currentDate);
    return difference;
}

function normalizeDate(date){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

export{organizeByDate, allTodos, todayTodos, weekTodos};

