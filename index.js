const todoRow = document.getElementById("todoRow");
const tittle = document.getElementById("tittle");
const content = document.getElementById("content");

function addTodo() {
    if (!tittle.value || !content.value) {
        alert("Title or content can't be empty");
    } else {
        const key = "todo_" + tittle.value;

        if (localStorage.getItem(key)) {
            alert("Todo with the same title already exists");
            return;
        }

        const todoCol = document.createElement("div");
        todoCol.className = "todoCol";
        todoCol.innerHTML = `<div>
            <h4>${tittle.value}</h4>
            <p>${content.value}</p>
        </div>`;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete <i class='fa fa-trash'></i>";
        deleteButton.addEventListener("click", () => {
            localStorage.removeItem(key);
            todoCol.remove();
        });

        const editButton = document.createElement("button");
        editButton.className = "edit";
        editButton.innerHTML = "Edit <i class='fa fa-edit'></i>";
        editButton.addEventListener("click", () => {
            editTodo(key);
        });

        todoCol.appendChild(deleteButton);
        todoCol.appendChild(editButton);
        todoRow.appendChild(todoCol);

        localStorage.setItem(key, JSON.stringify({ title: tittle.value, content: content.value }));

        tittle.value = "";
        content.value = "";
    }
}

function editTodo(key) {
    const todoData = JSON.parse(localStorage.getItem(key));

    let editTitle = prompt("Enter new Title: ", todoData.title);
    let editContent = prompt("Enter new Content: ", todoData.content);

    if (editTitle === null || editTitle === "" || editContent === null || editContent === "") {
        alert("Tittle and content can not be empty");
        editTodo(key);
        return;
    }

    todoData.title = editTitle;
    todoData.content = editContent;

    localStorage.setItem(key, JSON.stringify(todoData));

}


function loadTodos() {
    for (let key in localStorage) {
        if (key.startsWith("todo_")) {
            const todoData = JSON.parse(localStorage.getItem(key));
            const todoCol = document.createElement("div");
            todoCol.className = "todoCol";
            todoCol.innerHTML = `<div>
            <h4>${todoData.title}</h4>
            <p>${todoData.content}</p>
            </div>`;
            
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete <i class='fa fa-trash'></i>";
            deleteButton.addEventListener("click", () => {
                localStorage.removeItem(key);
                todoCol.remove();
            });
            
            const editButton = document.createElement("button");
            editButton.className = "edit";
            editButton.innerHTML = "Edit <i class='fa fa-edit'></i>";
            editButton.addEventListener("click", () => {
                editTodo(key);
            });

            todoCol.appendChild(deleteButton);
            todoCol.appendChild(editButton);
            todoRow.appendChild(todoCol);
        }
    }
}

loadTodos();
