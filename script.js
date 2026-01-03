 function addTask() {
            const input = document.getElementById("taskInput");
            const taskText = input.value.trim();
            if (taskText === "") return;

            const li = document.createElement("li");
            li.textContent = taskText;
            li.setAttribute("draggable", "true"); // enable drag

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = function() {
                const newText = prompt("Edit task:", li.firstChild.textContent);
                if (newText) li.firstChild.textContent = newText;
            };
// Delete button
            const delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.onclick = function() {
                li.remove();
            };

            li.appendChild(editBtn);
            li.appendChild(delBtn);

            document.getElementById("taskList").appendChild(li);
            input.value = "";

            addDragEvents(li); // attach drag events
        }

        // Drag & Drop logic
        function addDragEvents(li) {
            li.addEventListener("dragstart", () => {
                li.classList.add("dragging");
            });

            li.addEventListener("dragend", () => {
                li.classList.remove("dragging");
            });
        }
       const taskList = document.getElementById("taskList");

        taskList.addEventListener("dragover", (e) => {
            e.preventDefault();
            const dragging = document.querySelector(".dragging");
            const afterElement = getDragAfterElement(taskList, e.clientY);
            if (afterElement == null) {
                taskList.appendChild(dragging);
            } else {
                taskList.insertBefore(dragging, afterElement);
            }
        });
       function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return {
                        offset: offset,
                        element: child
                    };
                } else {
                    return closest;
                }
            }, {
                offset: Number.NEGATIVE_INFINITY
            }).element;
        }
