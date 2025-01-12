import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

const loadPages = function() {
    const todos = function() {
        domManager.todoTab.addEventListener("click", () => {
            removeTodos();
            loadTodos(allTodos);
        });
    }
    const today = function(){
        domManager.todayTab.addEventListener("click", () => {
            removeTodos();
            loadTodos(todayTodos);
        });
    }
    const week = function(){
        domManager.weekTab.addEventListener("click", () => {
            removeTodos();
            loadTodos(weekTodos);
        });
    }
    return {todos, today, week};
}

function loadTodos(todos){
    todos.forEach((todo) => {
        domManager.content.appendChild(todo);
    });
}

function removeTodos(){
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