const domManager = {
    dialog : document.querySelector("dialog"),
    addBtn : document.querySelector("#addBtn"),
    cancelBtn : document.querySelector("#cancelBtn"),
    form : document.querySelector("#todo"),
    content : document.querySelector("#content"),
    titleForm : document.querySelector("#title"),
    descriptionForm : document.querySelector("#description"),
    dueDateForm : document.querySelector("#dueDate"),
    priorityForm : document.querySelector("#priority"),
    todoTab : document.querySelector("#todos"),
    todayTab : document.querySelector("#today"),
    weekTab : document.querySelector("#week"),
    projectTab : document.querySelector("#projects"),
    editBtns : document.querySelectorAll(".editIcon"),
    removeBtns : document.querySelectorAll(".removeIcon")
}

export{domManager};