import "./CSS/style.css";
import { todoForm } from "./forms.js";
import {loadAllPages, loadPages} from "./loadPages";
import { loadLocalStorage, updateLocalStorage, updateLocalStorageProjectNames, updateLocalStorageProjects } from "./localStorage.js";

if (!JSON.parse(localStorage.getItem("allTodos")) && !JSON.parse(localStorage.getItem("projectNames"))) {
    todoForm();
    loadAllPages();
    loadPages().home();
    updateLocalStorage();
    updateLocalStorageProjectNames();
    updateLocalStorageProjects();
    
} 
else {
    loadLocalStorage();
}

 