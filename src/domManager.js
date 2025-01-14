const domManager = {
    dialog : document.querySelector("#add"),
    addBtn : document.querySelector("#addBtn"),
    cancelBtn : document.querySelector("#cancelBtn"),
    form : document.querySelector("#addTodo"),
    content : document.querySelector("#content"),
    titleForm : document.querySelector("#title"),
    descriptionForm : document.querySelector("#description"),
    dueDateForm : document.querySelector("#dueDate"),
    priorityForm : document.querySelectorAll("input[name='priority']"),
    todoTab : document.querySelector("#todos"),
    todayTab : document.querySelector("#today"),
    weekTab : document.querySelector("#week"),
    projectTab : document.querySelector("#projects"),
    editBtns : document.querySelectorAll(".editIcon"),
    removeBtns : document.querySelectorAll(".removeIcon"),
    expand : document.querySelector("#expand"),
    titleExpand : document.querySelector("#titleExpand"),
    descriptionExpand : document.querySelector("#descriptionExpand"),
    dueDateExpand : document.querySelector("#dueDateExpand"),
    priorityExpand : document.querySelectorAll("input[name='priorityExpand']"),
    cancelBtnExpand : document.querySelector("#cancelBtnExpand"),
    saveBtnExpand : document.querySelector("#saveBtnExpand"),
    
}

export{domManager};