import { combineFields } from "./addTodo";
import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

const loadPages = function() {
    let pageTracker = "todos";
    const todos = function() {
        domManager.todoTab.addEventListener("click", () => {
            clearPage();
            loadTodos(allTodos);
            pageTracker = "todos";
        });
    }
    const today = function(){
        domManager.todayTab.addEventListener("click", () => {
            clearPage();
            loadTodos(todayTodos);
            pageTracker = "today";
        });
    }
    const week = function(){
        domManager.weekTab.addEventListener("click", () => {
            clearPage();
            loadTodos(weekTodos);
            pageTracker = "week"
        });
    }
    return {todos, today, week, pageTracker};
}

function loadTodos(todos){
    todos.forEach((todo) => {
        domManager.content.appendChild(todo);
    });
}

function clearPage(){
    const all = domManager.content.childNodes;
    for (let i = all.length - 1; i >= 0; i--) {
        domManager.content.removeChild(all[i]);
      }

}

function loadAllPages(){
    loadPages().todos();
    loadPages().today();
    loadPages().week();
}

export{loadAllPages, loadPages, loadTodos};