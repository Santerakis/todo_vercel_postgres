const { sql } = require('@vercel/postgres');
const express = require('express');
const app = express();

app.use(express.json());

// Получить все задачи
app.get('/api/tasks', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM tasks ORDER BY id ASC;`;
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Добавить задачу
app.post('/api/tasks', async (req, res) => {
    try {
        const { title } = req.body;
        await sql`INSERT INTO tasks (title) VALUES (${title});`;
        res.status(201).json({ message: 'Task created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;