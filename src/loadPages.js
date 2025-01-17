import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";
import { addProjects, editProjectTitle, loadProjects, projectNames } from "./projectsController";

let pageTracker = "todos";
let projectIndex = 0;
const loadPages = function() {
    const todos = function() {
        domManager.todoTab.addEventListener("click", () => {
            home();
        });
    }
    const home = function(){
        clearPage();
        updatePageTracker("todos");
        displayPageTitle("All Todos");
        loadTodos(allTodos);
    }
    const today = function(){
        domManager.todayTab.addEventListener("click", () => {
            clearPage();
            updatePageTracker("today");
            displayPageTitle("Due Today");
            loadTodos(todayTodos);
        });
    }
    const week = function(){
        domManager.weekTab.addEventListener("click", () => {
            clearPage();
            updatePageTracker("week");
            displayPageTitle("Due this week");
            loadTodos(weekTodos);
        });
    }

    const loadProject = function(todos, index){
        clearPage();
        projectIndex = index;
        updatePageTracker("project");
        displayPageTitle(projectNames[index].textContent);
        editProjectTitle();
        loadTodos(todos);
    }

    return {todos, today, week, loadProject, home};
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

function displayPageTitle(title){
    const header = document.createElement("h1");
    header.textContent = title;
    domManager.content.appendChild(header);
    if (pageTracker == "project"){
        header.setAttribute("contenteditable", "true");
    }
}

function loadAllPages(){
    loadPages().todos();
    loadPages().today();
    loadPages().week();
    loadProjects();
    addProjects();
}

export{loadAllPages, loadPages, loadTodos, clearPage,updatePageTracker, pageTracker,projectIndex};