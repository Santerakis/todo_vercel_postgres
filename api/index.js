const { sql } = require('@vercel/postgres');
const express = require('express');
const app = express();

app.use(express.json());

// Маршрут для получения всех задач
app.get('/api/tasks', async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM tasks ORDER BY id DESC;`;
        res.json(rows);
    } catch (error) {
        console.error('GET Error:', error.message);
        res.status(500).json({ error: 'Database error', details: error.message });
    }
});

// Маршрут для создания задачи
app.post('/api/tasks', async (req, res) => {
    try {
        const { title } = req.body;
        console.log('Received title:', title); // Проверка входящих данных

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        // Вставка в таблицу tasks
        const result = await sql`
      INSERT INTO tasks (title) 
      VALUES (${title}) 
      RETURNING *;
    `;

        console.log('Success:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('POST Error:', error.message);
        res.status(500).json({
            error: 'Database error',
            details: error.message,
            hint: 'Make sure table "tasks" exists in Vercel Postgres Storage'
        });
    }
});

module.exports = app;