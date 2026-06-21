let todoList = [];

function addingTask() {
    let inputField = document.getElementById("task-input");
    let newTask = inputField.value;

    if (newTask === "") {
        alert("Add Task First!!");
        return;
    };

    todoList.push(newTask);
    inputField.value = "";
    showList();

}

function showList() {
    let deliveryBox = document.getElementById("list-container");
    let finalHTML = "";
    for (let i = 0; i < todoList.length; i++) {
        finalHTML = finalHTML + `
        <p>
         ${todoList[i]}
        <button onclick = "editTask(${i})" >Edit</button>
        <button onclick = "deleteTask(${i})" style= "background-color:red;" >Delete</button>
        </p>
        `


    }
    deliveryBox.innerHTML = finalHTML;
}

function deleteTask(index) {
    todoList.splice(index, 1);
    showList()

}
function editTask(index) {
    let updateTask = prompt("update your task", todoList[index]);
    if (updateTask !== null && updateTask !== "") {
        todoList[index] = updateTask;
        showList();
    }
}