import React, { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Функция загрузки задач
    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            const data = await res.json();
            if (Array.isArray(data)) {
                setTasks(data);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Функция добавления задачи
    const addTask = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: input }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.details || 'Server error 500');
            }

            setInput('');
            fetchTasks();
        } catch (err) {
            alert('Error adding task: ' + err.message);
            console.error('Add error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Task Manager</h1>

            <form onSubmit={addTask} style={{ marginBottom: '30px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter task title..."
                    style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
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
                    {loading ? 'Adding...' : 'Add Task'}
                </button>
            </form>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map(task => (
                        <li key={task.id} style={{
                            background: '#f4f4f4',
                            margin: '10px 0',
                            padding: '15px',
                            borderRadius: '8px',
                            textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>{task.title}</span>
                            <small style={{ color: '#888' }}>#{task.id}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;