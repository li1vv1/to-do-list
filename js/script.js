const main = document.createElement("main");
main.className = "app";
document.body.append(main);

const title = document.createElement("h1");
title.textContent = "To-Do List";
title.className = "app__title";
main.append(title);

const form = document.createElement("form");
form.className = "task-form";
main.append(form);

const titleInput = document.createElement("input");
titleInput.type = "text";
titleInput.placeholder = "Новая задача";
titleInput.required = true;
titleInput.className = "task-form__input";
form.append(titleInput);

const dateInput = document.createElement("input");
dateInput.type = "date";
dateInput.required = true;
dateInput.className = "task-form__date";
form.append(dateInput);

const addButton = document.createElement("button");
addButton.textContent = "Добавить";
addButton.type = "submit";
addButton.className = "task-form__button";
form.append(addButton);

const controls = document.createElement("section");
controls.className = "controls";

const searchInput = document.createElement("input");
searchInput.type = "search";
searchInput.placeholder = "Поиск по названию";
searchInput.className = "controls__search";

controls.append(searchInput);

const filterSelect = document.createElement("select");
filterSelect.className = "controls__filter";

const all = document.createElement("option");
all.value = "all";
all.textContent = "Все";
const active = document.createElement("option");
active.value = "active";
active.textContent = "Невыполненные";
const done = document.createElement("option");
done.value = "done";
done.textContent = "Выполненные";

filterSelect.append(all, active, done);
controls.append(filterSelect);

const sortSelect = document.createElement("select");
sortSelect.className = "controls__sort";

const asc = document.createElement("option");
asc.value = "asc";
asc.textContent = "Сначала ранние";
const desc = document.createElement("option");
desc.value = "desc";
desc.textContent = "Сначала поздние";

sortSelect.append(asc, desc);
controls.append(sortSelect);

main.append(controls);

const taskList = document.createElement("ul");
taskList.className = "task-list";
main.append(taskList);

let tasks = [];
let editingId = null;

function sortTasks() {
    tasks.sort(function (a, b) {
        if (sortSelect.value === "asc") {
            return a.date.localeCompare(b.date);
        }
        return b.date.localeCompare(a.date);
    });
}

function getVisibleTasks() {
    return tasks.filter(function (t) {
        if (filterSelect.value === "active") {
            return !t.done;
        }
        if (filterSelect.value === "done") {
            return t.done;
        }
        return true;
    });
}

function renderTasks() {
    taskList.replaceChildren();
    getVisibleTasks().forEach(function (currentTask) {
        const item = document.createElement("li");
        item.className = "task";

        if (currentTask.id === editingId) {
            const titleEdit = document.createElement("input");
            titleEdit.type = "text";
            titleEdit.value = currentTask.title;
            titleEdit.className = "task__edit-input";

            const dateEdit = document.createElement("input");
            dateEdit.type = "date";
            dateEdit.value = currentTask.date;
            dateEdit.className = "task__edit-date";

            const saveButton = document.createElement("button");
            saveButton.textContent = "Сохранить";
            saveButton.type = "button";
            saveButton.className = "task__button";

            saveButton.addEventListener("click", function () {
                if (titleEdit.value.trim() === "" || dateEdit.value === "") {
                    return;
                }
                currentTask.title = titleEdit.value;
                currentTask.date = dateEdit.value;
                editingId = null;
                sortTasks();
                renderTasks();
            });

            item.append(titleEdit, dateEdit, saveButton);
            taskList.append(item);
            return;
        }

        if (currentTask.done) {
            item.classList.add("task--done");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task__checkbox";
        checkbox.checked = currentTask.done;

        checkbox.addEventListener("change", function () {
            currentTask.done = checkbox.checked;
            renderTasks();
        });

        const text = document.createElement("span");
        text.textContent = currentTask.title;
        text.className = "task__text";

        const date = document.createElement("span");
        date.textContent = currentTask.date;
        date.className = "task__date";

        const editButton = document.createElement("button");
        editButton.textContent = "Изменить";
        editButton.type = "button";
        editButton.className = "task__button";

        editButton.addEventListener("click", function () {
            editingId = currentTask.id;
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.type = "button";
        deleteButton.className = "task__button";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (t) {
                return t.id !== currentTask.id;
            });
            renderTasks();
        });

        item.append(checkbox, text, date, editButton, deleteButton);
        taskList.append(item);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const task = {
        id: Date.now(),
        title: titleInput.value,
        date: dateInput.value,
        done: false
    };
    tasks.push(task);
    sortTasks();
    renderTasks();
    form.reset();
});

sortSelect.addEventListener("change", function () {
    sortTasks();
    renderTasks();
});

filterSelect.addEventListener("change", function () {
    renderTasks();
});