let character = {
    "btn":document.getElementById("character"),
    "page":document.getElementById("character_page")
}

let tasks = {
    "btn": document.getElementById("tasks"),
    "page": document.getElementById("task_page")
}

function init(){
    go_character();
}

function go_tasks(){
    tasks.page.style.display = "block";
    tasks.btn.style.display = "none";
    character.page.style.display = "none";
    character.btn.style.display = "inline";
}
function go_character(){
    tasks.page.style.display = "none";
    tasks.btn.style.display = "inline";
    character.page.style.display = "block";
    character.btn.style.display = "none";
}

init();