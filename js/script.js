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
dateInput.className = "task-form__date";
form.append(dateInput);

const addButton = document.createElement("button");
addButton.textContent = "Добавить";
addButton.type = "submit";
addButton.className = "task-form__button";
form.append(addButton);
