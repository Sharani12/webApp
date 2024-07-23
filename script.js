document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('add-item-button');
    const newItemInput = document.getElementById('new-item');
    const todoList = document.getElementById('todo-list');

    addItemButton.addEventListener('click', () => {
        const newItemText = newItemInput.value.trim();
        if (newItemText) {
            const listItem = document.createElement('li');
            listItem.textContent = newItemText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);

            newItemInput.value = '';
        }
    });

    newItemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItemButton.click();
        }
    });
});
