import {differenceInCalendarDays} from "date-fns";

const allTodos = [];
const todayTodos = [];
const weekTodos = [];

function organizeByDate(todo){
    const difference = getDifference(todo);
    allTodos.push(todo);
    if (difference == 0){
        todayTodos.push(todo);
    }
    if (difference < 7){
        weekTodos.push(todo);
    }
    console.log(allTodos);
    console.log(todayTodos);
    console.log(weekTodos);
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

export{organizeByDate};

