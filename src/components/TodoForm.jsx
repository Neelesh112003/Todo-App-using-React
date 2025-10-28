import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    onAdd({
      id: Date.now(),
      name: task,
      dueDate,
      priority,
      completed: false,
    });

    setTask('');
    setDueDate('');
    setPriority('Low');
  };

  return (
    <div className="card shadow-sm border-primary" style={{ maxWidth: '430px', margin: 'auto', marginBottom: '32px' }}>
      <div className="card-header bg-primary text-white text-center">
        <h5 className="mb-0">Add New Task</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label fw-bold">Task</label>
            <input
              type="text"
              className="form-control"
              id="taskName"
              placeholder="Enter task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label fw-bold">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label fw-bold">Priority</label>
            <select
              id="priority"
              className={`form-select border-${priority === 'High' ? 'danger' : priority === 'Medium' ? 'warning' : 'success'}`}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High 🚩</option>
              <option value="Medium">Medium 🟡</option>
              <option value="Low">Low 🟢</option>
            </select>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg shadow-sm">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
