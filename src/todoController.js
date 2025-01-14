import { domManager } from "./domManager";
import { allTodos, todayTodos, weekTodos} from "./organizeDate";

function addRemoveLogic(removeBtnContainer){
    removeBtnContainer.addEventListener("click", () =>{
        const todo = removeBtnContainer.parentNode;
        cleanArrays(todo, allTodos);
        cleanArrays(todo, todayTodos);
        cleanArrays(todo, weekTodos);
        todo.remove();
    })
}
function cleanArrays(todo, todoArray){
    let index = todoArray.indexOf(todo);
    if (index !== -1){
        todoArray.splice(index, 1);
    }
}




export {addRemoveLogic};
