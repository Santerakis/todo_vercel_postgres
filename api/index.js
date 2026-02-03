const { sql } = require('@vercel/postgres');
const express = require('express');
const app = express();

// 1. Обязательно: чтобы сервер понимал JSON от фронтенда
app.use(express.json());

// 2. Получение данных
app.get('/api/tasks', async (req, res) => {
    const { rows } = await sql`SELECT * FROM tasks ORDER BY id DESC;`;
    res.json(rows);
});

// 3. Сохранение данных
app.post('/api/tasks', async (req, res) => {
    const { title } = req.body;
    const result = await sql`INSERT INTO tasks (title) VALUES (${title}) RETURNING *;`;
    res.json(result.rows[0]);
});

// 4. Обязательно для Vercel: экспорт приложения
module.exports = app;