import React, { useState } from 'react';

const TodoList = ({ tasks, onDelete, onToggleComplete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editPriority, setEditPriority] = useState('Low');

  const today = new Date().setHours(0, 0, 0, 0);

  const startEdit = (task) => {
    setEditId(task.id);
    setEditName(task.name);
    setEditDueDate(task.dueDate || '');
    setEditPriority(task.priority);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditDueDate('');
    setEditPriority('Low');
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    onUpdate({
      id: editId,
      name: editName,
      dueDate: editDueDate,
      priority: editPriority,
      completed: tasks.find(t => t.id === editId)?.completed ?? false
    });
    cancelEdit();
  };

  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <ul className="list-group mb-4">
      {tasks.map((task) => {
        const isOverdue = task.dueDate && new Date(task.dueDate).setHours(0, 0, 0, 0) < today && !task.completed;
        const isEditing = editId === task.id;

        return (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {isEditing ? (
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control mb-1"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <select
                  className="form-select"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <option value="High">High 🚩</option>
                  <option value="Medium">Medium 🟡</option>
                  <option value="Low">Low 🟢</option>
                </select>
              </div>
            ) : (
              <div style={{ flex: 1, color: isOverdue ? 'red' : 'inherit' }}>
                <h5>{task.name}</h5>
                {task.dueDate && <small>Due: {task.dueDate}</small>}
                <br />
                <span className={`badge bg-${task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning text-dark' : 'success'}`}>
                  {task.priority} Priority
                </span>
              </div>
            )}

            <div>
              {isEditing ? (
                <>
                  <button className="btn btn-sm btn-success me-2" onClick={saveEdit}>Save</button>
                  <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(task)}>Edit</button>
                  <button
                    className={`btn btn-sm me-2 ${task.completed ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => onToggleComplete(task.id)}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task.id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
