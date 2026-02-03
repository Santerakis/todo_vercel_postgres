import React, { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    const addTask = async () => {
        if (!input) return;
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: input }),
        });
        setInput('');
        window.location.reload(); // Для простоты обновляем страницу
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Vercel Postgres + CRA</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.e.target.value)}
                placeholder="New task..."
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;