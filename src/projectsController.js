import { combineFields } from "./addTodo";
import { domManager } from "./domManager";
import {  loadPages, updatePageTracker, projectIndex, pageTracker } from "./loadPages";

const projects = [];
const projectNames = [];
function loadProjects(){
    domManager.projectTab.addEventListener("click", () =>{
        domManager.allProjects.classList.toggle("hidden");
    })
}

function addProjects(){
    domManager.addProject.addEventListener("click", () => {
        domManager.allProjects.classList.remove("hidden");
        const newProject = document.createElement("div");
        const projectName = document.createElement("p");
        projectName.setAttribute("contenteditable", "true");
        newProject.appendChild(projectName);
        projectName.textContent = "New Project";
        projectNames.push(newProject);
        newProject.classList.toggle("project");
        domManager.allProjects.appendChild(newProject);
        const todos = [];
        projects.push(todos);
        const removeBtn = document.createElement("p");
        removeBtn.classList.add("hidden");
        removeBtn.textContent = "X";
        newProject.appendChild(removeBtn);
        addProjectRemoveLogic(removeBtn);
        newProject.addEventListener("click", () =>{
            let index = projects.indexOf(todos);
            loadPages().loadProject(todos, index);
            switchProjectRemoveButtons();
        });
    })
}

function addToProject(index, todo){
    const nodeTodo = combineFields(todo);
    projects[index].push(nodeTodo);

}

function addProjectRemoveLogic(removeBtn){
    removeBtn.addEventListener("click", (event) => {
        projects.splice(projectIndex, 1);
        projectNames.splice(projectIndex, 1);
        removeBtn.parentNode.remove();
        updatePageTracker("todos");
        event.stopPropagation();
    })
}

function switchProjectRemoveButtons(){
    const elements = domManager.allProjects.children;
    for (let i = 0; i < elements.length; i++){
        const removeBtn = elements[i].children[1];
        if (removeBtn.classList.contains("hidden") && i == projectIndex){
            removeBtn.classList.remove("hidden");
        }
        else{
            removeBtn.classList.add("hidden");
        }
    }
}
export {loadProjects, addProjects, addToProject, projects};