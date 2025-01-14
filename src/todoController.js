import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

function addRemoveLogic(removeBtnContainer){
    removeBtnContainer.addEventListener("click", () =>{
        const todo = removeBtnContainer.parentNode;
        cleanAllArrays(todo);
        todo.remove();
    })
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




export {addRemoveLogic};
