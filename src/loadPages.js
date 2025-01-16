import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";
import { addProjects, loadProjects } from "./projectsController";

let pageTracker = "todos";
let projectIndex = 0;
const loadPages = function() {
    const todos = function() {
        domManager.todoTab.addEventListener("click", () => {
            clearPage();
            loadTodos(allTodos);
            updatePageTracker("todos");
        });
    }
    const today = function(){
        domManager.todayTab.addEventListener("click", () => {
            clearPage();
            loadTodos(todayTodos);
            updatePageTracker("today");
        });
    }
    const week = function(){
        domManager.weekTab.addEventListener("click", () => {
            clearPage();
            loadTodos(weekTodos);
            updatePageTracker("week");
        });
    }

    const loadProject = function(todos, index){
        clearPage();
        loadTodos(todos);
        projectIndex = index;
        updatePageTracker("project");
    }

    return {todos, today, week, loadProject};
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

function updatePageTracker(update){
    pageTracker = update;
}

function loadAllPages(){
    loadPages().todos();
    loadPages().today();
    loadPages().week();
    loadProjects();
    addProjects();
}

export{loadAllPages, loadPages, loadTodos, clearPage,updatePageTracker, pageTracker,projectIndex};