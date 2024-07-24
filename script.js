document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('add-item-button');
    const newItemInput = document.getElementById('new-item');
    const todoList = document.getElementById('todo-list');

    // Fetch existing items from the backend
    fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                addItemToDOM(item, index);
            });
        });

    addItemButton.addEventListener('click', () => {
        const newItemText = newItemInput.value.trim();
        if (newItemText) {
            fetch('http://localhost:3000/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item: newItemText })
            })
            .then(response => response.json())
            .then(item => {
                addItemToDOM(item, todoList.children.length);
                newItemInput.value = '';
            });
        }
    });

    newItemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItemButton.click();
        }
    });

    function addItemToDOM(item, index) {
        const listItem = document.createElement('li');
        listItem.textContent = item;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/items/${index}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                todoList.removeChild(listItem);
            });
        });

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    }
});
