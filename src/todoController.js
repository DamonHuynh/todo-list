import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

function addRemoveLogic(removeBtnContainer){
    removeBtnContainer.addEventListener("click", () =>{
        const todo = removeBtnContainer.parentNode;
        cleanAllArrays(todo);
        todo.remove();
    })
}

function addExpandLogic(expandBtn){
    expandBtn.addEventListener("click", ()=>{
        domManager.expand.showModal();
        addEditLogic(expandBtn);
    })
}

function addEditLogic(expandBtn){
    const elements = expandBtn.parentNode.children;
    domManager.titleExpand.value = elements[0].textContent;
    domManager.descriptionExpand.value = elements[1].textContent;
    //Need to use - instead of / for date formatting
    domManager.dueDateExpand.value = elements[2].textContent.replaceAll("/","-");;
}


function cleanArray(todo, todoArray){
    let index = todoArray.indexOf(todo);
    if (index !== -1){
        todoArray.splice(index, 1);
    }
}

function cleanAllArrays(todo){
    cleanArray(todo, allTodos);
    cleanArray(todo, todayTodos);
    cleanArray(todo, weekTodos);
}




export {addRemoveLogic, addExpandLogic};
