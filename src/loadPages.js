import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

function loadTodos(todos){
    todos.array.forEach((todo) => {
        domManager.content.appendChild(todo);
    });
}

const loadPages = function() {
    const todos = function(){
        domManager.todoTab.addEventListener(() => {
            loadTodos(allTodos);
        });
    }
    const today = function(){
        domManager.todayTab.addEventListener(() => {
            loadTodos(todayTodos);
        });
    }
    const week = function(){
        domManager.weekTab.addEventListener(() => {
            loadTodos(weekTodos);
        });
    }
    return {todos, today, week};
}