import React, { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    // Загрузка задач
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

    // Добавление задачи
    const addTask = async (e) => {
        e.preventDefault();
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
            console.error('Add error:', err);
        }
    };

    // Удаление задачи по ID
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchTasks();
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>Vercel Postgres Tasks</h1>

            <form onSubmit={addTask} style={{ marginBottom: '30px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What needs to be done?"
                    style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        marginLeft: '10px',
                        cursor: 'pointer',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Add Task
                </button>
            </form>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map(task => (
                        <li key={task.id} style={{
                            background: '#f9f9f9',
                            margin: '10px 0',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #eaeaea',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span>{task.title}</span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ff4d4f',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    lineHeight: '1',
                                    padding: '0 5px'
                                }}
                                title="Delete task"
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
                {tasks.length === 0 && <p style={{ color: '#888' }}>No tasks found.</p>}
            </div>
        </div>
    );
}

export default App;