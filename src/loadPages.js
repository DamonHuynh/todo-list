import { combineFields } from "./addTodo";
import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

const loadPages = function() {
    const todos = function() {
        domManager.todoTab.addEventListener("click", () => {
            clearPage();
            loadTodos(allTodos);
        });
    }
    const today = function(){
        domManager.todayTab.addEventListener("click", () => {
            clearPage();
            loadTodos(todayTodos);
        });
    }
    const week = function(){
        domManager.weekTab.addEventListener("click", () => {
            clearPage();
            loadTodos(weekTodos);
        });
    }
    return {todos, today, week};
}

function loadTodos(todos){
    todos.forEach((todo) => {
        domManager.content.appendChild(combineFields(todo));
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

export{loadAllPages};