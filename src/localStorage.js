import { combineFields } from "./addTodo";
import { todoForm } from "./forms";
import { loadAllPages, loadPages } from "./loadPages";
import { allTodosObj, weekTodosObj, todayTodosObj, updateAllTodos, updateAllTodosObj } from "./organizeDate";
import { loadProjects, projectNamesObj, projectsObj, updateProjects, updateProjectsObj } from "./projectsController";

function updateLocalStorage(){
    localStorage.setItem("allTodos", JSON.stringify(allTodosObj));
    localStorage.setItem("todayTodos", JSON.stringify(todayTodosObj));
    localStorage.setItem("weekTodos", JSON.stringify(weekTodosObj));
}

function updateLocalStorageProjects(){
    localStorage.setItem("projects", JSON.stringify(projectsObj));
}

function updateLocalStorageProjectNames(){
    localStorage.setItem("projectNames", JSON.stringify(projectNamesObj));
}

function loadLocalStorage(){
   const localStorageAll = JSON.parse(localStorage.getItem("allTodos"));
   const localStorageToday = JSON.parse(localStorage.getItem("todayTodos"));
   const localStorageWeek = JSON.parse(localStorage.getItem("weekTodos"));
   const localStorageProjects = JSON.parse(localStorage.getItem("projects"));
   const localStorageProjectNames = JSON.parse(localStorage.getItem("projectNames"));
   updateAllTodosObj(localStorageAll, localStorageToday, localStorageWeek);
   updateProjectsObj(localStorageProjects, localStorageProjectNames);
   convertToNodes(localStorageAll);
   convertToNodesProjects(localStorageProjects);
   updateAllTodos(localStorageAll);
   updateProjects(localStorageProjects);
   todoForm();
   loadAllPages();
   loadProjects();
   loadPages().home();
}

function convertToNodes(todoArray){
    for (let i = 0; i < todoArray.length; i++){
        todoArray[i] = combineFields(todoArray[i]);
    }
}
function convertToNodesProjects(todoArray){
    for (let i = 0; i < todoArray.length; i++){
        let innerArray = todoArray[i];
        for (let x = 0; x < innerArray.length; x++){
            innerArray[x] = combineFields(innerArray[x]);
        }
    }
}

export{loadLocalStorage, updateLocalStorage, updateLocalStorageProjects, updateLocalStorageProjectNames}