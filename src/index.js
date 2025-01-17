import "./CSS/style.css";
import { todoForm } from "./forms.js";
import {loadAllPages, loadPages} from "./loadPages";
import { loadLocalStorage } from "./localStorage.js";

if (!JSON.parse(localStorage.getItem("allTodos"))) {
    todoForm();
    loadAllPages();
    loadPages().home();
} 
else {
    loadLocalStorage();
}

