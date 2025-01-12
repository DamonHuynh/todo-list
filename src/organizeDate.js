import {differenceInCalendarDays} from "date-fns";
import { combineFields } from "./addTodo";


const allTodos = [];
const todayTodos = [];
const weekTodos = [];

function organizeByDate(todo){
    const difference = getDifference(todo);
     //used combineFields so todo becomes a node that can be added to the DOM
    allTodos.push(combineFields(todo));
    if (difference == 0){
        todayTodos.push(combineFields(todo));
    }
    if (difference < 7){
        weekTodos.push(combineFields(todo));
    }
}

function getDifference(todo){
    const currentDate = normalizeDate(new Date());
    const dueDate = new Date(todo.dueDate);
    const difference = differenceInCalendarDays(dueDate, currentDate);
    console.log(currentDate);
    console.log(dueDate);
    return difference;
}

function normalizeDate(date){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

export{organizeByDate, allTodos, todayTodos, weekTodos};

