let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    let newText = prompt("Edit Task", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div class="actions">
                <button onclick="toggleTask(${originalIndex})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>

                <button onclick="editTask(${originalIndex})">
                    Edit
                </button>

                <button onclick="deleteTask(${originalIndex})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

renderTasks();
