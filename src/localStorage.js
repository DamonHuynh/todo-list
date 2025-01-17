import { combineFields } from "./addTodo";
import { todoForm } from "./forms";
import { loadAllPages, loadPages } from "./loadPages";
import { allTodosObj, weekTodosObj, todayTodosObj, updateAllTodos, updateAllTodosObj } from "./organizeDate";

function updateLocalStorage(){
    localStorage.setItem("allTodos", JSON.stringify(allTodosObj));
    localStorage.setItem("todayTodos", JSON.stringify(todayTodosObj));
    localStorage.setItem("weekTodos", JSON.stringify(weekTodosObj));
}

function loadLocalStorage(){
   const localStorageAll = JSON.parse(localStorage.getItem("allTodos"));
   const localStorageToday = JSON.parse(localStorage.getItem("todayTodos"));
   const localStorageWeek = JSON.parse(localStorage.getItem("weekTodos"));
   updateAllTodosObj(localStorageAll, localStorageToday, localStorageWeek);
   convertToNodes(localStorageAll);
   convertToNodes(localStorageToday);
   convertToNodes(localStorageWeek);
   updateAllTodos(localStorageAll, localStorageToday, localStorageWeek);
   console.log('noew');
   todoForm();
   loadAllPages();
   loadPages().home();
}

function convertToNodes(todoArray){
    for (let i = 0; i < todoArray.length; i++){
        todoArray[i] = combineFields(todoArray[i]);
    }
    console.log(todoArray);
}

export{loadLocalStorage, updateLocalStorage}