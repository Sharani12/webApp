const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let items = [];

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (newItem) {
        items.push(newItem);
        res.status(201).json(newItem);
    } else {
        res.status(400).json({ error: 'Item is required' });
    }
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!isNaN(id) && id >= 0 && id < items.length) {
        const deletedItem = items.splice(id, 1);
        res.status(200).json(deletedItem);
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
