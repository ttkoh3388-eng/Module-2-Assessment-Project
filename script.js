// DOMContentLoaded is an event that happens automatically when all the HTML elements have been created
// in other words, when the event happens, the webpage is ready
document.addEventListener("DOMContentLoaded", async function () {
    tasks = await loadTasks();
    // the tasks array is from data.js global scope

    displayTasks(tasks);


    const addTodoButton = document.querySelector("#addTodo");
    addTodoButton.addEventListener("click", function () {
        const name = document.querySelector("#name").value;
        const entryDate = document.querySelector("#entryDate").value;
        const categorization = document.querySelector("#categorization").value;
        console.log(name, entryDate, categorization);
        addTask(tasks, name, entryDate, categorization);
        saveTasks(tasks);

        displayTasks(tasks);

    })

})

function displayTasks(tasks) {
    // select the task list to append child into later
    const taskListUl = document.querySelector("#taskList");

    // remove all the existing tasks
    taskListUl.innerText = "";


    for (let t of tasks) {
        const liElement = document.createElement("li");
        liElement.className = "list-group-item";
        // alternatively:
        // liElement.classList.add('list-group-item');
        // liElement.classList.add('d-flex');
        // liElement.classList.add('justify-content-between');
        console.log("t of the inside task loop ", t);
        liElement.innerHTML = `
        <div class="row">
            <div class="col-6">${t.name}</div>
            <div class="col">Entry Date: ${t.entryDate}</div>
            <div class="col">Categorization: ${t.categorization}</div>
            <div class="col">
                <button class = 'update-btn'>Update</button>
                <button class = 'delete-btn'>Delete</button>
            </div>
        </div>
        `
    

        // retrieve the delete button inside liElement
        const deleteBtn = liElement.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function () {
            deleteTask(tasks, t.id);
            saveTasks(tasks);
            displayTasks(tasks);
        })

         const updateBtn = liElement.querySelector(".update-btn");
        //v2: Using SweetAlert
        updateBtn.addEventListener("click", function () {
            Swal.fire ({
                "title": `Update task: ${t.name}`,
                "html": `
                    <div>
                        <div class="m-2">
                            <label>Task Name</label>
                            <input type="text" id="newName" class="form-control" value="${t.name}" />
                        </div>
                        <div class="m-2">
                            <label>Entry Date</label>
                            <input type="date" id="newEntryDate" class="form-control" value="${t.entryDate}"/>
                        </div>
                        <div class="m-2">
                            <label>Categorization</label>
                            <select id="newCategorization" class="form-control">
                                <option value="Beverages" ${t.categorization == "Beverages" ? "selected" : ""}>Beverages</option>
                                <option value="Ready-To-Eat" ${t.categorization == "Ready-To-Eat" ? "selected" : ""}>Ready-To-Eat</option>
                                <option value="Snacks" ${t.categorization == "Snacks" ? "selected" : ""}>Snacks</option>
                                <option value="Fresh Food" ${t.categorization == "Fresh Food" ? "selected" : ""}>Fresh Food</option>
                                <option value="Tobacco" ${t.categorization == "Tobacco" ? "selected" : ""}>Tobacco</option>
                            </select>
                        </div>
                    </div>
                                    `,
                showCancelButton: true,
                showCloseButton: true,
                preConfirm: function () {
                    let newTaskName = document.querySelector("#newName").value;
                    let newEntryDate = document.querySelector("#newEntryDate").value;
                    let newCategorization = document.querySelector("#newCategorization").value;

                    updateTask(tasks, t.id, newTaskName, newEntryDate, newCategorization);
                    saveTasks(tasks);
                    displayTasks(tasks);
                }
            });
        })
    
    taskListUl.appendChild(liElement);
    
    }
}