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
        if (!input.trim()) return;
        try {
            await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: input }),
            });
            setInput('');
            fetchTasks();
        } catch (err) {
            console.error('Add task error:', err);
        }
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>Vercel Postgres Tasks</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="New task..."
                    style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={addTask}
                    style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Add
                </button>
            </div>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map(task => (
                        <li key={task.id} style={{
                            background: '#f9f9f9',
                            margin: '10px 0',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #eaeaea',
                            textAlign: 'left'
                        }}>
                            {task.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;