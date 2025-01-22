import { showPriority } from "./addTodo";
import { domManager } from "./domManager";
import { readRadioForm } from "./forms";
import { allTodos, todayTodos, weekTodos, allTodosObj, weekTodosObj, todayTodosObj, reorganizeTodos} from "./organizeDate";
import { projects, projectsObj } from "./projectsController";
import { pageTracker, projectIndex } from "./loadPages";
import { updateLocalStorage, updateLocalStorageProjects } from "./localStorage";

let lastExpandClicked;

function addRemoveLogic(removeBtnContainer){
    removeBtnContainer.addEventListener("click", () =>{
        const todo = removeBtnContainer.parentNode;
        cleanAllArrays(todo);
        cleanProjectsArray(todo);
        todo.remove();
    })
}

function addEditLogic(expandBtn){
    expandBtn.addEventListener("click", ()=>{
        domManager.expand.showModal();
        lastExpandClicked = expandBtn;
        expand(expandBtn);
    });
}

function editLogic(){
    domManager.cancelBtnExpand.addEventListener("click", (event) =>{
        event.preventDefault();
        domManager.expand.close();
    });
    domManager.saveBtnExpand.addEventListener("click", (event) =>{
        event.preventDefault();
        domManager.expand.close();
        edit();
})
}

function edit(){
    const elements = lastExpandClicked.parentNode.children;
    const title = domManager.titleExpand.value;
    elements[0].textContent = title;
    const description = domManager.descriptionExpand.value;
    elements[1].textContent = description;
    const dueDate = domManager.dueDateExpand.value.replaceAll("-", "/");
    elements[2].textContent = dueDate;
    const radios = domManager.priorityExpand;
    const priority = readRadioForm(radios);
    elements[3].textContent = priority;
    //elements[4] is the complete button
    showPriority(priority, elements[4]);
    reorganizeTodos();
    updateEditedObj(title, description, dueDate, priority, lastExpandClicked.parentNode);
    updateLocalStorage();
    updateLocalStorageProjects();
}

function updateEditedObj(title, description, dueDate, priority, element){
    if (pageTracker !== "project"){
        const index = allTodos.indexOf(element);
        const todo = allTodosObj[index];
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
    }
    else{
        let index = -1;
        projects.forEach((project) => {
            let projectIndex = project.indexOf(element)
            if(projectIndex !== -1){
                index = project.indexOf(element);
            }
        });
        const project = projectsObj[index];
        project.title = title;
        project.description = description;
        project.dueDate = dueDate;
        project.priority = priority;
    }
}

function expand(expandBtn){
    const elements = expandBtn.parentNode.children;
    domManager.titleExpand.value = elements[0].textContent;
    domManager.descriptionExpand.value = elements[1].textContent;
    //Need to use - instead of / for date formatting
    domManager.dueDateExpand.value = elements[2].textContent.replaceAll("/","-");
    const priority = elements[3].textContent;
    const radios = domManager.priorityExpand;
    checkRadio(radios, priority);
}

function checkRadio(radios, priority){
    for (let i = 0; i < radios.length; i++){
        if (radios[i].value == priority){
            radios[i].checked = true;
            break;
        }
    }
}

function cleanArray(todo, todoArray, objArray){
    let index = todoArray.indexOf(todo);
    if (index !== -1){
        todoArray.splice(index, 1);
        objArray.splice(index, 1);
        updateLocalStorage();
    }
}

function cleanProjectsArray(removedTodo){
    if(projects.length == 0){
        return;
    }
    const todos =  projects[projectIndex];
    const todosObj = projectsObj[projectIndex];
    const index = todos.indexOf(removedTodo);
    if (index !== -1){
        todos.splice(index, 1);
        todosObj.splice(index, 1);
        updateLocalStorageProjects();
    }    
}

function cleanAllArrays(todo){
    cleanArray(todo, allTodos, allTodosObj);
    cleanArray(todo, todayTodos,todayTodosObj);
    cleanArray(todo, weekTodos,weekTodosObj);
}

export {addRemoveLogic, addEditLogic, cleanArray, editLogic};
