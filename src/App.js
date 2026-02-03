import React, { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            const data = await res.json();
            setTasks(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!input) return;
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: input }),
        });
        setInput('');
        fetchTasks();
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Postgres Tasks</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
            />
            <button onClick={addTask}>Add Task</button>
            <ul style={{ listStyle: 'none', marginTop: '20px' }}>
                {tasks.map(task => (
                    <li key={task.id} style={{ margin: '5px 0' }}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;