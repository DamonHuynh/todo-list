import { showPriority } from "./addTodo";
import { domManager } from "./domManager";
import { readRadioForm } from "./forms";
import { allTodos, todayTodos, weekTodos, allTodosObj, weekTodosObj, todayTodosObj, reorganizeTodos} from "./organizeDate";
import { projects } from "./projectsController";
import { projectIndex } from "./loadPages";
import { updateLocalStorage } from "./localStorage";

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
        expand(expandBtn);
    });
    domManager.cancelBtnExpand.addEventListener("click", (event) =>{
        event.preventDefault();
        domManager.expand.close();
    });
    domManager.saveBtnExpand.addEventListener("click", (event) =>{
        event.preventDefault();
        domManager.expand.close();
        edit(expandBtn);
    })
}

function edit(expandBtn){
    const elements = expandBtn.parentNode.children;
    elements[0].textContent = domManager.titleExpand.value;
    elements[1].textContent = domManager.descriptionExpand.value;
    /*replace all - with / so the date will be interpreted in local time */
    elements[2].textContent = domManager.dueDateExpand.value.replaceAll("-", "/");
    const radios = domManager.priorityExpand;
    const priority = readRadioForm(radios);
    elements[3].textContent = priority;
    //elements[4] is the complete button
    showPriority(priority, elements[4]);
    reorganizeTodos();
    updateLocalStorage();
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
    const index = todos.indexOf(removedTodo);
    if (index !== -1){
        todos.splice(index, 1);
    }    
}

function cleanAllArrays(todo){
    cleanArray(todo, allTodos, allTodosObj);
    cleanArray(todo, todayTodos,todayTodosObj);
    cleanArray(todo, weekTodos,weekTodosObj);
}

export {addRemoveLogic, addEditLogic, cleanArray};
