import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

const loadPages = function() {
    const todos = function() {
        domManager.todoTab.addEventListener("click", () => {
            removeTodos();
            loadTodos(allTodos);
            console.log("meow1");
        });
    }
    const today = function(){
        domManager.todayTab.addEventListener("click", () => {
            removeTodos();
            loadTodos(todayTodos);
            console.log("meow2");
        });
    }
    const week = function(){
        domManager.weekTab.addEventListener("click", () => {
            removeTodos();
            loadTodos(weekTodos);
            console.log("meow3");
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
    if (all[0] !== null){
        all.forEach((node) => {
            domManager.content.removeChild(node);
        })
    }
}

function loadAllPages(){
    loadPages().todos();
    loadPages().today();
    loadPages().week();
}

export{loadAllPages};