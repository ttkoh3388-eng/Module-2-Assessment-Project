const JSONBIN_API_URL="https://api.jsonbin.io/v3";
const JSONBIN_ID="6a02be74adc21f119a893a10";
const MASTER_KEY="$2a$10$tADpYBk6l5kMdzst7EK57eS1uilsTE.vibtZXUZjM3e1bqEeDDzCq";

// use `let` so that we re-assign to it
let tasks = [
   
]

function addTask(tasks, newName, newEntryDate, newCategorization) {
    let newTask = {
        id: Math.floor(Math.random() * 10000) + 1,
        name: newName,
        entryDate: newEntryDate,
        categorization: newCategorization
    }
    tasks.push(newTask);
}

function deleteTask(tasks, idToDelete) {

    // goal: given id, find its index number
    let i = 0;
    let wantedIndex = -1;  // -1 does not found
    while (i < tasks.length) {

        if (tasks[i].id == idToDelete) {
            wantedIndex = i;
            break;
        }

        i = i + 1;
    }

    // if wantedIndex is not -1, then we have the found index to delete
    if (wantedIndex != -1) {
        tasks.splice(wantedIndex, 1);
    }
}

function updateTask(tasks, idToUpdate, newName, newEntryDate, newCategorization) {
    let modifiedTask = {
        id: idToUpdate,
        name: newName,
        entryDate: newEntryDate,
        categorization: newCategorization
    }

    let indexToUpdate = -1;
    let i = 0;
    while (i < tasks.length) {
        if (tasks[i].id == idToUpdate) {
            indexToUpdate = i;
            break;
        }
        i = i + 1;
    }

    if (indexToUpdate != -1) {
        tasks[indexToUpdate] = modifiedTask;
    }
}

async function loadTasks() {
console.log('test');
    const url = `${JSONBIN_API_URL}/b/${JSONBIN_ID}/latest`;
    //const url = "https://api.jsonbin.io/v3/b/6a02be74adc21f119a893a10/latest";
    console.log(url);
    const response = await axios.get(url);
    return response.data.record;
}

async function saveTasks(tasks) {
    const response = await axios.put(`${JSONBIN_API_URL}/b/${JSONBIN_ID}`, tasks, {
        headers: {
            "Content-Type":"application/json",
            "X-Master-Key": MASTER_KEY
        }
    })
    return response.data;
}