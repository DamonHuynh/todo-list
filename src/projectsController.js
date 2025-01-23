import { combineFields } from "./addTodo";
import { domManager } from "./domManager";
import {  loadPages, updatePageTracker, projectIndex } from "./loadPages";
import { updateLocalStorageProjectNames, updateLocalStorageProjects } from "./localStorage";

let projects = [];
let projectsObj = [];
let projectNamesObj = [];

function showProjects(){
    domManager.projectTab.addEventListener("click", () =>{
        domManager.allProjects.classList.toggle("hidden");
    })
}

function addProjects(){
    domManager.addProject.addEventListener("click", () => {
        domManager.allProjects.classList.remove("hidden");
        const newProject = createProject();
        const todos = [];
        const todosObj = [];
        projects.push(todos);
        projectsObj.push(todosObj);
        createProjectRemoveBtn(newProject);
        const projectName = createProjectTitle("New Project");
        newProject.appendChild(projectName);
        projectNamesObj.push(projectName.textContent);
        updateLocalStorageProjectNames();
        updateLocalStorageProjects();
        showAllProjects(newProject);
    })
}

function showAllProjects(project){
    project.addEventListener("click", () =>{
        const index = findIndexInHTMLCollection(domManager.allProjects.children, project);
        loadPages().loadProject(index);
        switchProjectRemoveButtons();
    });
}

function createProject(){
    const newProject = document.createElement("div");
    newProject.classList.toggle("project");
    domManager.allProjects.appendChild(newProject);
    return newProject;
}

function createProjectTitle(title){
    const projectName = document.createElement("p");
    projectName.classList.add("projectName");
    projectName.textContent = title;
    return projectName;
}

function createProjectRemoveBtn(newProject){
    const removeBtn = document.createElement("p");
    removeBtn.classList.add("hidden");
    removeBtn.textContent = "X";
    newProject.appendChild(removeBtn);
    addProjectRemoveLogic(removeBtn);
}

function addToProject(index, todo){
    const nodeTodo = combineFields(todo);
    projectsObj[index].push(todo);
    updateLocalStorageProjects();
    projects[index].push(nodeTodo);
}

function addProjectRemoveLogic(removeBtn){
    removeBtn.addEventListener("click", (event) => {
        projects.splice(projectIndex, 1);
        projectNamesObj.splice(projectIndex, 1);
        projectsObj.splice(projectIndex, 1);
        removeBtn.parentNode.remove();
        updatePageTracker("todos");
        loadPages().home();
        updateLocalStorageProjects();
        updateLocalStorageProjectNames();
        event.stopPropagation();
    })
}

function switchProjectRemoveButtons(){
    const elements = domManager.allProjects.children;
    for (let i = 0; i < elements.length; i++){
        const removeBtn = elements[i].children[0];
        if (removeBtn.classList.contains("hidden") && i == projectIndex){
            removeBtn.classList.remove("hidden");
        }
        else{
            removeBtn.classList.add("hidden");
        }
    }
}

function editProjectTitle(){
    const title = domManager.content.children[0];
    title.addEventListener("input", (event) =>{
        if (event.target.textContent !== ""){
            projectNamesObj[projectIndex] = event.target.textContent;
            domManager.allProjects.children[projectIndex].children[1].textContent =  projectNamesObj[projectIndex];
            updateLocalStorageProjectNames();
        }
    });
}
function updateProjects(projectsArray){
    projects = projectsArray;
}
function updateProjectsObj(projectsArray, namesArray){
    projectsObj = structuredClone(projectsArray);
    projectNamesObj = structuredClone(namesArray);
}

function loadProjects(){
    for (let i = 0; i < projectNamesObj.length; i++){
        const project = createProject();
        const projectTitle = createProjectTitle(projectNamesObj[i]);
        createProjectRemoveBtn(project);
        project.appendChild(projectTitle);
        showAllProjects(project);
    }        
}

function findIndexInHTMLCollection(htmlCollection, element){
    const arr = [];
    for (let i = 0; i < htmlCollection.length; i++){
        arr.push(htmlCollection[i]);
    }
    return arr.indexOf(element);
}

export {loadProjects,showProjects, addProjects, addToProject, editProjectTitle, updateProjectsObj, updateProjects, projects, projectsObj, projectNamesObj};